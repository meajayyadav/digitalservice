import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Jennifer Martinez',
      role: 'CEO, TechStart Inc',
      image: 'JM',
      rating: 5,
      text: 'DigiServices transformed our online presence completely. Their team is professional, creative, and truly understands business needs. Our website traffic increased by 300% within 3 months!'
    },
    {
      name: 'Robert Chen',
      role: 'Founder, FitLife App',
      image: 'RC',
      rating: 5,
      text: 'The mobile app they developed exceeded all our expectations. The user experience is seamless, and our customers love it. Highly recommend their services!'
    },
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director, GreenEco',
      image: 'SJ',
      rating: 5,
      text: 'Outstanding graphic design work! They captured our brand essence perfectly and delivered stunning visuals that resonate with our target audience.'
    },
    {
      name: 'Michael Park',
      role: 'Owner, Park\'s Restaurant',
      image: 'MP',
      rating: 5,
      text: 'Our new website with online ordering has been a game-changer. Orders increased by 150%, and customers love the easy-to-use interface. Thank you, DigiServices!'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Director, HomeFind Realty',
      image: 'ER',
      rating: 5,
      text: 'The real estate portal they built is exceptional. The search functionality is powerful, and our agents can manage listings effortlessly. Best investment we made!'
    },
    {
      name: 'David Thompson',
      role: 'CMO, StyleHub',
      image: 'DT',
      rating: 5,
      text: 'Their SEO services brought us from page 5 to page 1 on Google. Our organic traffic tripled, and we\'re getting quality leads daily. Truly experts in their field!'
    }
  ];

  const stats = [
    { number: '98%', label: 'Client Satisfaction' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '250+', label: 'Five-Star Reviews' },
    { number: '95%', label: 'Client Retention' }
  ];

  return (
    <div data-testid="testimonials-page" className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-cyan-50 to-blue-50" data-testid="testimonials-hero-section">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Client <span className="gradient-text">Testimonials</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-white" data-testid="testimonials-stats-section">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`testimonial-stat-${index}`}>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section bg-slate-50" data-testid="testimonials-grid-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card" data-testid={`testimonial-card-${index}`}>
              <div className="mb-4">
                <Quote className="w-10 h-10 text-cyan-500 opacity-50" />
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-slate-800">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section bg-white" data-testid="trust-badges-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted By Industry Leaders</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We've worked with startups to Fortune 500 companies
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
          {['TechCorp', 'InnovateLabs', 'GlobalSoft', 'NextGen', 'CloudFirst', 'DataPro'].map((company, index) => (
            <div key={index} className="text-2xl font-bold text-slate-400" data-testid={`trust-badge-${index}`}>
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-cyan-500 to-blue-500 text-white" data-testid="testimonials-cta-section">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Happy Clients?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Let's create something amazing together
          </p>
          <button className="bg-white text-cyan-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all hover:scale-105" data-testid="testimonials-contact-button">
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;