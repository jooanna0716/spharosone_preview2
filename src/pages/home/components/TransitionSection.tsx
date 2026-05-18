import { useEffect, useRef, useState } from 'react';

export default function TransitionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        padding: 'clamp(6rem, 10vw, 10rem) 2rem',
        overflow: 'hidden',
      }}
    >
      {/* 빛 잔향 — 히어로 빛 구체의 여운 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(100, 150, 255, 0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 상단 페이드 — 히어로와 자연스럽게 연결 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to bottom, #000000, transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 하단 페이드 — 등대 섹션으로 자연스럽게 연결 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, #000000, transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <p
        ref={ref}
        style={{
          position: 'relative',
          zIndex: 2,
          fontSize: 'clamp(1.25rem, 2vw, 2rem)',
          fontWeight: 300,
          letterSpacing: '0.05em',
          color: '#e0e8ff',
          textAlign: 'center',
          margin: 0,
          opacity: visible ? 0.85 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1.2s ease-out, transform 1.2s ease-out',
          textShadow:
            '0 0 20px rgba(100, 150, 255, 0.3), 0 0 40px rgba(100, 150, 255, 0.15)',
        }}
      >
        All-in-One.&nbsp;&nbsp;One for All.
      </p>
    </div>
  );
}
