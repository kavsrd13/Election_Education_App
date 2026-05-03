import React from 'react';
import { motion } from 'framer-motion';

interface WelcomePageProps {
  onContinue: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-background text-on-background font-body-md selection:bg-primary/30">
      {/* Hero Section */}
      <header className="relative py-20 px-6 overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-8"
          >
            <span className="material-symbols-outlined text-sm">stars</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">New Milestone Unlocked</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-h1 text-5xl md:text-7xl mb-6 leading-tight"
          >
            Welcome, <span className="text-secondary-fixed-dim">First-Time Voter</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 font-medium"
          >
            You are about to join a centuries-old tradition of shaping history. Before you start, let's understand why this moment matters.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={onContinue}
            className="bg-secondary text-white px-10 py-5 rounded-2xl font-button text-lg hover:bg-secondary/90 transition-all shadow-2xl hover:shadow-secondary/40 flex items-center gap-3 mx-auto group"
          >
            Start My Journey
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </motion.button>
        </div>
      </header>

      {/* Video Section */}
      <section className="py-20 px-6 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-h2 text-4xl text-primary mb-6">Why Your Vote Matters</h2>
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
              <p>
                Throughout history, the right to vote wasn't a gift—it was a <span className="text-primary font-bold">hard-won victory</span>. From the suffragettes who fought for women's voices to the civil rights activists who marched for racial equality, every ballot represents a sacrifice.
              </p>
              <p>
                In a democracy, voting is the ultimate equalizer. Whether you are a student, a worker, or a CEO, your voice carries the <span className="text-secondary font-bold">same weight</span> in the polling booth.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant">
                  <span className="material-symbols-outlined text-secondary mb-2">history</span>
                  <h4 className="font-bold text-primary text-sm mb-1">Historical Legacy</h4>
                  <p className="text-xs">Honoring those who fought for your right to be heard.</p>
                </div>
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant">
                  <span className="material-symbols-outlined text-secondary mb-2">balance</span>
                  <h4 className="font-bold text-primary text-sm mb-1">Equal Voice</h4>
                  <p className="text-xs">Ensuring that your unique needs are represented in policy.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-surface-container"
          >
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/P5tQfJ5s4YQ" 
              title="The fight for the right to vote" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Historical Timeline */}
      <section className="py-20 bg-surface-container-lowest border-y border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-h2 text-4xl text-primary mb-4">The Road to the Ballot Box</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">A brief look at how the right to vote evolved through courage and persistence.</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-outline-variant -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { year: 'Early 1800s', event: 'Limited Rights', desc: 'Initially, only male property owners could vote in many nations.' },
                { year: '1920', event: 'Women\'s Suffrage', desc: 'Decades of protest led to women finally winning the right to vote.' },
                { year: '1960s', event: 'Civil Rights', desc: 'The fight to remove discriminatory barriers like literacy tests.' },
                { year: '1971', event: '26th Amendment', desc: 'Lowering the voting age to 18, empowering the youth voice.' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-3xl border border-outline-variant shadow-lg relative z-10 hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-6 font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-secondary font-black text-xl mb-2 block">{item.year}</span>
                  <h3 className="font-h3 text-xl text-primary mb-3">{item.event}</h3>
                  <p className="text-on-surface-variant text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-h2 text-4xl text-primary mb-8 italic">"Bad officials are elected by good citizens who do not vote."</h2>
          <p className="text-xl text-on-surface-variant mb-12">
            Your journey to becoming an informed, empowered citizen starts now. Are you ready?
          </p>
          <button
            onClick={onContinue}
            className="bg-primary text-white px-12 py-6 rounded-2xl font-button text-xl hover:bg-on-primary-fixed-variant transition-all shadow-xl flex items-center gap-4 mx-auto"
          >
            Enter Election Journey
            <span className="material-symbols-outlined">explore</span>
          </button>
        </div>
      </section>
      
      <footer className="py-12 border-t border-outline-variant text-center text-outline text-sm">
        <p>&copy; 2026 Interactive Civic Education Platform. Empowering the next generation of voters.</p>
      </footer>
    </div>
  );
};
