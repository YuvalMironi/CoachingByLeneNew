
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Award, Target, Briefcase, ChevronRight, CheckCircle, Brain, ShieldCheck, Zap } from 'lucide-react';
import { Specialty, Experience } from '../types';

const Home: React.FC = () => {
  const specialties: Specialty[] = [
    {
      title: "Sage-Powered Mindset",
      description: "Using Positive Intelligence (PQ) to identify Saboteurs and build mental fitness for lasting calm and clarity.",
      icon: <Brain className="w-8 h-8 text-darkGreen" />
    },
    {
      title: "Leadership & Performance",
      description: "Drawing from 30 years of pharmaceutical industry leadership to navigate complex corporate environments.",
      icon: <Target className="w-8 h-8 text-darkGreen" />
    },
    {
      title: "Resilience & Balance",
      description: "Implementing Brain Calm methods to achieve personal insight, balance, and the best version of yourself.",
      icon: <ShieldCheck className="w-8 h-8 text-darkGreen" />
    }
  ];

  const experiences: Experience[] = [
    {
      period: "30 Years Experience",
      role: "Pharma Industry Leader",
      company: "Various Global Environments",
      description: "Led departments and navigated complex corporate structures, gaining deep insight into professional challenges."
    },
    {
      period: "Academic Foundation",
      role: "Alumna",
      company: "IMD, Lausanne",
      description: "Executive education at one of the world's leading business schools."
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-softBeige pt-20 pb-20 lg:pt-32 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-16">
            <div className="flex-1 space-y-8 animate-in slide-in-from-left duration-700">
              <div className="inline-block px-4 py-1.5 bg-primary/20 border border-primary/30 rounded-full">
                <span className="text-sm font-semibold text-darkGreen uppercase tracking-wider italic">EMCC Credentialed Coach</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif text-gray-900 leading-tight">
                Achieve Clarity with <span className="text-darkGreen">Lene Vindelev D. Nielsen</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Helping you discover your Saboteurs to find calm, balance, and resilience through PQ and Brain Calm methods.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/book"
                  className="bg-darkGreen text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-darkGreen/20 hover:bg-[#2d5e43] transition-all"
                >
                  Book a Consultation
                </Link>
                <a
                  href="https://www.linkedin.com/in/lene-vindelev-d-nielsen-42990a5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-2 border-darkGreen text-darkGreen px-8 py-4 rounded-full font-bold hover:bg-darkGreen hover:text-white transition-all"
                >
                  <Linkedin size={20} />
                  LinkedIn Profile
                </a>
              </div>
            </div>
            <div className="flex-1 relative animate-in slide-in-from-right duration-700 lg:mt-[360px]">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white aspect-[4/5] max-w-sm lg:ml-auto">
                <img 
                  src="https://dngm5nrplx4cf.cloudfront.net/profiles/profile-picture-1761131929.JPG" 
                  alt="Lene Vindelev D. Nielsen" 
                  className="w-full h-full object-cover object-[60%_70%] scale-125"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary rounded-full -z-0 opacity-50 blur-2xl"></div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-darkGreen rounded-full -z-0 opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-serif text-gray-900 mb-6 uppercase tracking-tight">Biography</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  I am an EMCC Credentialed Coach educated at IMD, Lausanne, with 30 years of experience in the pharmaceutical industry. Having led departments and navigated complex corporate environments myself, I meet clients exactly where they are in their career - understanding their challenges, pressures, and aspirations.
                </p>
                <p>
                  My coaching blends Positive Intelligence (PQ) and Brain Calm methods to help clients discover their Saboteurs to find calm and clarity, and building a Sage-powered mindset. I support clients in achieving insight in themselves to build balance, resilience and obtain their own best version - in their work and in life.
                </p>
                <ul className="space-y-4 pt-4">
                  {['Positive Intelligence (PQ)', 'Brain Calm Methods', 'Sage-powered Mindset', 'EMCC Credentialed'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="text-primary" size={20} />
                      <span className="font-medium text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-softBeige p-10 rounded-3xl border border-primary/20">
              <h3 className="text-2xl font-serif text-darkGreen mb-4 italic">The Best Version of You</h3>
              <p className="text-gray-600 mb-8">
                By understanding the mental patterns that hold you back, we can unlock a more resilient and balanced approach to both your professional and personal life.
              </p>
              <div className="pt-6 border-t border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-darkGreen rounded-full flex items-center justify-center text-white font-serif italic text-xl">L</div>
                  <div>
                    <p className="font-bold text-gray-900">Lene Vindelev D. Nielsen</p>
                    <p className="text-sm text-gray-500 italic">IMD Alumna, EMCC Credentialed Coach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-serif text-gray-900 mb-4 uppercase tracking-tight">Coaching Focus</h2>
            <p className="text-gray-600 max-w-2xl mx-auto italic">Specialized methods for sustainable high performance and mental fitness.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {specialties.map((spec, idx) => (
              <div key={idx} className="group p-8 border border-gray-100 rounded-3xl hover:bg-softBeige transition-all duration-300">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{spec.icon}</div>
                <h3 className="text-2xl font-serif mb-4 text-gray-900">{spec.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{spec.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Positive Intelligence', 'Brain Calm', 'Corporate Leadership', 'Saboteur Discovery'].map(focus => (
              <div key={focus} className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                <span className="font-semibold text-darkGreen">{focus}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-serif mb-8 text-primary uppercase tracking-tight">Experience</h2>
              <p className="text-gray-400 text-lg mb-12">
                Combining top-tier executive education with three decades of practical leadership in high-stakes environments.
              </p>
              <div className="space-y-12">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-primary/30 pb-4">
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-primary rounded-full"></div>
                    <span className="text-sm font-bold text-primary tracking-widest uppercase mb-2 block">{exp.period}</span>
                    <h4 className="text-xl font-bold mb-1">{exp.role}</h4>
                    <p className="text-gray-400 font-medium mb-3">{exp.company}</p>
                    <p className="text-gray-500 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="bg-white/5 p-12 rounded-3xl backdrop-blur-sm border border-white/10 text-center">
                <Award className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-serif mb-6 text-primary">Global Education</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Educated at IMD in Lausanne, Switzerland, Lene brings a world-class strategic perspective to her coaching sessions, helping leaders navigate the complexities of global business.
                </p>
                <div className="inline-block border-2 border-primary/30 px-6 py-3 rounded-full">
                  <span className="text-primary font-bold tracking-widest uppercase text-sm">IMD Alumna</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 italic">Ready to find your best version?</h2>
          <p className="text-gray-600 text-lg mb-10">
            Discover how PQ and Brain Calm methods can transform your professional experience.
          </p>
          <Link
            to="/book"
            className="inline-block bg-darkGreen text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#2d5e43] transition-all transform hover:-translate-y-1"
          >
            Schedule Your Session
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
