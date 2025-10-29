import { Code, Smartphone, Palette, Share2, TrendingUp, Megaphone, CheckCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code className="w-12 h-12 text-cyan-500" />,
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technologies.',
      features: [
        'Responsive design for all devices',
        'E-commerce solutions',
        'Content Management Systems',
        'Progressive Web Apps',
        'API integration'
      ]
    },
    {
      icon: <Smartphone className="w-12 h-12 text-cyan-500" />,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: [
        'iOS & Android development',
        'Cross-platform solutions',
        'App Store optimization',
        'Push notifications',
        'Offline functionality'
      ]
    },
    {
      icon: <Palette className="w-12 h-12 text-cyan-500" />,
      title: 'Graphic Design',
      description: 'Creative and compelling designs that bring your brand to life.',
      features: [
        'Logo & brand identity',
        'Marketing materials',
        'UI/UX design',
        'Infographics',
        'Print & digital design'
      ]
    },
    {
      icon: <Share2 className="w-12 h-12 text-cyan-500" />,
      title: 'Social Media Setup',
      description: 'Complete social media presence setup and optimization.',
      features: [
        'Profile creation & optimization',
        'Content strategy',
        'Brand consistency',
        'Platform integration',
        'Analytics setup'
      ]
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-cyan-500" />,
      title: 'Google SEO',
      description: 'Improve your search rankings and drive organic traffic.',
      features: [
        'Keyword research',
        'On-page optimization',
        'Technical SEO',
        'Link building',
        'Performance tracking'
      ]
    },
    {
      icon: <Megaphone className="w-12 h-12 text-cyan-500" />,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your business.',
      features: [
        'PPC campaigns',
        'Email marketing',
        'Content marketing',
        'Social media ads',
        'Analytics & reporting'
      ]
    }
  ];

  return (
    <div data-testid="services-page" className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-cyan-50 to-blue-50" data-testid="services-hero-section">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Comprehensive digital solutions designed to help your business succeed in the digital age
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-white" data-testid="services-grid-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card" data-testid={`service-detail-card-${index}`}>
              <div className="flex items-start space-x-4 mb-4">
                <div className="icon-container flex-shrink-0">{service.icon}</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                {service.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start space-x-2" data-testid={`service-${index}-feature-${fIndex}`}>
                    <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-slate-50" data-testid="process-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A proven methodology that ensures success at every step
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Discovery', description: 'Understanding your needs and goals' },
            { step: '02', title: 'Planning', description: 'Strategic planning and roadmap' },
            { step: '03', title: 'Execution', description: 'Building and implementing solutions' },
            { step: '04', title: 'Launch', description: 'Deployment and ongoing support' }
          ].map((item, index) => (
            <div key={index} className="text-center" data-testid={`process-step-${index}`}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white" data-testid="services-cta-section">
        <div className="text-center max-w-3xl mx-auto card bg-gradient-to-br from-cyan-50 to-blue-50">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-600 mb-6">
            Let's discuss your project and create a customized solution for your business
          </p>
          <button className="btn-primary" data-testid="services-contact-button">
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;