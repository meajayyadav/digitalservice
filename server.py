from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production-2024')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Helper functions for password and JWT
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    admin = await db.admins.find_one({"email": email}, {"_id": 0})
    if admin is None:
        raise credentials_exception
    return admin


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Contact Form Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    service_interest: str
    budget: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service_interest: str
    budget: str
    message: str


# Admin Models
class AdminCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class Admin(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    name: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Token(BaseModel):
    access_token: str
    token_type: str
    admin: Admin


# Content Models
class ContentUpdate(BaseModel):
    section: str
    data: Dict[str, Any]


# Basic routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact_submission(input: ContactSubmissionCreate):
    """Submit a contact form"""
    try:
        contact_dict = input.model_dump()
        contact_obj = ContactSubmission(**contact_dict)
        
        doc = contact_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        _ = await db.contact_submissions.insert_one(doc)
        return contact_obj
    except Exception as e:
        logger.error(f"Error creating contact submission: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")


# Admin Authentication Endpoints
@api_router.post("/admin/signup", response_model=Token)
async def admin_signup(admin_data: AdminCreate):
    """Create a new admin account"""
    # Check if admin already exists
    existing_admin = await db.admins.find_one({"email": admin_data.email})
    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin with this email already exists")
    
    # Create new admin
    hashed_password = get_password_hash(admin_data.password)
    admin = Admin(
        email=admin_data.email,
        name=admin_data.name
    )
    
    doc = admin.model_dump()
    doc['password'] = hashed_password
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.admins.insert_one(doc)
    
    # Create access token
    access_token = create_access_token(data={"sub": admin.email})
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        admin=admin
    )

@api_router.post("/admin/login", response_model=Token)
async def admin_login(login_data: AdminLogin):
    """Admin login"""
    admin = await db.admins.find_one({"email": login_data.email}, {"_id": 0})
    if not admin or not verify_password(login_data.password, admin['password']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": admin['email']})
    
    admin_obj = Admin(
        id=admin['id'],
        email=admin['email'],
        name=admin['name'],
        created_at=datetime.fromisoformat(admin['created_at']) if isinstance(admin['created_at'], str) else admin['created_at']
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        admin=admin_obj
    )

@api_router.get("/admin/me", response_model=Admin)
async def get_current_admin_info(current_admin: dict = Depends(get_current_admin)):
    """Get current admin info"""
    return Admin(
        id=current_admin['id'],
        email=current_admin['email'],
        name=current_admin['name'],
        created_at=datetime.fromisoformat(current_admin['created_at']) if isinstance(current_admin['created_at'], str) else current_admin['created_at']
    )


# Admin Dashboard Endpoints
@api_router.get("/admin/contacts", response_model=List[ContactSubmission])
async def get_all_contacts(current_admin: dict = Depends(get_current_admin)):
    """Get all contact form submissions (protected)"""
    try:
        submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
        
        for submission in submissions:
            if isinstance(submission['timestamp'], str):
                submission['timestamp'] = datetime.fromisoformat(submission['timestamp'])
        
        # Sort by timestamp descending
        submissions.sort(key=lambda x: x['timestamp'], reverse=True)
        
        return submissions
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact submissions")

@api_router.delete("/admin/contacts/{contact_id}")
async def delete_contact(contact_id: str, current_admin: dict = Depends(get_current_admin)):
    """Delete a contact submission"""
    result = await db.contact_submissions.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact deleted successfully"}


# Content Management Endpoints
@api_router.get("/content")
async def get_content():
    """Get all website content"""
    content = await db.content.find_one({"type": "website"}, {"_id": 0})
    if not content:
        # Return default content if none exists
        return {
            "type": "website",
            "hero": {
                "title": "Transform Your Business with",
                "titleHighlight": "Digital Excellence",
                "description": "We deliver cutting-edge digital solutions including web development, mobile apps, graphic design, social media management, and SEO services to help your business thrive."
            },
            "services": [
                {
                    "title": "Web Development",
                    "description": "Custom websites built with modern technologies"
                },
                {
                    "title": "Mobile Apps",
                    "description": "Native and cross-platform mobile applications"
                },
                {
                    "title": "Graphic Design",
                    "description": "Creative designs that capture your brand essence"
                },
                {
                    "title": "Social Media",
                    "description": "Complete social media setup and management"
                },
                {
                    "title": "Google SEO",
                    "description": "Optimize your online presence and rankings"
                }
            ]
        }
    return content

@api_router.put("/admin/content")
async def update_content(content_update: ContentUpdate, current_admin: dict = Depends(get_current_admin)):
    """Update website content (protected)"""
    try:
        # Get existing content
        existing_content = await db.content.find_one({"type": "website"})
        
        if existing_content:
            # Update specific section
            await db.content.update_one(
                {"type": "website"},
                {"$set": {content_update.section: content_update.data}}
            )
        else:
            # Create new content document
            await db.content.insert_one({
                "type": "website",
                content_update.section: content_update.data
            })
        
        return {"message": "Content updated successfully"}
    except Exception as e:
        logger.error(f"Error updating content: {e}")
        raise HTTPException(status_code=500, detail="Failed to update content")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()