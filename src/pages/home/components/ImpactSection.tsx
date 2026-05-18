import { useEffect, useRef, useState } from 'react';

const SLIDES = [
  {
    number: '25',
    symbol: '%',
    arrow: '↓',
    title: '총소유비용 절감',
    desc: '운영 범위가 확대될수록 직접 운영은 비용 부담이 증가하지만, Spharos ONE은 서비스형 구조를 통해 최대 25% 비용을 절감하여 더욱 안정된 비용 흐름을 제공합니다.',
  },
  {
    number: '70',
    symbol: '%',
    arrow: '↑',
    title: '업무효율성 향상',
    desc: '운영 오버헤드 감소 및 Spharos CMP를 통해 관리 효율성을 70% 이상 향상하여, 고객은 비즈니스 성장에만 집중하고 생산성을 극대화할 수 있습니다.',
  },
  {
    number: '83',
    symbol: '%',
    arrow: '↓',
    title: '시스템 도입 리드타임 감소',
    desc: '시스템 도입 프로세스 최적화로 구축 리드타임을 최대 83%수준까지 획기적으로 단축, 비즈니스 전개 속도와 민첩성을 확보할 수 있습니다.',
  },
  {
    number: '24/7',
    symbol: '',
    arrow: '',
    title: 'All Time 관제센터 운영',
    desc: '전담인력의 24/7 무중단 관제 체계를 통해 시스템 공백을 제거하고, 상시 보안 체계 구축을 통해 비즈니스 연속성과 관리 신뢰성을 보장합니다.',
  },
];

const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

/* ─── 데스크탑 ─── */
function DesktopImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [globalProg, setGlobalProg] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const scrolled = -rect.top;
      const range = window.innerHeight;
      setGlobalProg(Math.min(Math.max(scrolled / range, 0), SLIDES.length));
    };
    (window as any).__setImpactProg = (v: number) => setGlobalProg(v);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      delete (window as any).__setImpactProg;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${(SLIDES.length + 1) * 100}vh` }}
    >
      <div
        style={{
          position: 'sticky',
          top: '64px',
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.78), rgba(0,0,0,0.78)), url('/images/도입 효과.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* 네비게이션과 동일한 컨테이너로 좌우 정렬 */}
        <div
          style={{
            width: '100%',
            padding: '0 120px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 헤더 */}
          <div style={{ paddingTop: 'clamp(40px, 6vh, 80px)', flexShrink: 0 }}>
            <span
              className="acc"
              style={{
                fontSize: 'var(--fs-label)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '14px',
              }}
            >
              도입효과
            </span>
            <h2
              style={{
                fontSize: 'var(--fs-display)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              숫자로 증명되는 비즈니스 성과
            </h2>
          </div>

          {/* 슬라이드 영역 */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {SLIDES.map((slide, i) => {
              const rel = globalProg - i;
              const isLast = i === SLIDES.length - 1;
              const r = isLast ? Math.min(rel, 0.75) : rel;

              let opacity = 0;
              let translateX = 0;
              let translateY = 40;

              if (r < 0) {
                opacity = 0; translateX = 0; translateY = 40;
              } else if (r <= 0.25) {
                const t = ease(r / 0.25);
                opacity = t; translateY = 40 * (1 - t); translateX = 0;
              } else if (r <= 0.75) {
                opacity = 1; translateY = 0; translateX = 0;
              } else if (r <= 1) {
                const t = ease((r - 0.75) / 0.25);
                opacity = 1 - t; translateX = t * 100; translateY = 0;
              } else {
                opacity = 0; translateX = 100; translateY = 0;
              }

              const is247 = slide.number === '24/7';

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'grid',
                    gridTemplateColumns: '45% 55%',
                    alignItems: 'end',
                    paddingBottom: 'clamp(16px, 22vh, 30vh)',
                    opacity,
                    transform: `translateX(${translateX}%) translateY(${translateY}px)`,
                    pointerEvents: opacity < 0.1 ? 'none' : 'auto',
                  }}
                >
                  {/* 좌측: 숫자 + 화살표(위) + %(아래) */}
                  <div style={{ overflow: 'visible', alignSelf: 'end', paddingLeft: is247 ? 'clamp(20px, 3vw, 60px)' : 'clamp(40px, 7vw, 140px)' }}>
                    {is247 ? (
                      <div style={{ display: 'flex', alignItems: 'flex-end', lineHeight: 1 }}>
                        <span style={{ fontSize: 'clamp(100px, 21.875vw, 280px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>24</span>
                        <span className="acc" style={{ fontSize: 'clamp(50px, 10.9375vw, 140px)', fontWeight: 900, lineHeight: 1, marginBottom: '18px', marginLeft: '-18px' }}>/</span>
                        <span style={{ fontSize: 'clamp(100px, 21.875vw, 280px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1, marginLeft: '-18px' }}>7</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'flex-end', lineHeight: 1 }}>
                        {/* 숫자 */}
                        <span style={{ fontSize: 'clamp(100px, 21.875vw, 280px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
                          {slide.number}
                        </span>
                        {/* 화살표(위) + %(아래) */}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginLeft: '10px',
                            marginBottom: '24px',
                          }}
                        >
                          <span
                            className="acc"
                            style={{
                              fontSize: 'clamp(44px, 9.375vw, 120px)',
                              fontWeight: 700,
                              lineHeight: 1,
                            }}
                          >
                            {slide.arrow}
                          </span>
                          <span
                            style={{
                              fontSize: 'clamp(36px, 7.8125vw, 100px)',
                              fontWeight: 700,
                              lineHeight: 1,
                              color: '#FFFFFF',
                              marginTop: '2px',
                            }}
                          >
                            {slide.symbol}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 우측: 제목 + 설명 */}
                  <div style={{ paddingLeft: '48px', marginBottom: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignSelf: 'end' }}>
                    <h3
                      style={{
                        fontSize: 'clamp(24px, 3.4375vw, 44px)',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        lineHeight: 1.3,
                        margin: '0 0 20px',
                      }}
                    >
                      {slide.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 'var(--fs-label)',
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {slide.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 모바일 ─── */
function MobileImpactSection() {
  return (
    <section style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.78), rgba(0,0,0,0.78)), url('/images/도입 효과.png')`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '64px 24px' }}>
      <span
        className="acc"
        style={{
          fontSize: '30px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          display: 'block',
          marginBottom: '10px',
        }}
      >
        도입효과
      </span>
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#FFFFFF',
          lineHeight: 1.3,
          marginBottom: '48px',
        }}
      >
        숫자로 증명되는 비즈니스 성과
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {SLIDES.map((slide, i) => {
          const is247 = slide.number === '24/7';
          return (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '16px' }}>
                {is247 ? (
                  <>
                    <span style={{ fontSize: '80px', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>24</span>
                    <span className="acc" style={{ fontSize: '44px', fontWeight: 900, lineHeight: 1, marginBottom: '8px' }}>/</span>
                    <span style={{ fontSize: '80px', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>7</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '80px', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>{slide.number}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '4px', marginBottom: '8px' }}>
                      <span className="acc" style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1 }}>{slide.arrow}</span>
                      <span style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1, color: '#FFFFFF' }}>{slide.symbol}</span>
                    </div>
                  </>
                )}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 10px' }}>{slide.title}</h3>
              <p style={{ fontSize: '30px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, margin: 0 }}>{slide.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── 메인 export ─── */
export default function ImpactSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile ? <MobileImpactSection /> : <DesktopImpactSection />;
}
