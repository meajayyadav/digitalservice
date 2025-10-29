import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Mail, Phone, Calendar, DollarSign, Trash2, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const { admin, logout, token } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contacts');
  const [content, setContent] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [editedContent, setEditedContent] = useState({});

  useEffect(() => {
    fetchContacts();
    fetchContent();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API}/admin/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${API}/content`);
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;

    try {
      await axios.delete(`${API}/admin/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(contacts.filter(c => c.id !== id));
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  const startEditing = (section) => {
    setEditingSection(section);
    setEditedContent(content[section] || {});
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setEditedContent({});
  };

  const saveContent = async () => {
    try {
      await axios.put(
        `${API}/admin/content`,
        {
          section: editingSection,
          data: editedContent
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Update local content
      setContent(prev => ({
        ...prev,
        [editingSection]: editedContent
      }));
      
      toast.success('Content updated successfully');
      setEditingSection(null);
      setEditedContent({});
    } catch (error) {
      console.error('Error updating content:', error);
      toast.error('Failed to update content');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" data-testid="admin-dashboard">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-sm text-slate-600">Welcome back, {admin?.name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              data-testid="logout-button"
              className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('contacts')}
              data-testid="tab-contacts"
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'contacts'
                  ? 'border-cyan-500 text-cyan-500'
                  : 'border-transparent text-slate-600 hover:text-slate-800'
              }`}
            >
              Contact Submissions ({contacts.length})
            </button>
            <button
              onClick={() => setActiveTab('content')}
              data-testid="tab-content"
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'content'
                  ? 'border-cyan-500 text-cyan-500'
                  : 'border-transparent text-slate-600 hover:text-slate-800'
              }`}
            >
              Manage Content
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'contacts' && (
          <div className="space-y-4" data-testid="contacts-section">
            {contacts.length === 0 ? (
              <div className="card text-center py-12">
                <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No contact submissions yet</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div key={contact.id} className="card" data-testid={`contact-card-${contact.id}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold text-slate-800">{contact.name}</h3>
                        <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                          {contact.service_interest}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Mail className="w-4 h-4" />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Phone className="w-4 h-4" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-600">
                          <DollarSign className="w-4 h-4" />
                          <span>{contact.budget}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(contact.timestamp)}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200">
                        <p className="text-sm font-medium text-slate-700 mb-1">Message:</p>
                        <p className="text-sm text-slate-600">{contact.message}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      data-testid={`delete-contact-${contact.id}`}
                      className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'content' && content && (
          <div className="space-y-6" data-testid="content-section">
            {/* Hero Section */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Hero Section</h2>
                {editingSection === 'hero' ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={saveContent}
                      className="flex items-center space-x-1 px-3 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                      data-testid="save-hero-button"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="flex items-center space-x-1 px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEditing('hero')}
                    className="flex items-center space-x-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                    data-testid="edit-hero-button"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
              </div>
              
              {editingSection === 'hero' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={editedContent.title || ''}
                      onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                      data-testid="hero-title-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Title Highlight</label>
                    <input
                      type="text"
                      value={editedContent.titleHighlight || ''}
                      onChange={(e) => setEditedContent({ ...editedContent, titleHighlight: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                      data-testid="hero-highlight-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea
                      value={editedContent.description || ''}
                      onChange={(e) => setEditedContent({ ...editedContent, description: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                      data-testid="hero-description-input"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-slate-600">
                  <p><strong>Title:</strong> {content.hero?.title}</p>
                  <p><strong>Highlight:</strong> {content.hero?.titleHighlight}</p>
                  <p><strong>Description:</strong> {content.hero?.description}</p>
                </div>
              )}
            </div>

            {/* More sections can be added here */}
            <div className="card bg-cyan-50 border-cyan-200">
              <p className="text-cyan-700">
                <strong>Note:</strong> More content sections can be managed here. Currently showing Hero section as an example.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;