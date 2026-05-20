import { useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import ServiceShowcaseSection from '@/pages/about/components/ServiceShowcaseSection';
import ServiceLicenseSection from '@/pages/about/components/ServiceLicenseSection';
import BridgeSection from '@/pages/about/components/BridgeSection';
import CtaSection from '@/pages/home/components/CtaSection';
import Footer from '@/components/feature/Footer';

type TabKey = 'main' | 'license' | 'addon';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('main');

  return (
    <main className="min-h-screen" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#000000' }}>
      <Navbar />

      {/* 서비스 쇼케이스 (스크롤) - 헤더 포함 */}
      <ServiceShowcaseSection activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 서비스 라이선스 */}
      <ServiceLicenseSection activeTab={activeTab} />

      <BridgeSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
