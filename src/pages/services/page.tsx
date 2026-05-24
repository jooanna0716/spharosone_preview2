import React, { useState, useRef, useEffect } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import Navbar from '@/components/feature/Navbar';
import ServicesHeroSection from '@/pages/services/components/ServicesHeroSection';
import ServiceLicenseSection from '@/pages/services/components/ServiceLicenseSection';
import CtaSection from '@/pages/home/components/CtaSection';
import Footer from '@/components/feature/Footer';

type TabKey = 'main' | 'license' | 'addon';

type Segment = { text: string; bold: boolean };

const DESCRIPTIONS: Record<TabKey, Segment[]> = {
  main: [
    { text: '스파로스 원', bold: true },
    { text: '은 기업 환경에 최적화된 ', bold: false },
    { text: '서비스형(As a Service) 프라이빗 클라우드', bold: true },
    { text: '로, 구축 부담은 줄이고 보안·컴플라이언스·업무 연속성까지 고려한 안정적인 운영 환경을 제공합니다.', bold: false },
  ],
  license: [
    { text: '스파로스 원', bold: true },
    { text: '에 필요한 기능을 더해 우리 회사에 맞는 클라우드 환경을 완성하세요. 구독형 기반 온프레미스 구축부터 클라우드 운영·보안, AI·ML 워크로드까지 기업 환경에 맞춰 유연하게 확장하며 필요한 기능만 단계적으로 적용할 수 있습니다.', bold: false },
  ],
  addon: [
    { text: '핵심 인프라 운영 지원부터 보안·운영 안정성·지속 관리까지 전문화된 ', bold: false },
    { text: '맞춤형 부가 서비스', bold: true },
    { text: '를 제공해 기업의 클라우드 운영 효율과 IT 경쟁력을 높입니다.', bold: false },
  ],
};

function RevealText({ tab }: { tab: TabKey }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    setLit(false);
    const el = ref.current;
    if (!el) return;

    // 이미 뷰포트 안에 있으면 즉시 실행
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setLit(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);

    // 탭 전환 시 이미 보이는 상태면 짧은 딜레이 후 실행
    const timer = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) setLit(true);
    }, 80);

    return () => { observer.disconnect(); clearTimeout(timer); };
  }, [tab]);

  const segments = DESCRIPTIONS[tab];
  let idx = 0;

  const chars = (text: string, isBold: boolean, segIdx: number) =>
    text.split('').map((ch, i) => {
      const delay = idx++ * 18;
      return (
        <span
          key={`seg${segIdx}-${i}`}
          style={{
            fontWeight: isBold ? 700 : 400,
            color: lit ? '#ffffff' : 'rgba(255,255,255,0.28)',
            transition: lit ? `color 0.25s ease ${delay}ms` : 'none',
          }}
        >
          {ch === '\n' ? <br /> : ch}
        </span>
      );
    });

  return (
    <p
      ref={ref}
      style={{
        fontFamily: "'Noto Sans KR', sans-serif",
        fontSize: 'clamp(16px, 3vw, 35px)',
        lineHeight: 1.6,
        margin: 0,
      }}
    >
      {segments.map((seg, si) => chars(seg.text, seg.bold, si))}
    </p>
  );
}

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('main');
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <main className="min-h-screen" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#0d0d0d' }}>
      <Navbar />

      {/* Hero: 인터랙티브 풀스크린 패널 */}
      <ServicesHeroSection onTabChange={setActiveTab} />

      {/* 서비스 설명 — View More 스크롤 타깃 */}
      <section id="service-detail" style={{ background: '#0d0d0d', padding: isMobile ? '40px 16px 0' : isTablet ? '60px clamp(24px, 4vw, 60px) 0' : '140px 120px 10px' }}>
        <RevealText key={activeTab} tab={activeTab} />
      </section>

      {/* 서비스 카드 */}
      <ServiceLicenseSection activeTab={activeTab} />

      <CtaSection />
      <Footer />
    </main>
  );
}
