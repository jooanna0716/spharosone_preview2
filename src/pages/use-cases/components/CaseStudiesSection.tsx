import { useState } from 'react';
import { CASE_STUDIES } from '@/mocks/useCases';

export default function CaseStudiesSection() {
  const [activeKey, setActiveKey] = useState(CASE_STUDIES[0].key);
  const active = CASE_STUDIES.find((c) => c.key === activeKey)!;

  return (
    <section className="py-16 md:py-24 px-6 md:px-[120px] w-full" style={{ background: '#0d0d0d' }}>
      <div className="w-full">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span
            className="inline-block font-bold mb-3 px-4 py-1.5 rounded-full text-sm"
            style={{ background: '#F9BB00', color: '#111' }}
          >
            고객 사례
          </span>
          <h2
            className="font-bold text-3xl md:text-5xl leading-tight"
            style={{ color: '#f0f0f0', fontFamily: "'Poppins', sans-serif" }}
          >
            산업별 맞춤형 클라우드<br className="hidden md:block" /> 도입 성공 사례
          </h2>
        </div>

        {/* Industry Filter Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-14">
          {CASE_STUDIES.map((cs) => {
            const isActive = cs.key === activeKey;
            return (
              <button
                key={cs.key}
                onClick={() => setActiveKey(cs.key)}
                className="px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                style={{
                  background: isActive ? '#5BA4F5' : '#1a1a1a',
                  color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                  border: isActive ? 'none' : '1px solid rgba(255,255,255,0.10)',
                }}
              >
                {cs.industry}
              </button>
            );
          })}
        </div>

        {/* Active Case Study Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Image */}
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
            <img
              src={active.image}
              alt={active.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-6">
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{ background: '#F9BB00', color: '#111' }}
              >
                {active.industry}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#f0f0f0' }}>
                {active.title}
              </h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#aaaaaa' }}>
                {active.description}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {active.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl p-4 md:p-5 text-center" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <p
                    className="text-xl md:text-2xl font-bold mb-1"
                    style={{ color: '#5BA4F5' }}
                  >
                    {m.value}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs md:text-sm font-medium"
                  style={{ background: '#1a2a40', color: '#5BA4F5' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}