import { useState, useEffect, useRef } from 'react';

function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollP, setScrollP]   = useState(0);
  const [isMdUp, setIsMdUp]     = useState(true);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    setIsMdUp(mql.matches);
    const h = (e: MediaQueryListEvent) => setIsMdUp(e.matches);
    mql.addEventListener('change', h);
    return () => mql.removeEventListener('change', h);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      setScrollP(Math.max(0, Math.min(1, -el.getBoundingClientRect().top / scrollable)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── 카드 슬라이드 계산 (500vh 기준) ────────────────────────────────
  // 전환 1: scrollP 0.26 → 0.48  (카드1 퇴장 + 카드2 등장)
  // 전환 2: scrollP 0.52 → 0.74  (카드2 퇴장 + 카드3 등장)
  // 카드3 dwell: 0.74 → 0.86  (~48vh), 이후 검정 페이드 0.86 → 1.0
  const T = 0.22;

  // 카드1: 처음부터 보임 → 전환1에서 위로 밀려남
  const c1Exit = easeInOut(clamp01((scrollP - 0.26) / T));
  const c1Y    = `${-c1Exit * 100}vh`;

  // 카드2: 아래서 올라옴 → 전환2에서 위로 밀려남
  const c2Enter = easeInOut(clamp01((scrollP - 0.26) / T));
  const c2Exit  = easeInOut(clamp01((scrollP - 0.52) / T));
  const c2Y     = `${(1 - c2Enter) * 100 - c2Exit * 100}vh`;

  // 카드3: 아래서 올라옴 → 끝까지 유지
  const c3Enter = easeInOut(clamp01((scrollP - 0.52) / T));
  const c3Y     = `${(1 - c3Enter) * 100}vh`;

  // 마지막 검정 페이드 (카드3 완전 등장 후 충분한 dwell 확보)
  const blackP = easeInOut(clamp01((scrollP - 0.86) / 0.14));

  const cardStyle = (y: string): React.CSSProperties => ({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transform: `translateY(${y})`,
    willChange: 'transform',
    padding: isMdUp ? '0 80px' : '0 24px',
    textAlign: 'center',
  });

  return (
    <div ref={sectionRef} style={{ height: '500vh', position: 'relative', background: '#0d0d0d' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* ── 키프레임 ─────────────────────────────────────────────── */}
        <style>{`
          @keyframes hB1 {
            0%,100% { transform: translate(0,     0)    scale(1.00); }
            20%     { transform: translate(18vw, -14vh) scale(1.14); }
            45%     { transform: translate(-12vw, 20vh) scale(0.90); }
            70%     { transform: translate(22vw,  10vh) scale(1.08); }
          }
          @keyframes hB2 {
            0%,100% { transform: translate(0,     0)    scale(1.00); }
            30%     { transform: translate(-20vw, 16vh) scale(1.12); }
            60%     { transform: translate(14vw, -22vh) scale(0.88); }
          }
          @keyframes hB3 {
            0%,100% { transform: translate(0,     0)    scale(1.00); }
            35%     { transform: translate(24vw,  18vh) scale(1.16); }
            65%     { transform: translate(-16vw,-14vh) scale(0.92); }
          }
          @keyframes hB4 {
            0%,100% { transform: translate(0,     0)    scale(1.00); }
            40%     { transform: translate(-22vw, 12vh) scale(1.10); }
            75%     { transform: translate(16vw, -18vh) scale(0.94); }
          }
          @keyframes hB5 {
            0%,100% { transform: translate(0,     0)    scale(1.00); }
            50%     { transform: translate(-14vw,-20vh) scale(1.12); }
          }
        `}</style>

        {/* ── 유영하는 그라디언트 배경 ────────────────────────────────── */}
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

        {/* ── 하단 그라데이션 — 다음 섹션과 자연스럽게 연결 */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%',
          background: 'linear-gradient(to top, #0d0d0d 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 9,
        }} />

        {/* ── 검정 페이드 ─────────────────────────────────────────── */}
        <div style={{ position: 'absolute', inset: 0, background: '#0d0d0d',
          opacity: blackP, pointerEvents: 'none', zIndex: 10 }} />

        {/* ── 카드 레이어 (overflow hidden으로 클리핑) ──────────────── */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 5 }}>

          {/* 카드 1 — Spharos ONE */}
          <div style={cardStyle(c1Y)}>
            <h1 style={{
              fontSize: 'var(--fs-hero)',
              fontWeight: 900,
              color: '#000',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              margin: 0,
            }}>
              Spharos ONE
            </h1>
          </div>

          {/* 카드 2 — 슬라이드 1 */}
          <div style={cardStyle(c2Y)}>
            <p style={{ fontSize: 'var(--fs-giant)', fontWeight: 800, color: '#000', lineHeight: 1.2, margin: '0 0 14px' }}>
              클라우드, 이제 클릭 한 번에
            </p>
            <p style={{ fontSize: 'var(--fs-large)', fontWeight: 600, color: '#111', lineHeight: 1.4, margin: '0 0 16px', opacity: 0.85 }}>
              가장 쉬운 프라이빗 클라우드, Spharos One
            </p>
            <p style={{ fontSize: 'var(--fs-label)', color: '#111', lineHeight: 1.6, margin: '0 0 4px', opacity: 0.68 }}>
              복잡한 구축과 운영은 One으로 통합하고
            </p>
            <p style={{ fontSize: 'var(--fs-label)', color: '#111', lineHeight: 1.6, margin: 0, opacity: 0.68 }}>
              더 빠르게, 더 안정적으로
            </p>
          </div>

          {/* 카드 3 — 슬라이드 2 */}
          <div style={cardStyle(c3Y)}>
            <p style={{ fontSize: 'var(--fs-giant)', fontWeight: 800, color: '#000', lineHeight: 1.2, margin: '0 0 14px' }}>
              구축하지 마세요, 구독하세요
            </p>
            <p style={{ fontSize: 'var(--fs-large)', fontWeight: 600, color: '#111', lineHeight: 1.4, margin: '0 0 16px', opacity: 0.85 }}>
              선납금 0원 · 위약금 0원 · 첫 달 이후 언제든 해지
            </p>
            <p style={{ fontSize: 'var(--fs-label)', color: '#111', lineHeight: 1.6, margin: '0 0 4px', opacity: 0.68 }}>
              수억 원의 초기 투자도, 발목 잡는 약정도 없이
            </p>
            <p style={{ fontSize: 'var(--fs-label)', color: '#111', lineHeight: 1.6, margin: 0, opacity: 0.68 }}>
              프라이빗 클라우드의 새로운 기준
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
