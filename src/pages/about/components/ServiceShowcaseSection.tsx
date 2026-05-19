import { useState, useEffect, useRef, type ReactNode } from 'react';

type TabKey = 'main' | 'license' | 'addon';

interface TabConfig {
  key: TabKey;
  num: string;
  label: string;
  title: string;
  subtitle: string;
  description: ReactNode;
  belowLine1?: string;
  belowLine2?: string;
  belowImage?: string;
  items: { name: string; desc: string }[];
  imgSrc: string;
}

const TABS: TabConfig[] = [
  {
    key: 'main',
    num: '01',
    label: '메인서비스',
    title: '메인서비스',
    subtitle: 'Main Service',
    description: (
      <>
        서비스형(As a Service) 기반의 프라이빗 클라우드를 통해 고객 인프라 요건에 최적화된 환경을 제공하고, 보안·컴플라이언스·업무 연속성까지 고려한 안정적인 클라우드 운영으로 기업이 직접 구축 부담 없이 비즈니스 본질과 디지털 전환에 집중할 수 있도록 지원합니다.
      </>
    ),
    belowLine1: '구축 부담 제로, 디지털 전환은 프로답게',
    belowLine2: '비즈니스 연속성을 책임집니다',
    belowImage: '/images/메인서비스_하단.png',
    items: [
      { name: 'IaaS', desc: '서버·스토리지·네트워크를 서비스 형태로 유연하게 제공하는 인프라 서비스' },
      { name: 'DRaaS', desc: '재해·장애 발생 시 시스템 및 데이터를 신속하게 복구하는 재해복구 서비스' },
      { name: 'DaaS', desc: '장소·기기 관계없이 동일한 업무 환경을 제공하는 가상 데스크톱 서비스 (출시 예정)' },
    ],
    imgSrc: '/images/메인 서비스.png',
  },
  {
    key: 'license',
    num: '02',
    label: '라이선스',
    title: '라이선스',
    subtitle: 'License',
    description: (
      <>
        구독형 기반으로 온프레미스 인프라 구축부터 클라우드 운영·보안, AI·ML 워크로드까지 기업 환경에 최적화된 라이선스를 제공하며, 초기 도입 부담 없이 필요한 기능을 단계적으로 적용하고 조직 규모에 맞춰 유연하게 확장·통합 관리할 수 있습니다.
      </>
    ),
    belowLine1: '시작부터 확장까지 A to Z',
    belowLine2: '조직 규모에 맞춘 스마트 구독 솔루션',
    belowImage: '/images/라이선스_하단.png',
    items: [
      { name: 'SCI', desc: '표준 아키텍처 기반 서버·스토리지·가상화·DR 등 온프레미스 통합 패키지' },
      { name: 'SCM', desc: '인프라 상태·비용·보안 현황을 단일 플랫폼에서 관리하는 클라우드 매니저' },
      { name: 'SUS', desc: 'Nutanix 소프트웨어 업그레이드 및 패치 관리 서비스' },
      { name: 'SKP', desc: '암호화 키 관리 및 데이터 보호 솔루션' },
      { name: 'SAI', desc: 'AI 워크로드 최적화 인프라 및 GPU 자원 관리 서비스' },
    ],
    imgSrc: '/images/라이선스.png',
  },
  {
    key: 'addon',
    num: '03',
    label: '부가서비스',
    title: '부가서비스',
    subtitle: 'Add-on Service',
    description: (
      <>
        핵심 인프라 운영 지원은 물론, 클라우드 활용의 안정성과 운영 효율을 높이는 전문화된 맞춤형 부가 서비스를 함께 제공하며, 도입 이후의 운영 안정성·보안 수준·지속적인 관리까지 고려한 통합 지원 체계를 통해 기업의 IT 경쟁력을 더욱 강화합니다.
      </>
    ),
    belowLine1: '운영은 탄탄하게 경쟁력은 압도적으로',
    belowLine2: '안전과 효율을 더하는 프리미엄 부가서비스',
    belowImage: '/images/부가서비스_하단.png',
    items: [
      { name: '정보보안 컨설팅', desc: 'ISMS/ISMS-P/ISO27001 인증 획득을 위한 정보보호 관리체계 컨설팅' },
      { name: '취약점 진단 및 모의해킹', desc: '웹/모바일/인프라 취약점 진단 및 모의해킹을 통한 보안 수준 강화' },
      { name: '융합보안 및 관제서비스', desc: '물리·사이버·운영 데이터 통합 융합보안 및 AI 기반 보안관제 서비스' },
    ],
    imgSrc: '/images/부가 서비스.png',
  },
];

interface Props {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export default function ServiceShowcaseSection({ activeTab, onTabChange }: Props) {
  const current = TABS.find((t) => t.key === activeTab)!;

  const [isMdUp, setIsMdUp] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgVisible, setImgVisible] = useState(false);

