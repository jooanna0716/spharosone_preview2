import { useState, useEffect } from 'react';

const SLIDES = [
  {
    line1: '클라우드, 이제 클릭 한 번에',
    line2: '가장 쉬운 프라이빗 클라우드, Spharos One',
    line3: '복잡한 구축과 운영은 One으로 통합하고',
    line4: '더 빠르게, 더 안정적으로',
  },
  {
    line1: '구축하지 마세요, 구독하세요',
    line2: '선납금 0원 · 위약금 0원 · 첫 달 이후 언제든 해지',
    line3: '수억 원의 초기 투자도, 발목 잡는 약정도 없이',
    line4: '프라이빗 클라우드의 새로운 기준',
  },
];

const INTERVAL = 5000;

export default function HeroSection() {
  const [isMdUp, setIsMdUp] = useState(true);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    setIsMdUp(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMdUp(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % SLIDES.length);
        setVisible(true);
      }, 500);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <div
      style={{
        background: '#000000',
        height: '100vh',
      }}
    >
      <style>{`
        @keyframes heroZoom {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.04); }
          100% { transform: scale(1); }
        }
        .hero-bg {
          animation: heroZoom ${INTERVAL * 2}ms ease-in-out infinite;
        }
      `}</style>

      {/* 이미지 */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: '#000000',
        }}
      >
        {/* 줌 애니메이션 배경 — contrast/saturate로 선명도 보정 */}
        <div
          className="hero-bg"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/images/히어로색션.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'contrast(1.10) saturate(1.08)',
          }}
        />
        {/* 퍼플~블루~민트 그라디언트 오버레이 (DAN25 스타일) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(107,33,232,0.72) 0%, rgba(59,130,246,0.60) 50%, rgba(0,184,156,0.55) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* 하단 페이드 — 이미지를 검정으로 자연스럽게 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '55%',
            background: 'linear-gradient(to bottom, transparent, #0d0d0d)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* 중앙 텍스트 슬라이드 */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMdUp ? '90%' : '85%',
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <p style={{
            fontSize: isMdUp ? '64px' : '28px',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.2,
            margin: '0 0 14px',
          }}>
            {slide.line1}
          </p>
          <p style={{
            fontSize: isMdUp ? '40px' : '18px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.90)',
            lineHeight: 1.4,
            margin: '0 0 16px',
          }}>
            {slide.line2}
          </p>
          <p style={{
            fontSize: isMdUp ? '30px' : '14px',
            color: 'rgba(255,255,255,0.70)',
            lineHeight: 1.6,
            margin: '0 0 4px',
          }}>
            {slide.line3}
          </p>
          <p style={{
            fontSize: isMdUp ? '30px' : '14px',
            color: 'rgba(255,255,255,0.70)',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {slide.line4}
          </p>
        </div>


      </div>
    </div>
  );
}
