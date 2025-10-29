import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What services does DigiServices offer?',
          a: 'We offer a comprehensive range of digital services including web development, mobile app development, graphic design, social media setup and management, Google SEO, and digital marketing solutions.'
        },
        {
          q: 'How long does a typical project take?',
          a: 'Project timelines vary depending on scope and complexity. A basic website typically takes 2-4 weeks, while more complex web applications or mobile apps can take 2-3 months. We provide detailed timelines during the consultation phase.'
        },
        {
          q: 'Do you work with businesses of all sizes?',
          a: 'Yes! We work with startups, small businesses, and large enterprises. Our solutions are tailored to fit your specific needs and budget, regardless of your company size.'
        }
      ]
    },
    {
      category: 'Pricing & Payments',
      questions: [
        {
          q: 'How much do your services cost?',
          a: 'Our pricing varies based on project scope and requirements. We offer packages starting from $499 for basic websites to custom enterprise solutions. Contact us for a detailed quote tailored to your needs.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, bank transfers, and PayPal. For larger projects, we offer flexible payment plans with milestone-based payments.'
        },
        {
          q: 'Do you offer refunds?',
          a: 'We stand behind our work with a satisfaction guarantee. If you\'re not happy with our services, we\'ll work with you to make it right. Refund policies are outlined in our service agreement.'
        }
      ]
    },
    {
      category: 'Process & Timeline',
      questions: [
        {
          q: 'What is your development process?',
          a: 'Our process includes four main phases: Discovery (understanding your needs), Planning (strategic roadmap), Execution (building the solution), and Launch (deployment and support). We keep you involved at every step.'
        },
        {
          q: 'Will I own the final product?',
          a: 'Absolutely! Upon final payment, you receive full ownership of all deliverables including source code, design files, and content. We provide all necessary documentation.'
        },
        {
          q: 'Can I request changes during development?',
          a: 'Yes, we welcome feedback throughout the process. Minor adjustments are included, while major scope changes may affect timeline and cost. We\'ll always discuss this with you first.'
        }
      ]
    },
    {
      category: 'Support & Maintenance',
      questions: [
        {
          q: 'Do you provide ongoing support?',
          a: 'Yes! All our packages include initial support (duration varies by package). We also offer ongoing maintenance plans starting at $199/month for continued support, updates, and monitoring.'
        },
        {
          q: 'What if something breaks after launch?',
          a: 'We provide bug fixes and technical support during your support period. If issues arise after that, we offer affordable maintenance packages to keep everything running smoothly.'
        },
        {
          q: 'Can you help with updates and improvements later?',
          a: 'Definitely! Many of our clients work with us long-term for continuous improvements, new features, and updates. We\'re here to support your growth.'
        }
      ]
    }
  ];

  return (
    <div data-testid="faq-page" className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-cyan-50 to-blue-50" data-testid="faq-hero-section">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Find answers to common questions about our services, process, and pricing
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="section bg-white" data-testid="faq-sections">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} data-testid={`faq-category-${catIndex}`}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, qIndex) => (
                  <AccordionItem
                    key={qIndex}
                    value={`item-${catIndex}-${qIndex}`}
                    className="card border-none shadow-sm"
                    data-testid={`faq-item-${catIndex}-${qIndex}`}
                  >
                    <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-cyan-500 hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="section bg-slate-50" data-testid="faq-contact-section">
        <div className="card bg-gradient-to-br from-cyan-50 to-blue-50 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-slate-600 mb-6">
            Can't find the answer you're looking for? Our team is here to help!
          </p>
          <button className="btn-primary" data-testid="faq-contact-button">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default FAQ;