  useEffect(() => {
    setImgVisible(false);
    const el = imgRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImgVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    setIsMdUp(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMdUp(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return (
    <section
      className="relative w-full flex flex-col"
      style={{
        background: `
          linear-gradient(to bottom, transparent 42%, #0d0d0d 84%),
          radial-gradient(ellipse 58% 68% at 4% 8%,  rgba(112,22,220,1.00) 0%, rgba(85,15,180,0.55) 40%, transparent 68%),
          radial-gradient(ellipse 42% 50% at 36% -2%, rgba(55,75,225,0.90) 0%, rgba(40,60,200,0.50) 40%, transparent 62%),
          radial-gradient(ellipse 55% 65% at 96% 8%,  rgba(0,190,180,1.00) 0%, rgba(0,155,165,0.55) 38%, transparent 66%),
          radial-gradient(ellipse 38% 45% at 68% 3%,  rgba(10,160,210,0.80) 0%, transparent 55%),
          radial-gradient(ellipse 30% 35% at 50% 0%,  rgba(80,60,200,0.60) 0%, transparent 50%),
          #060608
        `,
        paddingTop: '88px',
        paddingBottom: '0',
      }}
    >
      <div
        className="w-full flex flex-col px-6 md:px-[120px]"
      >
        {/* 카드 — flex-col으로 헤더+콘텐츠 정상 흐름 */}
        <div
          className="relative w-full overflow-hidden flex flex-col"
          style={{
            height: isMdUp ? '62vh' : '55vh',
            minHeight: isMdUp ? '420px' : '320px',
            background: 'transparent',
          }}
        >

          {/* 상단 바 — 정상 흐름 (position:absolute 제거), xl에서 가로 배치 */}
          <div className="flex flex-col xl:flex-row xl:items-baseline xl:justify-between gap-3 xl:gap-0 px-8 md:px-16 pt-8 md:pt-10 pb-3 flex-shrink-0 z-20">
            <h3
              className="font-bold leading-tight shrink-0"
              style={{
                fontSize: 'clamp(22px, 2.5vw, 36px)',
                fontFamily: "'Poppins', sans-serif",
                color: '#FFFFFF',
                letterSpacing: '0.03em',
              }}
            >
              Spharos One Services
            </h3>

            <div className="inline-block">
              <div
                className="flex items-baseline gap-5 md:gap-10 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.20)' }}
              >
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => onTabChange(tab.key)}
                      className={`flex items-baseline gap-1.5 md:gap-3 cursor-pointer transition-all duration-300 group pb-2 md:pb-3 border-b-2 bg-transparent ${
                        isActive ? 'border-[#5BA4F5]' : 'border-transparent'
                      }`}
                      style={{ marginBottom: '-1px' }}
                    >
                      <span
                        className={`font-bold leading-tight transition-all duration-300${isActive ? ' acc' : ''}`}
                        style={{
                          fontSize: 'var(--fs-label)',
                          fontFamily: "'Poppins', sans-serif",
                          color: isActive ? undefined : 'rgba(255,255,255,0.45)',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {tab.num}
                      </span>
                      <span
                        className="font-medium leading-tight transition-all duration-300"
                        style={{
                          fontSize: 'var(--fs-label)',
                          color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 콘텐츠 — flex-1로 나머지 공간 채움, 위아래 동일 패딩으로 가운데 정렬 */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16" style={{ paddingTop: 'clamp(40px, 6vh, 80px)', paddingBottom: 'clamp(40px, 6vh, 80px)' }}>
            <div className="mb-3 md:mb-6">
              <h2
                className="font-bold leading-tight transition-all duration-500"
                style={{
                  fontSize: 'var(--fs-giant)',
                  color: '#FFFFFF',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {current.title}
              </h2>
            </div>
            <p
              className="leading-relaxed transition-all duration-500"
              style={{
                fontSize: 'var(--fs-label)',
                color: 'rgba(255,255,255,0.92)',
                fontWeight: 600,
              }}
            >
              {current.description}
            </p>
          </div>
        </div>

        {/* 제목 영역 하단 구분선 */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', margin: '0 8px' }} />

        {/* Below image — text section */}
        {(current.belowLine1 || current.belowLine2) && (
          <div style={{ padding: isMdUp ? '80px 8px 80px' : '40px 4px 60px', textAlign: 'center' }}>
            {current.belowLine1 && (
              <p
                className="font-extrabold"
                style={{
                  fontSize: 'var(--fs-xlarge)',
                  color: '#f0f0f0',
                  lineHeight: 1.2,
                  margin: '0 0 6px',
                }}
              >
                {current.belowLine1}
              </p>
            )}
            {current.belowLine2 && (
              <p
                className="font-extrabold"
                style={{
                  fontSize: 'var(--fs-xlarge)',
                  background: 'linear-gradient(90deg, #7016DC 0%, #3B6EF0 45%, #00C4B4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {current.belowLine2}
              </p>
            )}
            {current.belowImage && (
              <div
                ref={imgRef as React.RefObject<HTMLDivElement>}
                style={{
                  marginTop: isMdUp ? '60px' : '36px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={current.belowImage}
                  alt=""
                  style={{
                    maxHeight: isMdUp ? '420px' : '240px',
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                    transform: imgVisible ? 'translateY(0)' : 'translateY(100%)',
                    transition: 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
