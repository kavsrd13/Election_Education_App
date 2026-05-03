import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#f9f9ff] to-[#eef2ff]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-[40px] px-6 py-[64px]">
          {/* Left Content */}
          <div className="lg:col-span-6 z-10 py-[40px]">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-secondary/20 text-secondary px-4 py-1.5 rounded-full mb-[24px] shadow-sm">
              <span className="material-symbols-outlined text-[18px] fill-1">verified</span>
              <span className="font-label-caps uppercase tracking-widest text-[11px] font-bold">Interactive Civic Education Platform</span>
            </div>
            <h1 className="font-h1 text-[56px] text-primary mb-[16px] leading-[1.1] font-extrabold">
              Election Journey: <span className="text-secondary">Become a Responsible Citizen</span>
            </h1>
            <p className="font-body-lg text-[18px] text-on-surface-variant mb-[40px] max-w-xl leading-[1.6]">
              Master your democratic rights through India's premier interactive learning experience. A curated 13-step journey from enrollment to the ballot box.
            </p>
            <div className="flex flex-wrap gap-[24px] mb-[64px]">
              <button 
                onClick={onStart}
                className="bg-secondary text-white font-button text-[16px] px-8 py-4 rounded-[1rem] shadow-xl shadow-secondary/20 hover:bg-[#b0145d] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 group font-semibold"
              >
                Start Your Journey
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
            <div className="flex items-center gap-[24px]">
              <div className="flex -space-x-3">
                <img alt="User avatar" className="w-11 h-11 rounded-full border-4 border-white shadow-sm object-cover bg-amber-100" src="https://img.icons8.com/color/96/person-male.png"/>
                <img alt="User avatar" className="w-11 h-11 rounded-full border-4 border-white shadow-sm object-cover bg-pink-100" src="https://img.icons8.com/color/96/person-female.png"/>
                <img alt="User avatar" className="w-11 h-11 rounded-full border-4 border-white shadow-sm object-cover bg-blue-100" src="https://img.icons8.com/color/96/man_reading_a_book.png"/>
                <div className="w-11 h-11 rounded-full border-4 border-white shadow-sm bg-primary-fixed flex items-center justify-center text-primary text-[12px] font-bold">
                  +2.5L
                </div>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-primary text-sm">Join 2.5 Lakh+ Certified Citizens</p>
                <p className="text-[12px] text-on-surface-variant italic">Leading the change across India</p>
              </div>
            </div>
          </div>
          {/* Right Visual */}
          <div className="lg:col-span-6 relative mt-10 lg:mt-0">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-t-4 border-t-[#FF9933] border-b-4 border-b-[#138808] bg-white">
              <img alt="Citizens casting their vote" className="w-full h-[540px] object-cover" src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-8">
                <div className="bg-white/70 backdrop-blur-[16px] border border-white/40 p-6 rounded-[1rem] w-full flex flex-col sm:flex-row sm:items-center justify-between shadow-2xl gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[1rem] bg-secondary flex items-center justify-center text-white shadow-lg">
                      <span className="material-symbols-outlined text-[28px]">military_tech</span>
                    </div>
                    <div>
                      <p className="font-h3 text-lg text-primary font-bold">Earn Your Badge</p>
                      <p className="text-sm text-on-surface-variant font-medium">Complete all 13 official modules</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <span className="text-xs font-bold text-secondary">0% Progress</span>
                    <div className="h-2.5 w-full sm:w-32 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-[5%] rounded-full shadow-[0_0_8px_rgba(211,26,114,0.4)]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Floats */}
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-60 -z-10 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-green-100 rounded-full blur-3xl opacity-60 -z-10"></div>
          </div>
        </div>
      </section>

      {/* Bento Features Grid */}
      <section className="max-w-[1280px] mx-auto px-6 py-[64px]">
        <div className="text-center max-w-2xl mx-auto mb-[64px]">
          <h2 className="font-h2 text-[36px] font-bold text-primary mb-4 leading-[1.3]">Master the Election Process</h2>
          <p className="text-on-surface-variant text-[18px] leading-[1.6]">Every vote counts, and every step matters. Follow our comprehensive guide designed for the modern Indian citizen.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-[24px] h-auto md:h-[650px]">
          {/* Registration */}
          <div className="md:col-span-2 md:row-span-1 bg-white p-[40px] rounded-[1rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-blue-200 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-14 h-14 rounded-[1rem] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[32px]">app_registration</span>
              </div>
              <span className="text-primary font-h1 text-[56px] leading-none opacity-5 group-hover:opacity-10 transition-opacity font-extrabold">01</span>
            </div>
            <div className="relative z-10 mt-6">
              <h3 className="font-h3 text-[24px] font-bold text-primary mb-[8px]">Step 1: Enrollment</h3>
              <p className="text-on-surface-variant leading-[1.6]">Learn how to register as a voter, verify your name in the electoral roll, and get your EPIC card with ease.</p>
            </div>
          </div>
          {/* Simulation */}
          <div 
            onClick={onStart}
            className="md:col-span-1 md:row-span-2 bg-secondary text-white p-[40px] rounded-[1rem] flex flex-col justify-between hover:scale-[1.02] shadow-xl shadow-secondary/20 transition-all cursor-pointer group"
          >
            <div>
              <div className="w-14 h-14 rounded-[1rem] bg-white/20 backdrop-blur-md flex items-center justify-center mb-[24px] group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-[32px]">how_to_vote</span>
              </div>
              <h3 className="font-h3 text-[24px] font-bold mb-[16px] leading-[1.4]">Live Voting Simulation</h3>
              <p className="opacity-90 leading-[1.6]">Step inside a virtual polling booth. Experience the EVM and VVPAT process in our immersive simulator.</p>
            </div>
            <div className="mt-[24px] bg-white/10 rounded-[1rem] p-4 border border-white/20 backdrop-blur-sm text-center">
              <div className="text-4xl mb-4">🗳️</div>
              <button className="w-full py-3 bg-white text-secondary font-button font-bold text-[16px] rounded-[1rem] shadow-md group-hover:bg-slate-50 transition-all">Try Mock Vote</button>
            </div>
          </div>
          {/* Quiz */}
          <div className="md:col-span-1 md:row-span-1 bg-white p-[40px] rounded-[1rem] border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center hover:shadow-xl hover:border-orange-100 transition-all group">
            <div className="w-20 h-20 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary mb-[24px] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[48px]">quiz</span>
            </div>
            <h3 className="font-h3 text-[18px] font-bold text-primary leading-[1.4]">Daily Civic Quiz</h3>
            <p className="text-on-surface-variant text-[14px] mt-2 leading-[1.6] px-2">Test your knowledge of the Indian Constitution and earn daily points.</p>
          </div>
          {/* Milestone Map */}
          <div className="md:col-span-2 md:row-span-1 bg-white/70 backdrop-blur-[16px] p-[40px] rounded-[1rem] flex flex-col sm:flex-row items-center gap-[40px] border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
            <div className="flex-shrink-0 w-28 h-28 rounded-[1rem] border-4 border-white flex items-center justify-center bg-secondary shadow-xl -rotate-3 hover:rotate-0 transition-transform">
              <span className="material-symbols-outlined text-[56px] text-white">map</span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-h3 text-[24px] font-bold text-primary mb-[8px] leading-[1.4]">Your Journey Path</h3>
              <p className="text-on-surface-variant mb-4 leading-[1.6]">A personalized roadmap developed by ECI experts to guide you through every milestone.</p>
              <div className="flex gap-2.5 justify-center sm:justify-start">
                <div className="w-full h-2.5 bg-secondary rounded-full shadow-inner"></div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full"></div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full"></div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full"></div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Social Proof Section */}
      <section className="bg-primary text-white py-[64px] mt-[40px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="max-w-[1280px] mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-[64px] text-center">
          <div className="p-4">
            <p className="text-[56px] font-h1 font-bold mb-[8px] text-white leading-[1.1]">13</p>
            <p className="font-label-caps uppercase tracking-[0.2em] font-bold text-white/70 text-[12px]">Interactive Steps</p>
          </div>
          <div className="p-4 border-y md:border-y-0 md:border-x border-white/10">
            <p className="text-[56px] font-h1 font-bold mb-[8px] text-white leading-[1.1]">100%</p>
            <p className="font-label-caps uppercase tracking-[0.2em] font-bold text-white/70 text-[12px]">Official Guidelines</p>
          </div>
          <div className="p-4">
            <p className="text-[56px] font-h1 font-bold mb-[8px] text-white leading-[1.1]">5 Min</p>
            <p className="font-label-caps uppercase tracking-[0.2em] font-bold text-white/70 text-[12px]">Daily Lessons</p>
          </div>
        </div>
      </section>

      <img alt="Indian National Emblem Watermark" className="opacity-[0.04] pointer-events-none fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] -z-10 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEMtHBh6Xwy-sjb85rPq4CPLSmT7GGdbyQK3RN6CT_kJ7XCH1mbihCF2pGz1lvQqnEo4LrjHiQPj9s_oo2JadeULzQsZMsfc7NlQqUM3vpvvePeyjmLWM4mgtauFucHc0AJJhvW29cZIIINmGNrhm3nHwJ9AHKAmMWZWRGh_wccXSi0Ii7D1Xe_HUaKS-EkMLXKF7DkEmhjoX60TPxrGILsMdf8P44FlV5Q76RdMtc7hUkewJ_-tJqRFtvKBL5hMIEUKPC-0KgNFA"/>
    </div>
  );
};
