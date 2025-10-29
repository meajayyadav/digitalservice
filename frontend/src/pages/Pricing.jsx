import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '499',
      description: 'Perfect for small businesses and startups',
      features: [
        'Basic website (up to 5 pages)',
        'Responsive design',
        'Contact form',
        'SEO basics',
        '1 month support',
        'Social media setup'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '1,499',
      description: 'Ideal for growing businesses',
      features: [
        'Advanced website (up to 15 pages)',
        'Custom design',
        'E-commerce integration',
        'Advanced SEO',
        '3 months support',
        'Content management system',
        'Analytics setup',
        'Email integration'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale projects',
      features: [
        'Unlimited pages',
        'Custom web application',
        'Mobile app development',
        'Advanced integrations',
        '12 months support',
        'Dedicated project manager',
        'Priority support',
        'Training & documentation'
      ],
      popular: false
    }
  ];

  const addons = [
    { name: 'Logo Design', price: '$299' },
    { name: 'Social Media Marketing (monthly)', price: '$799' },
    { name: 'Content Writing (per page)', price: '$99' },
    { name: 'Advanced SEO Package', price: '$599/month' },
    { name: 'Mobile App Development', price: '$2,999+' },
    { name: 'Maintenance Package (monthly)', price: '$199' }
  ];

  return (
    <div data-testid="pricing-page" className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-cyan-50 to-blue-50" data-testid="pricing-hero-section">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Choose a plan that fits your needs. All plans include our commitment to quality and excellence.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="section bg-white" data-testid="pricing-plans-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              data-testid={`pricing-plan-${index}`}
              className={`card relative ${
                plan.popular ? 'ring-2 ring-cyan-500 shadow-xl scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  {plan.price !== 'Custom' && (
                    <span className="text-xl text-slate-600">$</span>
                  )}
                  <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-slate-600 ml-2">/project</span>
                  )}
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start space-x-3" data-testid={`plan-${index}-feature-${fIndex}`}>
                    <Check className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block">
                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all ${
                    plan.popular
                      ? 'btn-primary'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  data-testid={`plan-${index}-cta-button`}
                >
                  Get Started
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="section bg-slate-50" data-testid="addons-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Enhance your package with these optional services
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {addons.map((addon, index) => (
            <div key={index} className="card flex justify-between items-center" data-testid={`addon-${index}`}>
              <span className="text-slate-700 font-medium">{addon.name}</span>
              <span className="text-cyan-500 font-bold">{addon.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="section bg-white" data-testid="pricing-faq-section">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have Questions?</h2>
          <p className="text-slate-600 mb-6">
            Check out our FAQ page or contact us for a custom quote tailored to your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/faq">
              <button className="btn-secondary" data-testid="view-faq-button">View FAQ</button>
            </Link>
            <Link to="/contact">
              <button className="btn-primary" data-testid="request-quote-button">Request a Quote</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;