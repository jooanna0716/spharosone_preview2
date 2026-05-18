import { useState } from 'react';
import { FEATURES } from '@/mocks/useCases';

export default function FeaturesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = FEATURES[activeIdx];

  return (
    <section className="py-16 md:py-24 px-6 md:px-[120px] w-full" style={{ background: '#0d0d0d' }}>
      <div className="w-full">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span
            className="inline-block font-bold mb-3 px-4 py-1.5 rounded-full text-sm"
            style={{ background: '#F9BB00', color: '#111' }}
          >
            활용 분야
          </span>
          <h2
            className="font-bold text-3xl md:text-5xl leading-tight"
            style={{ color: '#f0f0f0', fontFamily: "'Poppins', sans-serif" }}
          >
            다양한 산업과 요구에 맞는<br className="hidden md:block" /> 맞춤형 클라우드 솔루션
          </h2>
        </div>

        {/* Feature Tabs - Horizontal Scroll */}
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 mb-10 md:mb-14 scrollbar-hide">
          {FEATURES.map((f, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={f.key}
                onClick={() => setActiveIdx(i)}
                className="flex-shrink-0 flex flex-col items-center gap-2 md:gap-3 px-5 py-4 md:px-8 md:py-6 rounded-xl transition-all duration-300 cursor-pointer border"
                style={{
                  background: isActive ? '#F9BB00' : '#1a1a1a',
                  borderColor: isActive ? '#F9BB00' : 'rgba(255,255,255,0.08)',
                  minWidth: '120px',
                }}
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full"
                  style={{ background: isActive ? '#111' : '#2a2a2a' }}
                >
                  <i
                    className={`${f.icon} text-lg md:text-xl`}
                    style={{ color: isActive ? '#F9BB00' : '#5BA4F5' }}
                  />
                </div>
                <span
                  className="font-semibold text-sm md:text-base whitespace-nowrap"
                  style={{ color: isActive ? '#111' : 'rgba(255,255,255,0.55)' }}
                >
                  {f.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Feature Detail */}
        <div
          className="rounded-2xl p-6 md:p-12 transition-all duration-500"
          style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Left: Title & Summary */}
            <div className="md:w-1/3">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-full"
                  style={{ background: '#1a2a40' }}
                >
                  <i className={`${active.icon} text-xl`} style={{ color: '#F9BB00' }} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#f0f0f0' }}>{active.title}</h3>
                  <p className="text-sm" style={{ color: '#aaaaaa' }}>{active.subtitle}</p>
                </div>
              </div>
              <p className="text-base md:text-lg leading-relaxed mt-4" style={{ color: '#aaaaaa' }}>
                {active.summary}
              </p>
            </div>

            {/* Right: Detail Points */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {active.detailPoints.map((point, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5 md:p-6"
                    style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full mb-3"
                      style={{ background: '#F9BB00' }}
                    >
                      <span className="text-sm font-bold text-black">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: '#aaaaaa' }}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}