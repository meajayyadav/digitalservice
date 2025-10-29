const Portfolio = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A modern e-commerce solution with real-time inventory management',
      tags: ['React', 'Node.js', 'MongoDB'],
      color: 'from-cyan-400 to-blue-500'
    },
    {
      title: 'Fitness Mobile App',
      category: 'Mobile Development',
      description: 'Cross-platform fitness tracking app with social features',
      tags: ['React Native', 'Firebase', 'iOS/Android'],
      color: 'from-blue-400 to-indigo-500'
    },
    {
      title: 'Brand Identity Design',
      category: 'Graphic Design',
      description: 'Complete brand identity package for a tech startup',
      tags: ['Logo', 'Brand Guide', 'Marketing'],
      color: 'from-purple-400 to-pink-500'
    },
    {
      title: 'Restaurant Website',
      category: 'Web Development',
      description: 'Responsive website with online ordering system',
      tags: ['WordPress', 'WooCommerce', 'SEO'],
      color: 'from-orange-400 to-red-500'
    },
    {
      title: 'Real Estate Portal',
      category: 'Web Development',
      description: 'Property listing platform with advanced search features',
      tags: ['React', 'Python', 'PostgreSQL'],
      color: 'from-green-400 to-teal-500'
    },
    {
      title: 'Social Media Campaign',
      category: 'Digital Marketing',
      description: 'Successful social media campaign reaching 500K+ users',
      tags: ['Instagram', 'Facebook', 'Analytics'],
      color: 'from-pink-400 to-rose-500'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '50+', label: 'Industries Served' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '250+', label: 'Five-Star Reviews' }
  ];

  return (
    <div data-testid="portfolio-page" className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-cyan-50 to-blue-50" data-testid="portfolio-hero-section">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Explore our successful projects and see how we've helped businesses achieve their goals
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-white" data-testid="portfolio-stats-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`portfolio-stat-${index}`}>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section bg-slate-50" data-testid="projects-grid-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A showcase of our best work across different industries and technologies
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="card group cursor-pointer" data-testid={`project-card-${index}`}>
              <div className={`h-48 rounded-lg bg-gradient-to-br ${project.color} mb-4 flex items-center justify-center text-white text-2xl font-bold transition-transform group-hover:scale-105`}>
                {project.title.substring(0, 2)}
              </div>
              <div className="mb-2">
                <span className="text-xs font-semibold text-cyan-500 uppercase tracking-wide">
                  {project.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tIndex) => (
                  <span
                    key={tIndex}
                    className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium"
                    data-testid={`project-${index}-tag-${tIndex}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study CTA */}
      <section className="section bg-white" data-testid="case-study-cta-section">
        <div className="card bg-gradient-to-br from-cyan-50 to-blue-50 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to See Detailed Case Studies?
          </h2>
          <p className="text-slate-600 mb-6">
            Contact us to learn more about our projects and how we can help your business succeed
          </p>
          <button className="btn-primary" data-testid="case-study-contact-button">
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;