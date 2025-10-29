import { Link } from 'react-router-dom';
import { Code, Smartphone, Palette, Share2, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: <Code className="w-8 h-8 text-cyan-500" />,
      title: 'Web Development',
      description: 'Custom websites built with modern technologies'
    },
    {
      icon: <Smartphone className="w-8 h-8 text-cyan-500" />,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications'
    },
    {
      icon: <Palette className="w-8 h-8 text-cyan-500" />,
      title: 'Graphic Design',
      description: 'Creative designs that capture your brand essence'
    },
    {
      icon: <Share2 className="w-8 h-8 text-cyan-500" />,
      title: 'Social Media',
      description: 'Complete social media setup and management'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-cyan-500" />,
      title: 'Google SEO',
      description: 'Optimize your online presence and rankings'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '350+', label: 'Happy Clients' },
    { number: '98%', label: 'Success Rate' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <div className="section relative z-10">
          <div className="text-center max-w-4xl mx-auto fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your Business with
              <span className="gradient-text"> Digital Excellence</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              We deliver cutting-edge digital solutions including web development, mobile apps, 
              graphic design, social media management, and SEO services to help your business thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact">
                <button className="btn-primary" data-testid="hero-get-started-button">
                  Get Started Today
                </button>
              </Link>
              <Link to="/services">
                <button className="btn-secondary" data-testid="hero-view-services-button">
                  View Our Services
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-white" data-testid="stats-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-item-${index}`}>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="section bg-slate-50" data-testid="services-overview-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="card" data-testid={`service-card-${index}`}>
              <div className="icon-container">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-slate-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services">
            <button className="btn-primary" data-testid="view-all-services-button">
              View All Services <ArrowRight className="inline w-5 h-5 ml-2" />
            </button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white" data-testid="why-choose-us-section">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Us?</h2>
            <div className="space-y-4">
              {[
                'Expert team with 10+ years of experience',
                'Customized solutions for your unique needs',
                'Timely delivery and transparent communication',
                'Ongoing support and maintenance',
                'Competitive pricing with no hidden costs',
                'Proven track record of successful projects'
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3" data-testid={`why-choose-item-${index}`}>
                  <CheckCircle className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl font-bold gradient-text mb-4">10+</div>
                <div className="text-xl font-semibold text-slate-700">Years of Excellence</div>
                <div className="text-slate-600 mt-2">Delivering Quality Digital Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-cyan-500 to-blue-500 text-white" data-testid="cta-section">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Let's discuss your project and create something amazing together
          </p>
          <Link to="/contact">
            <button
              className="bg-white text-cyan-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all hover:scale-105"
              data-testid="cta-contact-button"
            >
              Start Your Project
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;