import { useState } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

type TabKey = 'main' | 'license' | 'addon';

const STYLES = `
  @keyframes sB1 {
    0%,100% { transform: translate(0,     0)    scale(1.00); }
    25%     { transform: translate(3vw,  -2vh)  scale(1.08); }
    60%     { transform: translate(-2vw,  3vh)  scale(0.94); }
  }
  @keyframes sB2 {
    0%,100% { transform: translate(0,     0)    scale(1.00); }
    35%     { transform: translate(-3vw,  2vh)  scale(1.07); }
    70%     { transform: translate(2vw,  -3vh)  scale(0.93); }
  }
  @keyframes sB3 {
    0%,100% { transform: translate(0,     0)    scale(1.00); }
    40%     { transform: translate(3vw,   2vh)  scale(1.09); }
    75%     { transform: translate(-2vw, -2vh)  scale(0.95); }
  }
  @keyframes sB4 {
    0%,100% { transform: translate(0,     0)    scale(1.00); }
    30%     { transform: translate(-3vw,  2vh)  scale(1.06); }
    65%     { transform: translate(2vw,  -2vh)  scale(0.94); }
  }
  @keyframes sB5 {
    0%,100% { transform: translate(0,     0)    scale(1.00); }
    50%     { transform: translate(-2vw, -3vh)  scale(1.07); }
  }
`;

const MENU_ITEMS = [
  {
    key: 'main' as TabKey,
    label: 'Main Services',
    bgImage: '/images/메인서비스.png',
    slogan1: '구축 부담 제로, AX는 프로답게',
    slogan2: '스파로스 원 서비스로 더 강력한 비즈니스',
  },
  {
    key: 'license' as TabKey,
    label: 'Licenses',
    bgImage: '/images/라이선스.png',
    slogan1: '시작부터 확장까지 AtoZ',
    slogan2: '조직규모에 맞춘 스마트 구독 라이선스',
  },
  {
    key: 'addon' as TabKey,
    label: 'Add-on Services',
    bgImage: '/images/부가서비스.png',
    slogan1: '탄탄한 운영, 압도적인 경쟁력',
    slogan2: '안전과 효율을 더하는 프리미엄 부가서비스',
  },
];

interface Props {
  onTabChange: (tab: TabKey) => void;
}

export default function ServicesHeroSection({ onTabChange }: Props) {
  const [active, setActive] = useState<TabKey>('main');
  const { isMobile, isTablet } = useBreakpoint();

  const handleClick = (key: TabKey) => {
    setActive(key);
    onTabChange(key);
  };

  const hPad = isMobile ? '0 16px' : isTablet ? '0 clamp(24px, 4vw, 60px)' : '0 120px';

  return (
    <>
      <style>{STYLES}</style>
      <section
        style={{
          position: 'relative',
          height: '100vh',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        {/* 배경 이미지 */}
        {MENU_ITEMS.map(item => (
          <div
            key={item.key}
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: `url(${item.bgImage})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              opacity: active === item.key ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          />
        ))}

        {/* 검정 오버레이 */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.65)', pointerEvents: 'none' }} />

        {/* 유동 그라디언트 블롭 — 섹션 전체 */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', left: '-15%', top: '-20%', width: '110%', height: '110%',
            background: 'radial-gradient(ellipse at center, rgba(98,0,204,0.85) 0%, rgba(90,0,200,0.58) 38%, transparent 68%)',
            animation: 'sB1 7s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', left: '-5%', top: '-30%', width: '100%', height: '110%',
            background: 'radial-gradient(ellipse at center, rgba(187,63,255,0.80) 0%, rgba(160,50,250,0.52) 38%, transparent 66%)',
            animation: 'sB2 9s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', left: '10%', top: '-5%', width: '100%', height: '115%',
            background: 'radial-gradient(ellipse at center, rgba(48,96,255,0.75) 0%, rgba(50,90,255,0.48) 40%, transparent 65%)',
            animation: 'sB3 8s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', right: '-15%', top: '-20%', width: '110%', height: '110%',
            background: 'radial-gradient(ellipse at center, rgba(0,221,255,0.80) 0%, rgba(0,200,240,0.58) 32%, transparent 62%)',
            animation: 'sB4 6s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', left: '5%', bottom: '-20%', width: '100%', height: '100%',
            background: 'radial-gradient(ellipse at center, rgba(0,255,206,0.70) 0%, rgba(0,230,200,0.45) 38%, transparent 63%)',
            animation: 'sB5 10s ease-in-out infinite' }} />
        </div>

        {/* 콘텐츠 — 블롭 위에 올라가는 레이어 */}
        <div
          style={{
            position: 'absolute', inset: 0,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: hPad,
          }}
        >
          {/* ── 상단 탭 ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: isMobile ? 'clamp(14px, 4.5vw, 24px)' : 'clamp(24px, 4vw, 56px)',
              paddingTop: isMobile ? '88px' : '100px',
            }}
          >
            {MENU_ITEMS.map(item => {
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleClick(item.key)}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: isActive ? '2px solid #ffffff' : '2px solid transparent',
                    padding: '0 0 6px',
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: isMobile
                      ? 'clamp(0.95rem, 3.8vw, 1.4rem)'
                      : isTablet
                      ? 'clamp(1.2rem, 2.8vw, 1.8rem)'
                      : 'clamp(1.4rem, 2.2vw, 2.2rem)',
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.45)',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* ── 하단 슬로건 + View more (블롭 위, 하단 왼쪽) ── */}
          <div
            style={{
              paddingBottom: isMobile ? '48px' : '64px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: isMobile ? '100%' : '55%',
            }}
          >
            <p style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.45)', margin: 0, letterSpacing: '0.04em', fontFamily: "'Poppins', sans-serif" }}>
              Spharos One Services
            </p>

            {/* 슬로건 — 탭 전환 시 fade */}
            <div style={{ position: 'relative', minHeight: isMobile ? '80px' : '120px' }}>
              {MENU_ITEMS.map(item => (
                <div
                  key={item.key}
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    opacity: active === item.key ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: active === item.key ? 'auto' : 'none',
                  }}
                >
                  <p style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: isMobile ? 'clamp(1.4rem, 5.5vw, 2rem)' : isTablet ? 'clamp(1.6rem, 4vw, 2.6rem)' : 'clamp(1.8rem, 3vw, 3rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.3,
                    margin: '0 0 8px',
                    whiteSpace: isMobile ? 'normal' : 'nowrap',
                  }}>
                    {item.slogan1}
                  </p>
                  <p style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: isMobile ? 'clamp(0.8rem, 3vw, 1rem)' : isTablet ? 'clamp(0.9rem, 2vw, 1.3rem)' : 'clamp(0.95rem, 1.4vw, 1.4rem)',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.80)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}>
                    {item.slogan2}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('service-detail')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                alignSelf: 'flex-start',
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '100px',
                color: '#ffffff',
                fontSize: '14px', fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
            >
              View more <span style={{ fontSize: '16px' }}>→</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
