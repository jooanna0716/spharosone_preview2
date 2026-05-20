import React, { useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import ServicesHeroSection from '@/pages/services/components/ServicesHeroSection';
import ServiceLicenseSection from '@/pages/services/components/ServiceLicenseSection';
import CtaSection from '@/pages/home/components/CtaSection';
import Footer from '@/components/feature/Footer';

type TabKey = 'main' | 'license' | 'addon';

const DESCRIPTIONS: Record<TabKey, React.ReactNode> = {
  main: (
    <><strong>Spharos One 메인서비스</strong>는<br />기업 환경에 최적화된 서비스형(As a Service) 프라이빗 클라우드로, 구축 부담은 덜고 보안·컴플라이언스·업무 연속성까지 고려한 안정적인 운영과 보안을 하나로 제공합니다.</>
  ),
  license: (
    <><strong>Spharos One 라이선스</strong>는<br />구독형 기반으로 온프레미스 구축부터 클라우드 운영·보안, AI·ML 워크로드까지 기업 환경에 맞춰 유연하게 확장하며 초기 도입 부담 없이 필요한 기능만 단계적으로 적용할 수 있습니다.</>
  ),
  addon: (
    <><strong>Spharos One 부가서비스</strong>는<br />핵심 인프라 운영 지원부터 보안·운영 안정성·지속 관리까지 전문화된 맞춤형 부가 서비스를 통합 제공해 기업의 클라우드 운영 효율과 IT 경쟁력을 높입니다.</>
  ),
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('main');

  return (
    <main className="min-h-screen" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#0d0d0d' }}>
      <Navbar />

      {/* Hero: 인터랙티브 풀스크린 패널 */}
      <ServicesHeroSection onTabChange={setActiveTab} />

      {/* 서비스 설명 — View More 스크롤 타깃 */}
      <section id="service-detail" style={{ background: '#0d0d0d', padding: '140px 120px 10px' }}>
        <p
          style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: '35px',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.6,
          }}
        >
          {DESCRIPTIONS[activeTab]}
        </p>
      </section>

      {/* 서비스 카드 */}
      <ServiceLicenseSection activeTab={activeTab} />

      <CtaSection />
      <Footer />
    </main>
  );
}
