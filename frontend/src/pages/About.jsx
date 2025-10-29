import { Target, Users, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="w-10 h-10 text-cyan-500" />,
      title: 'Our Mission',
      description: 'To empower businesses with innovative digital solutions that drive growth and success in the modern digital landscape.'
    },
    {
      icon: <Heart className="w-10 h-10 text-cyan-500" />,
      title: 'Our Vision',
      description: 'To be the most trusted partner for businesses seeking digital transformation and excellence worldwide.'
    },
    {
      icon: <Award className="w-10 h-10 text-cyan-500" />,
      title: 'Our Values',
      description: 'Excellence, innovation, integrity, and customer success are at the core of everything we do.'
    },
    {
      icon: <Users className="w-10 h-10 text-cyan-500" />,
      title: 'Our Team',
      description: 'A diverse group of passionate professionals dedicated to delivering exceptional results for our clients.'
    }
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'SJ' },
    { name: 'Michael Chen', role: 'CTO', image: 'MC' },
    { name: 'Emily Rodriguez', role: 'Design Director', image: 'ER' },
    { name: 'David Park', role: 'Marketing Head', image: 'DP' }
  ];

  return (
    <div data-testid="about-page" className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-cyan-50 to-blue-50" data-testid="about-hero-section">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            About <span className="gradient-text">DigiServices</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We are a team of passionate digital experts committed to transforming businesses through 
            innovative technology solutions. With over a decade of experience, we've helped hundreds 
            of companies achieve their digital goals.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section bg-white" data-testid="our-story-section">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Founded in 2014, DigiServices started with a simple mission: to make high-quality 
                digital services accessible to businesses of all sizes. What began as a small web 
                development studio has grown into a full-service digital agency.
              </p>
              <p>
                Today, we serve clients across various industries, from startups to established 
                enterprises. Our commitment to excellence and innovation has earned us recognition 
                as one of the leading digital service providers.
              </p>
              <p>
                We believe in building long-term partnerships with our clients, understanding their 
                unique challenges, and delivering solutions that exceed expectations.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold gradient-text mb-4">2014</div>
                <div className="text-xl font-semibold text-slate-700">Founded</div>
                <div className="text-slate-600 mt-4">10+ Years of Digital Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-slate-50" data-testid="values-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our core values shape everything we do and guide our relationships with clients and partners
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="card text-center" data-testid={`value-card-${index}`}>
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-slate-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white" data-testid="team-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Talented professionals dedicated to your success
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center" data-testid={`team-member-${index}`}>
              <div className="w-40 h-40 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                {member.image}
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-cyan-500 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="section bg-gradient-to-br from-cyan-500 to-blue-500 text-white" data-testid="achievements-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
          <p className="text-lg opacity-90">Numbers that speak for themselves</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Projects Delivered' },
            { number: '350+', label: 'Happy Clients' },
            { number: '50+', label: 'Team Members' },
            { number: '15+', label: 'Industry Awards' }
          ].map((stat, index) => (
            <div key={index} className="text-center" data-testid={`achievement-stat-${index}`}>
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-base opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;