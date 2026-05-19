import { useEffect, useState, useRef } from 'react';

const CARDS = [
  {
    title: '복잡해질수록, 클라우드는 방향을 잃습니다',
    content: `Spharos는 '등대'를 의미합니다\n복잡한 인프라와 끝없는 선택 속에서도\n흔들리지 않고 방향을 제시하는 빛\n기업이 나아갈 길을, 가장 앞에서 밝힙니다`,
    lastLine: '단 하나의 기준, One',
  },
  {
    title: 'One은 단순한 하나가 아닙니다',
    content: `흩어진 환경을 하나로 연결하고\n복잡한 운영을 하나의 기준으로 통합하며\n분산된 가치를 가장 강력한 하나로 만듭니다\n더 단순하게, 더 안전하게, 더 강력하게`,
    lastLine: '기업 클라우드의 새로운 기준, One',
  },
  {
    title: '길을 비추고, 하나로 모으다',
    content: `Spharos가 방향을 밝히고,\nOne이 모든 것을 잇습니다\n흩어진 클라우드를 하나의 빛으로,\n복잡한 IT를 하나의 기준으로 통합합니다`,
    lastLine: 'Spharos One',
  },
];

const NAVBAR_H = 64;

export default function SpharosOneStorySection() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const outerRef = useRef<HTMLDivElement>(null);
  const prevIdx = useRef(0);
  const isDotScrollingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDotScrollingRef.current) return;
      const outer = outerRef.current;
      if (!outer) return;
      const rect = outer.getBoundingClientRect();
      const scrolledIn = NAVBAR_H - rect.top;
      const stickyPanelH = window.innerHeight - NAVBAR_H;
      const totalScrollable = outer.offsetHeight - stickyPanelH;
      const progress = Math.max(0, Math.min(1, scrolledIn / totalScrollable));
      const idx = Math.min(Math.floor(progress * CARDS.length), CARDS.length - 1);
      if (idx !== prevIdx.current) {
        setDirection(idx > prevIdx.current ? 'next' : 'prev');
        setCurrent(idx);
        setAnimKey((k) => k + 1);
        prevIdx.current = idx;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const card = CARDS[current];
  const animClass = direction === 'next' ? 'story-slide-next' : 'story-slide-prev';

  const handleDotClick = (i: number) => {
    const outer = outerRef.current;
    if (!outer) return;
    isDotScrollingRef.current = true;
    setDirection(i > prevIdx.current ? 'next' : 'prev');
    setCurrent(i);
    setAnimKey((k) => k + 1);
    prevIdx.current = i;
    const stickyPanelH = window.innerHeight - NAVBAR_H;
    const totalScrollable = outer.offsetHeight - stickyPanelH;
    const targetScrollY = outer.offsetTop - NAVBAR_H + ((i + 0.5) / CARDS.length) * totalScrollable;
    window.scrollTo({ top: targetScrollY, behavior: 'auto' });
    window.setTimeout(() => { isDotScrollingRef.current = false; }, 250);
  };

  return (
    <div ref={outerRef} style={{ height: '300vh', background: '#0d0d0d' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          background: '#0d0d0d',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(32px, 5vh, 56px) clamp(24px, 8.33vw, 120px) clamp(24px, 4vh, 40px)',
          gap: '24px',
        }}
      >
        <style>{`
          @keyframes slideInNext {
            from { opacity: 0; transform: translateX(52px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInPrev {
            from { opacity: 0; transform: translateX(-52px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          .story-slide-next { animation: slideInNext 0.45s cubic-bezier(0.25,0.46,0.45,0.94) both; }
          .story-slide-prev { animation: slideInPrev 0.45s cubic-bezier(0.25,0.46,0.45,0.94) both; }
          .story-dot { transition: width 0.3s ease, background 0.3s ease; border: none; padding: 0; cursor: pointer; }
        `}</style>

        {/* ── h2 제목 — 원래 폰트 크기 ──────────────────────────────── */}
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'var(--fs-display)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.2,
            margin: 0,
            flexShrink: 0,
          }}
        >
          복잡한 클라우드, Spharos One으로 끝내다
        </h2>

        {/* ── 이미지 영역 (full-width × ~500px) ────────────────────── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '250px',
            borderRadius: '16px',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <img
            src="/images/등대_스파로스.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block',
            }}
          />
        </div>

        {/* ── 이미지 하단 텍스트 영역 ──────────────────────────────── */}
        <div
          key={animKey}
          className={animClass}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'start',
            flexShrink: 0,
          }}
        >
          {/* 왼쪽: 소제목 */}
          <div>
            <p style={{
              fontSize: 'var(--fs-heading)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.3,
              margin: 0,
              whiteSpace: 'pre-line',
            }}>
              {card.title}
            </p>
          </div>

          {/* 오른쪽: 기존 내용 */}
          <div>
            <p style={{
              fontSize: 'var(--fs-subtitle)',
              color: 'rgba(255,255,255,0.80)',
              lineHeight: 1.65,
              margin: '0 0 10px',
              whiteSpace: 'pre-line',
            }}>
              {card.content}
            </p>
            <p style={{
              fontSize: 'var(--fs-label)',
              fontWeight: 600,
              color: '#FFFFFF',
              margin: 0,
            }}>
              {card.lastLine}
            </p>
          </div>
        </div>

        {/* ── 도트 내비게이션 ───────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {CARDS.map((_, i) => (
            <button
              key={i}
              className="story-dot"
              onClick={() => handleDotClick(i)}
              style={{
                width: i === current ? '32px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: i === current ? '#3B6EF0' : 'rgba(255,255,255,0.30)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
