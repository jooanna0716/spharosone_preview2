import { useState, useEffect } from 'react';

const TRANSITION_MS = 700;
const INTERVAL_MS = 4500;

export default function HeroSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [prevCard, setPrevCard] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [isMdUp, setIsMdUp] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    setIsMdUp(mql.matches);
    const h = (e: MediaQueryListEvent) => setIsMdUp(e.matches);
    mql.addEventListener('change', h);
    return () => mql.removeEventListener('change', h);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard(prev => {
        const next = (prev + 1) % 2;
        setPrevCard(prev);
        setAnimKey(k => k + 1);
        setTimeout(() => setPrevCard(null), TRANSITION_MS + 100);
        return next;
      });
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const baseStyle = (pad: boolean): React.CSSProperties => ({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: pad ? '0 80px' : '0 24px',
    textAlign: 'center',
  });

  return (
    <div style={{ height: '100vh', position: 'relative', background: '#1E0060', overflow: 'hidden' }}>

      <style>{`
        @keyframes hB1 {
          0%,100% { transform: translate(0,0) scale(1.00); }
          20%     { transform: translate(18vw,-14vh) scale(1.14); }
          45%     { transform: translate(-12vw,20vh) scale(0.90); }
          70%     { transform: translate(22vw,10vh) scale(1.08); }
        }
        @keyframes hB2 {
          0%,100% { transform: translate(0,0) scale(1.00); }
          30%     { transform: translate(-20vw,16vh) scale(1.12); }
          60%     { transform: translate(14vw,-22vh) scale(0.88); }
        }
        @keyframes hB3 {
          0%,100% { transform: translate(0,0) scale(1.00); }
          35%     { transform: translate(24vw,18vh) scale(1.16); }
          65%     { transform: translate(-16vw,-14vh) scale(0.92); }
        }
        @keyframes hB4 {
          0%,100% { transform: translate(0,0) scale(1.00); }
          40%     { transform: translate(-22vw,12vh) scale(1.10); }
          75%     { transform: translate(16vw,-18vh) scale(0.94); }
        }
        @keyframes hB5 {
          0%,100% { transform: translate(0,0) scale(1.00); }
          50%     { transform: translate(-14vw,-20vh) scale(1.12); }
        }
        @keyframes heroSlideIn {
          from { opacity: 0; transform: translateY(26px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0px); }
        }
        @keyframes heroSlideOut {
          from { opacity: 1; transform: translateY(0);     filter: blur(0px); }
          to   { opacity: 0; transform: translateY(-20px); filter: blur(5px); }
        }
      `}</style>

      {/* 배경 블롭 */}
      <div style={{ position: 'absolute', inset: 0, background: '#1E0060' }} />
      <div style={{ position: 'absolute', left: '-15%', top: '-15%', width: '80vw', height: '130vh',
        background: 'radial-gradient(ellipse at center, #6200CC 0%, rgba(90,0,200,0.72) 35%, transparent 68%)',
        animation: 'hB1 14s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', left: '10%', top: '-35%', width: '75vw', height: '115vh',
        background: 'radial-gradient(ellipse at center, #BB3FFF 0%, rgba(160,50,250,0.65) 35%, transparent 66%)',
        animation: 'hB2 18s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', left: '25%', top: '5%', width: '65vw', height: '105vh',
        background: 'radial-gradient(ellipse at center, #3060FF 0%, rgba(50,90,255,0.60) 38%, transparent 65%)',
        animation: 'hB3 16s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', right: '-10%', top: '-10%', width: '80vw', height: '130vh',
        background: 'radial-gradient(ellipse at center, #00DDFF 0%, rgba(0,200,240,0.78) 30%, transparent 62%)',
        animation: 'hB4 12s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', right: '0%', bottom: '-25%', width: '60vw', height: '95vh',
        background: 'radial-gradient(ellipse at center, #00FFCE 0%, rgba(0,230,200,0.65) 35%, transparent 63%)',
        animation: 'hB5 20s ease-in-out infinite' }} />

      {/* 하단 그라데이션 */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%',
        background: 'linear-gradient(to top, #0d0d0d 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 9,
      }} />

      {/* 카드 레이어 */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 5 }}>

        {/* 카드 1 — Spharos ONE */}
        <div
          style={{
            ...baseStyle(isMdUp),
            animation: activeCard === 0
              ? `heroSlideIn ${TRANSITION_MS}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards`
              : prevCard === 0
              ? `heroSlideOut ${TRANSITION_MS * 0.85}ms ease forwards`
              : undefined,
            opacity: activeCard === 0 ? undefined : prevCard === 0 ? undefined : 0,
            pointerEvents: activeCard === 0 ? 'auto' : 'none',
          }}
          key={activeCard === 0 ? `active-0-${animKey}` : `prev-0-${animKey}`}
        >
          <h1 style={{
            fontSize: 'var(--fs-hero)',
            fontWeight: 900,
            color: '#000000',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            margin: '0 0 20px',
          }}>
            Spharos One
          </h1>
          <p style={{
            fontSize: 'var(--fs-label)',
            fontWeight: 600,
            color: '#000000',
            lineHeight: 1.6,
            margin: 0,
            opacity: 0.68,
          }}>
            스파로스 원ㅡ구독형 프라이빗 클라우드
          </p>
        </div>

        {/* 카드 2 — 구독하세요 */}
        <div
          style={{
            ...baseStyle(isMdUp),
            animation: activeCard === 1
              ? `heroSlideIn ${TRANSITION_MS}ms cubic-bezier(0.25,0.46,0.45,0.94) forwards`
              : prevCard === 1
              ? `heroSlideOut ${TRANSITION_MS * 0.85}ms ease forwards`
              : undefined,
            opacity: activeCard === 1 ? undefined : prevCard === 1 ? undefined : 0,
            pointerEvents: activeCard === 1 ? 'auto' : 'none',
          }}
          key={activeCard === 1 ? `active-1-${animKey}` : `prev-1-${animKey}`}
        >
          <p style={{ fontSize: 'var(--fs-giant)', fontWeight: 800, color: '#000000', lineHeight: 1.2, margin: '0 0 14px' }}>
            구축하지 마세요, 구독하세요
          </p>
          <p style={{ fontSize: 'var(--fs-large)', fontWeight: 600, color: '#000000', lineHeight: 1.4, margin: '0 0 16px', opacity: 0.85 }}>
            선납금 0원 · 위약금 0원 · 첫 달 이후 언제든 해지
          </p>
          <p style={{ fontSize: 'var(--fs-label)', color: '#000000', lineHeight: 1.3, margin: '0 0 4px', opacity: 0.68 }}>
            스파로스 원 하나로
          </p>
          <p style={{ fontSize: 'var(--fs-label)', color: '#000000', lineHeight: 1.3, margin: '0 0 4px', opacity: 0.68 }}>
            복잡함 없이, 부담 없이
          </p>
          <p style={{ fontSize: 'var(--fs-label)', color: '#000000', lineHeight: 1.3, margin: 0, opacity: 0.68 }}>
            가장 쉽게 시작하는 프라이빗 클라우드
          </p>
        </div>

      </div>
    </div>
  );
}
