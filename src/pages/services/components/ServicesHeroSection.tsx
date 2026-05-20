import { useState, useRef, useEffect } from 'react';

type TabKey = 'main' | 'license' | 'addon';

const STYLES = `
  @keyframes sB1 {
    0%,100% { transform: translate(0%,    0%)    scale(1.00); }
    20%     { transform: translate(25%,  -18%)   scale(1.14); }
    45%     { transform: translate(-18%,  28%)   scale(0.90); }
    70%     { transform: translate(32%,   12%)   scale(1.08); }
  }
  @keyframes sB2 {
    0%,100% { transform: translate(0%,    0%)    scale(1.00); }
    30%     { transform: translate(-28%,  22%)   scale(1.12); }
    60%     { transform: translate(18%,  -28%)   scale(0.88); }
  }
  @keyframes sB3 {
    0%,100% { transform: translate(0%,    0%)    scale(1.00); }
    35%     { transform: translate(38%,   22%)   scale(1.16); }
    65%     { transform: translate(-22%,  -18%)  scale(0.92); }
  }
  @keyframes sB4 {
    0%,100% { transform: translate(0%,    0%)    scale(1.00); }
    40%     { transform: translate(-32%,  18%)   scale(1.10); }
    75%     { transform: translate(22%,  -22%)   scale(0.94); }
  }
  @keyframes sB5 {
    0%,100% { transform: translate(0%,    0%)    scale(1.00); }
    50%     { transform: translate(-18%,  -28%)  scale(1.12); }
  }

  @keyframes menuBounce {
    0%   { transform: translateY(0px); }
    40%  { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  .svc-menu-txt {
    display: block;
    cursor: default;
  }
  .svc-menu-txt:hover {
    animation: menuBounce 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @keyframes arrowFlow {
    0%   { opacity: 0.08; }
    35%  { opacity: 0.80; }
    65%  { opacity: 0.80; }
    100% { opacity: 0.08; }
  }
  .arr-1 { animation: arrowFlow 1.8s ease-in-out infinite; animation-delay: 0s; }
  .arr-2 { animation: arrowFlow 1.8s ease-in-out infinite; animation-delay: 0.3s; }
  .arr-3 { animation: arrowFlow 1.8s ease-in-out infinite; animation-delay: 0.6s; }
`;

