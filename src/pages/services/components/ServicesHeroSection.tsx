import { useState, useRef, useEffect } from 'react';
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
  @keyframes menuBounce {
    0%   { transform: translateY(0px); }
    40%  { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  .svc-menu-txt { display: block; cursor: default; }
  .svc-menu-txt:hover { animation: menuBounce 0.42s cubic-bezier(0.25,0.46,0.45,0.94); }
`;

const MENU_ITEMS = [
  {
    key: 'main' as TabKey,
    lines: ['Main', 'Services'],
    underlineIdx: 1,
    bgImage: '/images/메인서비스.png',
    slogan1: '구축 부담 제로, AX는 프로답게',
    slogan2: '스파로스 원 서비스로 더 강력한 비즈니스',
  },
  {
    key: 'license' as TabKey,
    lines: ['Licenses'],
    underlineIdx: 0,
    bgImage: '/images/라이선스.png',
    slogan1: '시작부터 확장까지 AtoZ',
    slogan2: '조직규모에 맞춘 스마트 구독 라이선스',
  },
  {
    key: 'addon' as TabKey,
    lines: ['Add-on', 'Services'],
    underlineIdx: 1,
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
  const menuRef = useRef<HTMLDivElement>(null);
  const [imgHeight, setImgHeight] = useState(500);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const update = () => setImgHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleClick = (key: TabKey) => {
    setActive(key);
    onTabChange(key);
  };

  /* ── 블롭 공통 ── */
  const Blobs = () => (
    <>
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
    </>
  );

  /* ── 슬로건 + View more ── */
  const Slogan = ({ align }: { align: 'bottom-left' | 'center' }) => (
    <div style={{
      position: 'absolute',
      ...(align === 'bottom-left'
        ? { bottom: '12%', left: '28px', right: '28px' }
        : { top: '50%', left: '16px', right: '16px', transform: 'translateY(-50%)' }
      ),
      zIndex: 3,
      display: 'flex', flexDirection: 'column', gap: '20px',
    }}>
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: '14px', fontWeight: 400,
        color: 'rgba(255,255,255,0.45)',
        margin: 0, letterSpacing: '0.04em',
      }}>
        Spharos One Services
      </p>
      <div style={{ position: 'relative', height: align === 'center' ? '80px' : '100px', pointerEvents: 'none' }}>
        {MENU_ITEMS.map(item => (
          <div
            key={item.key}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              opacity: active === item.key ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          >
            <p style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: align === 'center' ? 'clamp(18px, 4.5vw, 28px)' : 'clamp(20px, 3vw, 46px)',
              fontWeight: 700, color: '#fff',
              lineHeight: 1.4, margin: 0,
            }}>
              {item.slogan1}
            </p>
            <p style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: align === 'center' ? 'clamp(13px, 2.8vw, 16px)' : 'clamp(13px, 1.5vw, 22px)',
              fontWeight: 400, color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.5, margin: 0,
            }}>
              {item.slogan2}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() => document.getElementById('service-detail')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 20px', background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.3)', borderRadius: '100px',
          color: '#ffffff', fontSize: '14px', fontWeight: 600,
          fontFamily: "'Poppins', sans-serif", cursor: 'pointer',
          backdropFilter: 'blur(8px)', transition: 'background 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
      >
        View more <span style={{ fontSize: '16px' }}>→</span>
      </button>
    </div>
  );

  return (
    <>
      <style>{STYLES}</style>
      <section
        style={{
          position: 'relative',
          height: '100vh',
          background: '#000',
          overflow: 'hidden',
          display: isMobile ? 'block' : 'flex',
          alignItems: isMobile ? undefined : 'center',
          padding: isMobile ? '0' : isTablet ? '0 clamp(24px, 4vw, 60px)' : '0 120px',
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

        {/* ── 모바일 레이아웃 ── */}
        {isMobile ? (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            display: 'flex', flexDirection: 'column',
            padding: '0 16px',
          }}>
            {/* 상단: 컴팩트 탭 바 */}
            <div style={{
              display: 'flex', alignItems: 'flex-end', gap: '20px',
              paddingTop: '88px', flexShrink: 0,
            }}>
              {MENU_ITEMS.map(item => {
                const isActive = active === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleClick(item.key)}
                    style={{
                      background: 'none', border: 'none',
                      borderBottom: isActive ? '2px solid #ffffff' : '2px solid transparent',
                      padding: '0 0 6px', cursor: 'pointer',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '28px',
                      letterSpacing: '-0.01em',
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.45)',
                      lineHeight: 1, whiteSpace: 'nowrap',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item.lines.join(' ')}
                  </button>
                );
              })}
            </div>

            {/* 하단: 블롭 + 슬로건 중앙 배치 */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <Blobs />
              <Slogan align="center" />
            </div>
          </div>
        ) : (
          /* ── 데스크탑 / 태블릿 레이아웃 ── */
          <div
            style={{
              position: 'relative', zIndex: 2,
              width: '100%',
              display: 'flex', alignItems: 'center',
              flexDirection: 'row',
              gap: 'clamp(20px, 2.5vw, 48px)',
              padding: 'clamp(20px, 2.5vw, 36px)',
            }}
          >
            {/* 왼쪽: 블롭 + 슬로건 */}
            <div style={{
              flex: '0 0 auto', width: '50%',
              position: 'relative',
              height: `${imgHeight}px`,
              transition: 'height 0.3s ease',
            }}>
              <Blobs />
              <Slogan align="bottom-left" />
            </div>

            {/* 오른쪽: 큰 메뉴 */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: 'clamp(16px, 3vw, 48px)' }}>
              <div
                ref={menuRef}
                style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.8rem, 2vw, 3rem)', width: '100%' }}
              >
                {MENU_ITEMS.map(item => {
                  const isActive = active === item.key;
                  return (
                    <div key={item.key} onClick={() => handleClick(item.key)} style={{ cursor: 'pointer', position: 'relative' }}>
                      <span style={{
                        position: 'absolute', left: 0,
                        top: 'clamp(1.4rem, 3.5vw, 4.75rem)',
                        transform: 'translateY(-50%)',
                        width: 'clamp(12px, 1vw, 18px)', height: 'clamp(12px, 1vw, 18px)',
                        borderRadius: '50%', background: '#ffffff',
                        opacity: isActive ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none',
                      }} />
                      <span
                        className="svc-menu-txt"
                        style={{
                          display: 'block',
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: 'clamp(2.8rem, 7vw, 9.5rem)',
                          fontWeight: isActive ? 800 : 700,
                          color: isActive ? '#ffffff' : 'rgba(255,255,255,0.50)',
                          lineHeight: 1.0,
                          paddingLeft: isActive ? 'clamp(36px, 3.5vw, 56px)' : '0',
                          transition: 'color 0.3s, padding-left 0.3s ease',
                        }}
                      >
                        {item.lines.map((line, i) => (
                          <span key={i} style={{ display: 'block', textDecoration: isActive && i === item.underlineIdx ? 'underline' : 'none', textUnderlineOffset: '8px', textDecorationThickness: '3px' }}>{line}</span>
                        ))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
