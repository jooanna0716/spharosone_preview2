import { useState, useEffect } from 'react';
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

  const activeItem = MENU_ITEMS.find(m => m.key === active)!;

  const hPad = isMobile ? '0 16px' : isTablet ? '0 clamp(24px, 4vw, 60px)' : '0 120px';

  return (
    <>
      <style>{STYLES}</style>
      <section
        style={{
          position: 'relative',
          height: '100vh',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
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

        {/* 콘텐츠 wrapper */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: hPad,
          }}
        >
          {/* ── 상단 탭 ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: isMobile ? 'clamp(16px, 5vw, 28px)' : 'clamp(24px, 4vw, 56px)',
              paddingTop: isMobile ? '100px' : '110px',
              flexShrink: 0,
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
                    padding: 0,
                    cursor: 'pointer',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: isMobile
                      ? 'clamp(1.1rem, 4.5vw, 1.6rem)'
                      : isTablet
                      ? 'clamp(1.4rem, 3.5vw, 2.2rem)'
                      : 'clamp(1.6rem, 2.8vw, 2.8rem)',
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.45)',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                    transition: 'color 0.3s, font-weight 0.15s',
                    borderBottom: isActive ? '3px solid #ffffff' : '3px solid transparent',
                    paddingBottom: '8px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* ── 슬로건 + View more (탭 아래) ── */}
          <div
            style={{
              marginTop: isMobile ? '32px' : '48px',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <p style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: isMobile ? 'clamp(1.4rem, 5.5vw, 2rem)' : isTablet ? 'clamp(1.6rem, 4vw, 2.6rem)' : 'clamp(2rem, 3.5vw, 3.2rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.3,
              margin: 0,
              transition: 'opacity 0.4s ease',
            }}>
              {activeItem.slogan1}
            </p>
            <p style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: isMobile ? 'clamp(0.85rem, 3.2vw, 1.1rem)' : isTablet ? 'clamp(0.9rem, 2vw, 1.3rem)' : 'clamp(1rem, 1.5vw, 1.4rem)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.80)',
              lineHeight: 1.5,
              margin: 0,
              transition: 'opacity 0.4s ease',
            }}>
              {activeItem.slogan2}
            </p>

            <button
              onClick={() => document.getElementById('service-detail')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                alignSelf: 'flex-start',
                marginTop: '8px',
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

          {/* ── 하단 블롭 영역 ── */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
            {/* 유동 그라디언트 블롭 */}
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
        </div>
      </section>
    </>
  );
}