const MENU_ITEMS = [
  {
    key: 'main' as TabKey,
    lines: ['Main', 'Services'],
    slogan1: '구축 부담 제로, AX는 프로답게',
    slogan2: '스파로스원 서비스로 더 강력한 비즈니스',
  },
  {
    key: 'license' as TabKey,
    lines: ['Licenses'],
    slogan1: '시작부터 확장까지 AtoZ',
    slogan2: '조직규모에 맞춘 스마트 구독 라이선스',
  },
  {
    key: 'addon' as TabKey,
    lines: ['Add-on', 'Services'],
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

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const update = () => setImgHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 히어로 구간에서 아래로 스크롤 시 service-detail로 즉시 앵커
  useEffect(() => {
    let locked = false;
    const onWheel = (e: WheelEvent) => {
      if (locked || e.deltaY <= 0) return;
      const detail = document.getElementById('service-detail');
      if (!detail) return;
      const detailTop = detail.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY < detailTop - 10) {
        e.preventDefault();
        locked = true;
        window.scrollTo({ top: detailTop, behavior: 'smooth' });
        setTimeout(() => { locked = false; }, 1500);
      }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  const handleClick = (key: TabKey) => {
    setActive(key);
    onTabChange(key);
  };

  return (
    <>
      <style>{STYLES}</style>
      <section
        style={{
          position: 'relative',
          height: '100vh',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          padding: '0 120px',
          gap: '60px',
          overflow: 'hidden',
        }}
      >
        {/* ── 왼쪽: 그라데이션 이미지 박스 ─────────────────────────── */}
        <div style={{ flex: '0 0 auto', width: '50%' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: `${imgHeight}px`,
              borderRadius: '6px',
              overflow: 'hidden',
              background: '#1E0060',
              transition: 'height 0.3s ease',
            }}
          >
            {/* 애니메이션 그라데이션 블롭 */}
            <div style={{ position: 'absolute', left: '-20%', top: '-20%', width: '90%', height: '140%',
              background: 'radial-gradient(ellipse at center, #6200CC 0%, rgba(90,0,200,0.72) 35%, transparent 68%)',
              animation: 'sB1 14s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', left: '10%', top: '-45%', width: '85%', height: '125%',
              background: 'radial-gradient(ellipse at center, #BB3FFF 0%, rgba(160,50,250,0.65) 35%, transparent 66%)',
              animation: 'sB2 18s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', left: '28%', top: '5%', width: '75%', height: '115%',
              background: 'radial-gradient(ellipse at center, #3060FF 0%, rgba(50,90,255,0.60) 38%, transparent 65%)',
              animation: 'sB3 16s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', right: '-18%', top: '-18%', width: '88%', height: '140%',
              background: 'radial-gradient(ellipse at center, #00DDFF 0%, rgba(0,200,240,0.78) 30%, transparent 62%)',
              animation: 'sB4 12s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', right: '0%', bottom: '-30%', width: '70%', height: '105%',
              background: 'radial-gradient(ellipse at center, #00FFCE 0%, rgba(0,230,200,0.65) 35%, transparent 63%)',
              animation: 'sB5 20s ease-in-out infinite' }} />

            {/* 하단 비네트 */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)',
            }} />

            {/* 상단 좌측 레이블 */}
            <p style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              zIndex: 3,
              margin: 0,
              fontFamily: "'Poppins', sans-serif",
              fontSize: '16px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.03em',
              pointerEvents: 'none',
            }}>
              Spharos One Services
            </p>

            {/* 슬로건 — 클릭한 메뉴에 따라 페이드 전환 */}
            {MENU_ITEMS.map(item => (
              <div
                key={item.key}
                style={{
                  position: 'absolute',
                  bottom: '28px',
                  left: '28px',
                  zIndex: 3,
                  opacity: active === item.key ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  pointerEvents: 'none',
                }}
              >
                <p style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: '40px',
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {item.slogan1}
                </p>
                <p style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 'clamp(13px, 1.7vw, 28px)',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.82)',
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {item.slogan2}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 오른쪽: 메뉴 아이템 ─────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div
            ref={menuRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.4rem, 1.2vw, 1.8rem)',
              width: '100%',
            }}
          >
            {MENU_ITEMS.map(item => {
              const isActive = active === item.key;
              return (
                <div
                  key={item.key}
                  onClick={() => handleClick(item.key)}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  {/* 흰 점 — 비활성 텍스트 왼쪽 기준선에 고정, 첫 글자 수직 중앙 */}
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 'clamp(1.4rem, 3.5vw, 4.75rem)',
                    transform: 'translateY(-50%)',
                    width: 'clamp(12px, 1vw, 18px)',
                    height: 'clamp(12px, 1vw, 18px)',
                    borderRadius: '50%',
                    background: '#ffffff',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }} />
                  <span
                    className="svc-menu-txt"
                    style={{
                      display: 'block',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 'clamp(2.8rem, 7vw, 9.5rem)',
                      fontWeight: isActive ? 800 : 700,
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.18)',
                      lineHeight: 1.0,
                      paddingLeft: isActive ? 'clamp(36px, 3.5vw, 56px)' : '0',
                      transition: 'color 0.3s, padding-left 0.3s ease',
                    }}
                  >
                    {item.lines.map((line, i) => (
                      <span key={i} style={{ display: 'block' }}>{line}</span>
                    ))}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* ── 하단 흐르는 화살표 ─────────────────────────────────── */}
        <div style={{
          position: 'absolute', bottom: '36px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '4px', pointerEvents: 'none',
        }}>
          <div className="arr-1" style={{ width: '20px', height: '20px', borderRight: '2.5px solid rgba(255,255,255,0.85)', borderBottom: '2.5px solid rgba(255,255,255,0.85)', transform: 'rotate(45deg)' }} />
          <div className="arr-2" style={{ width: '20px', height: '20px', borderRight: '2.5px solid rgba(255,255,255,0.85)', borderBottom: '2.5px solid rgba(255,255,255,0.85)', transform: 'rotate(45deg)' }} />
          <div className="arr-3" style={{ width: '20px', height: '20px', borderRight: '2.5px solid rgba(255,255,255,0.85)', borderBottom: '2.5px solid rgba(255,255,255,0.85)', transform: 'rotate(45deg)' }} />
        </div>
      </section>
    </>
  );
}
