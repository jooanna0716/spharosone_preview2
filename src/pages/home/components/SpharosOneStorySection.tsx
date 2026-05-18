import { useEffect, useState, useRef } from 'react';

const CARDS = [
  {
    title: '복잡해질수록, 클라우드는 방향을 잃습니다',
    content: `Spharos는 '등대'를 의미합니다\n복잡한 인프라와 끝없는 선택 속에서도\n흔들리지 않고 방향을 제시하는 빛\n\n기업이 나아갈 길을, 가장 앞에서 밝힙니다`,
    lastLine: '단 하나의 기준, One',
    bg: "url(/images/스파로스원_브랜드소개1.png) 60% center / cover no-repeat",
    overlay: 'linear-gradient(to right, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.15) 100%)',
    image: '/images/등대_모니터.png',
  },
  {
    title: 'One은 단순한 하나가 아닙니다',
    content: `흩어진 환경을 하나로 연결하고\n복잡한 운영을 하나의 기준으로 통합하며\n분산된 가치를 가장 강력한 하나로 만듭니다\n\n더 단순하게, 더 안전하게, 더 강력하게`,
    lastLine: '기업 클라우드의 새로운 기준, One',
    bg: "url(/images/스파로스원_브랜드소개1.png) 60% center / cover no-repeat",
    overlay: 'linear-gradient(to right, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.15) 100%)',
    image: '/images/스파로스원_통합.png',
  },
  {
    title: '길을 비추고, 하나로 모으다',
    content: `Spharos가 방향을 밝히고,\nOne이 모든 것을 잇습니다.\n흩어진 클라우드를 하나의 빛으로,\n\n복잡한 IT를 하나의 기준으로 통합합니다.`,
    lastLine: 'Spharos One',
    bg: "url(/images/스파로스원_브랜드소개1.png) 60% center / cover no-repeat",
    overlay: 'linear-gradient(to right, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.15) 100%)',
    image: '/images/스파로스원_AI화살표.png',
  },
];

const NAVBAR_H = 64;

const imgStyle: React.CSSProperties = {
  width: '100%',
  maxHeight: '50vh',
  objectFit: 'contain',
  filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))',
};

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
    // 카드 범위의 중앙으로 점프 (경계 floating point 회피)
    const targetScrollY = outer.offsetTop - NAVBAR_H + ((i + 0.5) / CARDS.length) * totalScrollable;
    window.scrollTo({ top: targetScrollY, behavior: 'auto' });
    window.setTimeout(() => {
      isDotScrollingRef.current = false;
    }, 250);
  };

  return (
    <div ref={outerRef} style={{ height: '300vh', background: '#000000' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          backgroundImage: 'url(/images/스파로스_정의1.png)',
          backgroundSize: 'cover',
          backgroundPosition: '60% center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
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
          @media (max-width: 767px) {
            .story-h2 { font-size: 28px !important; }
            .story-card-grid { grid-template-columns: 1fr !important; }
            .story-img-col { display: none !important; }
            .story-h3 { font-size: 18px !important; text-align: left !important; }
            .story-p { font-size: 16px !important; text-align: left !important; }
          }
        `}</style>

        {card.overlay && (
          <div style={{ position: 'absolute', inset: 0, background: card.overlay, zIndex: 0 }} />
        )}

        {/* 상단 페이드 — 검정에서 이미지로 자연스럽게 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(to bottom, #000000, transparent)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* 하단 페이드 — 이미지에서 검정으로 자연스럽게 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(to bottom, transparent, #000000)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* 콘텐츠 래퍼: 3행 그리드 — h2 고정 / 카드 중앙 / 도트 고정 */}
        <div
          style={{
            flex: 1,
            width: '100%',
            padding: '160px clamp(24px, 7.5vw, 110px)',
            zIndex: 1,
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
          }}
        >
          {/* 행 1: h2 — 항상 최상단 고정 */}
          <h2
            className="story-h2"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '60px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            복잡한 클라우드, Spharos One으로 끝내다
          </h2>

          {/* 행 2: 카드 콘텐츠 — 남은 공간 차지, 수직 중앙 정렬 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div key={animKey} className={animClass} style={{ width: '100%' }}>
              {card.image ? (
                /* 이미지 있는 카드 */
                <div className="story-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                  <div className="story-img-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={card.image} alt="" style={imgStyle} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 className="story-h3" style={{ fontSize: '35px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'pre-line', lineHeight: 1.35 }}>
                      {card.title}
                    </h3>
                    <div style={{ width: '36px', height: '2px', background: '#5BA4F5' }} />
                    <p className="story-p" style={{ fontSize: '24px', color: '#FFFFFF', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                      {card.content}
                    </p>
                    {card.lastLine && (
                      <p className="story-p" style={{ fontSize: '30px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.4, margin: 0 }}>
                        {card.lastLine}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* 이미지 없는 카드 */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px' }}>
                  <h3 className="story-h3" style={{ fontSize: '35px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'pre-line', lineHeight: 1.35 }}>
                    {card.title}
                  </h3>
                  <div style={{ width: '36px', height: '2px', background: '#5BA4F5' }} />
                  <p className="story-p" style={{ fontSize: '24px', color: '#FFFFFF', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                    {card.content}
                  </p>
                  {card.lastLine && (
                    <p className="story-p" style={{ fontSize: '30px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.4, margin: 0 }}>
                      {card.lastLine}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 행 3: 도트 — 항상 최하단 고정 */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', paddingTop: '16px' }}>
            {CARDS.map((_, i) => (
              <button
                key={i}
                className="story-dot"
                onClick={() => handleDotClick(i)}
                style={{
                  width: i === current ? '32px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  background: i === current ? '#5BA4F5' : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
