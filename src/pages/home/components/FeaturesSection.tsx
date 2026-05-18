import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const DATA_CENTER_IMAGE = '/images/주요구성_이미지.png';

const KEY_ITEMS = [
  {
    icon: 'ri-award-line',
    title: '하이브리드 멀티클라우드 시대를 선도하는 Nutanix 공식 서비스 프로바이더',
  },
  {
    icon: 'ri-coin-line',
    title: '초기 투자 비용 부담이 없는 OPEX 기반의 고객 맞춤형 구독 클라우드 모델',
  },
  {
    icon: 'ri-settings-3-line',
    title: '비즈니스 요구사항에 따라 정밀하게 설계된, 기업 환경 최적화 맞춤형 도입 옵션',
  },
  {
    icon: 'ri-link-m',
    title: '프라이빗 클라우드의 핵심 보안과 퍼블릭의 유연함을 함께, 하이브리드 연계',
  },
  {
    icon: 'ri-dashboard-3-line',
    title: '자원·비용·운영 현황을 통합 관리 - 클라우드 매니지먼트 플랫폼 Spharos CMP',
  },
];

function DesktopFeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [textBlockH, setTextBlockH] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (textBlockRef.current) setTextBlockH(textBlockRef.current.offsetHeight);
    };
    measure();
    const timer = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measure); };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      if (scrolled <= 0) { setProgress(0); return; }
      const animRange = window.innerHeight * 1.2;
      setProgress(Math.min(scrolled / animRange, 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const p = ease(progress);

  const overlayOpacity = Math.max((p - 0.3) / 0.7, 0) * 0.65;
  const textPhase1Out = Math.min(progress / 0.35, 1);
  const textPhase2In = Math.max((progress - 0.45) / 0.3, 0);
  const isOverlay = progress > 0.45;
  const textY = isOverlay ? lerp(20, 0, textPhase2In) : -(textPhase1Out * 60);
  const textOpacity = isOverlay ? textPhase2In : 1 - textPhase1Out;

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;

  const GAP = 56;
  const containerPadL = Math.max((vw - 1280) / 2, 0) + 40;
  const containerPadR = Math.max((vw - 1280) / 2, 0) + 40;
  const textAreaW = (vw - containerPadL - containerPadR) * 0.60;
  const imgStartLeft = containerPadL + textAreaW + GAP;
  const imgStartRight = containerPadR;
  const imgStartW = vw - imgStartLeft - imgStartRight;
  const imgStartH = 160;
  const imgStartTop = (vh - imgStartH) / 2;

  const imgLeft = lerp(imgStartLeft, 0, p);
  const imgTop = lerp(imgStartTop, 0, p);
  const imgWidth = lerp(imgStartW, vw, p);
  const imgHeight = lerp(imgStartH, vh, p);
  const imgRadius = lerp(20, 0, p);

  return (
    <section ref={sectionRef} className="relative" style={{ height: '280vh' }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: '100vh', backgroundColor: '#0d0d0d' }}>
        <div
          className="absolute overflow-hidden"
          style={{
            left: `${imgLeft}px`, top: `${imgTop}px`,
            width: `${imgWidth}px`, height: `${imgHeight}px`,
            borderRadius: `${imgRadius}px`, zIndex: 1,
            boxShadow: p < 0.95 ? '0 8px 40px rgba(0,0,0,0.12)' : 'none',
          }}
        >
          <img src={DATA_CENTER_IMAGE} alt="데이터센터 클라우드" className="w-full h-full object-cover object-center" />
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(14,60,116,1)',
              opacity: isOverlay ? Math.max((p - 0.45) / 0.55, 0) * 0.45 : overlayOpacity / 0.65 * 0.20,
            }}
          />
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 2, pointerEvents: 'none', padding: '0 max(40px, calc((100vw - 1280px) / 2 + 40px))' }}
        >
          {!isOverlay ? (
            <div
              ref={textBlockRef}
              style={{ width: '60%', alignSelf: 'flex-start', transform: `translateY(${textY}px)`, opacity: textOpacity, transition: 'transform 0.05s linear, opacity 0.05s linear' }}
            >
              <h2 className="font-extrabold leading-tight" style={{ fontSize: 'clamp(32px, 4.375vw, 56px)', color: '#f0f0f0', lineHeight: '1.2' }}>
                <span style={{ display: 'block' }}>복잡한 클라우드 인프라를</span>
                <span style={{ display: 'block' }}>스파로스원 하나로 완성하세요</span>
              </h2>
              <p className="mt-6 leading-relaxed" style={{ fontSize: 'clamp(16px, 2.1875vw, 28px)', color: '#aaaaaa', maxWidth: '800px' }}>
                검증된 Nutanix 솔루션 기술과 신세계의 비즈니스 운영 역량을 결합해
                최상의 안정성과 유연한 비즈니스 환경을 제공합니다
              </p>
            </div>
          ) : (
            <div className="w-full flex flex-col" style={{ transform: `translateY(${textY}px)`, opacity: textOpacity, transition: 'transform 0.05s linear, opacity 0.05s linear' }}>
              <span className="inline-block font-bold mb-4" style={{ fontSize: 'clamp(16px, 1.875vw, 24px)', color: '#F9BB00' }}>주요구성</span>
              <h2 className="font-extrabold leading-tight" style={{ fontSize: 'clamp(24px, 3.75vw, 48px)', color: '#ffffff', lineHeight: '1.25' }}>
                <span style={{ display: 'block' }}>스파로스원은 설계 · 운영 · 보안을 하나로 완성하는</span>
                <span style={{ display: 'block' }}>구독형 프라이빗 클라우드입니다</span>
              </h2>
              <div style={{ height: '40px', flexShrink: 0 }} />
              <div className="flex flex-col gap-3 w-full">
                {KEY_ITEMS.map((item, i) => {
                  const itemP = Math.max((progress - (0.62 + i * 0.055)) / 0.18, 0);
                  const itemOpacity = Math.min(itemP * 2.5, 1);
                  const itemY = (1 - itemOpacity) * 24;
                  return (
                    <div
                      key={item.title}
                      className="rounded-xl px-6 py-4 flex flex-row items-center gap-5"
                      style={{
                        background: 'rgba(255,255,255,0.28)', backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.50)',
                        opacity: itemOpacity, transform: `translateY(${itemY}px)`,
                        transition: 'opacity 0.05s linear, transform 0.05s linear',
                      }}
                    >
                      <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                        <i className={`${item.icon} text-white`} style={{ fontSize: 'clamp(18px, 2.1875vw, 28px)' }}></i>
                      </div>
                      <p className="leading-snug" style={{ fontSize: 'clamp(15px, 1.953125vw, 25px)', color: '#ffffff' }}>{item.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function MobileFeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 390);
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 844);
  const [textBlockH, setTextBlockH] = useState(140);
  const [phase2H, setPhase2H] = useState(400);

  useEffect(() => {
    const handleResize = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    const el = textBlockRef.current;
    if (!el) return;
    const measure = () => setTextBlockH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = phase2Ref.current;
    if (!el) return;
    const measure = () => setPhase2H(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      if (scrolled <= 0) { setProgress(0); return; }
      const animRange = window.innerHeight * 1.2;
      setProgress(Math.min(scrolled / animRange, 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const p = ease(progress);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const IMG_W = Math.min(vw - 48, 480);
  const IMG_H = 160;
  const GAP = 36;
  const startLeft = Math.round((vw - IMG_W) / 2);
  const combinedH = textBlockH + GAP + IMG_H;
  const textTop = Math.max(Math.round((vh - combinedH) / 2), 20);
  const startTop = textTop + textBlockH + GAP;
  const phase2Top = Math.max(Math.round((vh - phase2H) / 2), 20);

  const imgTop = lerp(startTop, 0, p);
  const imgLeft = lerp(startLeft, 0, p);
  const imgWidth = lerp(IMG_W, vw, p);
  const imgHeight = lerp(IMG_H, vh, p);
  const imgRadius = lerp(16, 0, p);
  const overlayOpacity = Math.max((p - 0.25) / 0.75, 0) * 0.7;

  const textOut = Math.min(progress / 0.35, 1);
  const textIn = Math.max((progress - 0.5) / 0.3, 0);
  const cardsIn = Math.max((progress - 0.7) / 0.25, 0);

  return (
    <section ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: '100vh', backgroundColor: '#0d0d0d' }}>
        <div
          className="absolute overflow-hidden"
          style={{
            left: `${imgLeft}px`, top: `${imgTop}px`,
            width: `${imgWidth}px`, height: `${imgHeight}px`,
            borderRadius: `${imgRadius}px`, zIndex: 1,
            boxShadow: p < 0.9 ? '0 4px 24px rgba(0,0,0,0.12)' : 'none',
          }}
        >
          <img src={DATA_CENTER_IMAGE} alt="데이터센터 클라우드" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'rgba(14,60,116,1)', opacity: overlayOpacity * 0.65 }} />
        </div>

        <div
          className="absolute"
          style={{ top: `${textTop}px`, left: '16px', right: '16px', zIndex: 2, pointerEvents: 'none', opacity: 1 - textOut, transform: `translateY(${-(textOut * 50)}px)`, transition: 'transform 0.05s linear, opacity 0.05s linear' }}
        >
          <div ref={textBlockRef}>
            <h2 className="font-extrabold leading-tight" style={{ fontSize: '28px', color: '#f0f0f0', lineHeight: '1.35' }}>
              복잡한 클라우드 인프라를<br />스파로스원 하나로 완성하세요
            </h2>
            <p className="mt-4 leading-relaxed mx-auto" style={{ fontSize: '14px', color: '#aaaaaa', maxWidth: '340px' }}>
              검증된 Nutanix 솔루션 기술과 신세계의 비즈니스 운영 역량을 결합해
              최상의 안정성과 유연한 비즈니스 환경을 제공합니다
            </p>
          </div>
        </div>

        <div
          className="absolute"
          style={{ top: `${phase2Top}px`, left: '16px', right: '16px', zIndex: 2, pointerEvents: 'none', opacity: textIn, transform: `translateY(${lerp(20, 0, textIn)}px)`, transition: 'transform 0.05s linear, opacity 0.05s linear' }}
        >
          <div ref={phase2Ref}>
            <span className="inline-block font-bold mb-3" style={{ fontSize: '16px', color: '#F9BB00' }}>주요구성</span>
            <h2 className="font-extrabold leading-tight mb-3" style={{ fontSize: '28px', color: '#ffffff', lineHeight: '1.35' }}>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>스파로스원은 설계·운영·보안을</span>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>하나로 완성하는 구독형</span>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>프라이빗 클라우드입니다</span>
            </h2>
            <div
              className="flex flex-col gap-1.5"
              style={{ opacity: cardsIn, transform: `translateY(${lerp(16, 0, cardsIn)}px)`, transition: 'opacity 0.05s linear, transform 0.05s linear', textAlign: 'left' }}
            >
              {KEY_ITEMS.map((item) => (
                <div key={item.title} className="rounded-xl px-4 py-2 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.35)' }}>
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <i className={`${item.icon} text-white`} style={{ fontSize: '20px' }}></i>
                  </div>
                  <p className="leading-snug" style={{ fontSize: '15px', color: '#ffffff' }}>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FeaturesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile ? <MobileFeaturesSection /> : <DesktopFeaturesSection />;
}
