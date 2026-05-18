import { useState } from 'react';

type MainTab = 'main' | 'license' | 'addon';

interface ServiceItem {
  key: string;
  label: string;
  subtitle: string;
  imgSrc: string;
  badge?: string;
  features: string[];
  compositions?: { name: string; desc: string }[];
  recommend: string | string[];
}

const MAIN_SERVICES: ServiceItem[] = [
  {
    key: 'IaaS',
    label: 'IaaS',
    subtitle: 'Infrastructure as a Service',
    imgSrc: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/dafdc182da0abf0257eef6cc7289bf84.png',
    features: [
      '서버·스토리지·네트워크를 서비스 형태로 제공',
      '기업 환경에 맞춘 인프라 설계와 유연한 확장·축소를 지원',
    ],
    compositions: [
      { name: 'IaaS', desc: '신세계아이앤씨 데이터센터 인프라 기반으로 가상 자원을 유연하게 제공하는 클라우드 인프라 서비스' },
      { name: 'IaaS (Outpost)', desc: '고객 데이터센터 내 전용 인프라를 구축해 보안·컴플라이언스 요건을 충족하며 클라우드 유연성을 제공하는 온프레미스형 IaaS 서비스' },
    ],
    recommend: '인프라를 직접 구축하지 않고, 필요한 만큼 유연하게 사용하고자 하는 기업',
  },
  {
    key: 'DRaaS',
    label: 'DRaaS',
    subtitle: 'Disaster Recovery as a Service',
    imgSrc: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/d1a2048cb501a1ebda7f25cc878d0a68.png',
    features: [
      '재해·장애 발생 시 시스템 및 데이터를 신속하게 복구할 수 있는 환경을 제공하여 서비스 중단 시간을 최소화',
      '백업·복구 체계를 기반으로 주요 업무 시스템의 연속성 유지, 장애 발생 시에도 안정적인 운영 지원',
    ],
    recommend: [
      '재해 복구 인프라를 별도로 구축하지 않고도 장애·재해 상황에 대비한 안정적인 복구 체계를 마련하고자 하는 기업',
      '중요 업무 시스템의 중단 리스크를 최소화하고, 서비스 연속성과 데이터 안정성을 동시에 확보하려는 기업',
      '운영 비용 부담은 줄이면서도 체계적인 백업·복구 환경과 신속한 대응 체계를 필요로 하는 기업',
    ],
  },
  {
    key: 'DaaS',
    label: 'DaaS',
    subtitle: 'Desktop as a Service',
    imgSrc: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/15b14ee3ef4eaf98038c80207ddfdd88.png',
    features: [
      '장소·기기 관계없이 동일한 업무 환경을 제공',
      '가상 데스크톱 환경을 통해 보안 안정성과 운영 효율성을 동시에 강화',
      '사용자별 업무 환경을 유연하게 제공할 수 있으며, 단말 교체 및 환경 변경 시에도 일관된 사용 경험 유지 가능',
    ],
    recommend: [
      '근무 장소나 단말 환경 변화와 관계없이 일관된 업무 환경을 안정적으로 운영하고자 하는 기업',
      '재택·원격·하이브리드 근무 환경 확대에 따라 보안성과 업무 연속성을 동시에 강화하려는 기업',
      '개별 PC 관리 부담을 줄이고 중앙 통합 관리 기반의 효율적인 업무 환경 운영 체계를 구축하려는 기업',
    ],
  },
];

const LICENSE_SERVICES: ServiceItem[] = [
  {
    key: 'SCI',
    label: 'SCI',
    subtitle: 'Spharos One Cloud Infrastructure',
    imgSrc: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/dafdc182da0abf0257eef6cc7289bf84.png',
    features: [
      '표준 아키텍처 기반 서버·스토리지·가상화·DR 등 온프레미스 통합 패키지',
      '고객사별 맞춤형 설치 및 유연한 확장 지원',
    ],
    recommend: '자체 클라우드 및 가상화 인프라를 온프레미스에 신규 구축하려는 기업',
  },
  {
    key: 'SCM',
    label: 'SCM',
    subtitle: 'Spharos One Cloud Manager',
    imgSrc: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/d1a2048cb501a1ebda7f25cc878d0a68.png',
    features: [
      '인프라 상태·비용·보안 현황 등을 단일 플랫폼에서 관리',
      '클라우드 운영 자동화 및 정책 기반 거버넌스 제공',
    ],
    recommend: '클라우드 인프라를 체계적으로 운영·관리하고자 하는 기업',
  },
  {
    key: 'SUS',
    label: 'SUS',
    subtitle: 'Spharos One Update Service',
    imgSrc: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/15b14ee3ef4eaf98038c80207ddfdd88.png',
    features: [
      'Nutanix 소프트웨어 업그레이드 및 패치 관리 서비스',
      '최신 버전 유지로 보안 취약점 및 성능 문제 사전 예방',
    ],
    recommend: '인프라 유지보수 인력 없이 안정적인 소프트웨어 관리가 필요한 기업',
  },
  {
    key: 'SKP',
    label: 'SKP',
    subtitle: 'Spharos One Key Protection',
    imgSrc: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/dafdc182da0abf0257eef6cc7289bf84.png',
    features: [
      '암호화 키 관리 및 데이터 보호 솔루션',
      '컴플라이언스 요건 충족을 위한 키 라이프사이클 관리',
    ],
    recommend: '데이터 암호화 및 보안 컴플라이언스 요건이 높은 금융·공공 기업',
  },
  {
    key: 'SAI',
    label: 'SAI',
    subtitle: 'Spharos One AI',
    imgSrc: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/d1a2048cb501a1ebda7f25cc878d0a68.png',
    features: [
      'AI 워크로드 최적화 인프라 제공',
      'GPU 자원 관리 및 AI 모델 학습·추론 환경 지원',
    ],
    recommend: 'AI·ML 워크로드를 온프레미스 환경에서 운영하고자 하는 기업',
  },
];

const ADDON_SERVICES: ServiceItem[] = [
  {
    key: 'Consulting',
    label: '정보보안 컨설팅',
    subtitle: 'Information Security Consulting',
    imgSrc: 'https://readdy.ai/api/search-image?query=Professional%20information%20security%20consulting%20concept%20with%20compliance%20audit%20documents%20shield%20icons%20digital%20security%20certification%20process%20modern%20isometric%20illustration%20dark%20navy%20blue%20background%20clean%20minimal%20futuristic%20style%20high%20detail&width=400&height=300&seq=addon01&orientation=landscape',
    features: [
      'ISMS / ISMS-P / ISO27001 인증 획득을 위한 컨설팅 제공',
      '현황 분석, 위험 평가, 개선 방안 제시 및 문서 작성·심사 대응 등 인증 전 과정 지원',
    ],
    recommend: '정보보호 관리체계 구축 및 인증 획득을 통한 보안 수준을 강화하고 정보통신망법, 개인정보보호법 등 관련 법률 준수와 보안사고 예방 체계가 필요한 기업',
  },
  {
    key: 'Pentest',
    label: '취약점 진단 및 모의해킹',
    subtitle: 'Vulnerability Assessment & Penetration Testing',
    imgSrc: 'https://readdy.ai/api/search-image?query=Cybersecurity%20vulnerability%20assessment%20and%20penetration%20testing%20concept%20with%20shield%20broken%20code%20hacker%20protection%20digital%20scan%20interface%20modern%20isometric%20illustration%20dark%20navy%20blue%20background%20clean%20minimal%20futuristic%20style%20high%20detail&width=400&height=300&seq=addon02&orientation=landscape',
    features: [
      '웹/모바일 모의해킹을 통한 내부 시스템 침투 및 중요정보 유출 가능성 점검 및 대응방안 제안',
      '서버, WAS, DB, 네트워크 등 인프라 시스템 취약점 진단 및 대응방안 제안',
      '응용 및 웹/앱 소스코드에 내재된 설계 및 구현상의 잠재적 취약점 점검',
    ],
    recommend: '웹사이트, IT 인프라 등의 취약점을 사전에 점검하여 안정적인 서비스 운영과 보안 수준 강화를 원하는 기업',
  },
  {
    key: 'Converged',
    label: '융합보안 및 관제서비스',
    subtitle: 'Converged Security & Monitoring Service',
    imgSrc: 'https://readdy.ai/api/search-image?query=Converged%20security%20monitoring%20and%20surveillance%20control%20room%20concept%20with%20CCTV%20cameras%20AI%20detection%20dashboard%20SIEM%20interface%20modern%20isometric%20illustration%20dark%20navy%20blue%20background%20clean%20minimal%20futuristic%20style%20high%20detail&width=400&height=300&seq=addon03&orientation=landscape',
    features: [
      '융합보안: 물리·사이버·운영 데이터를 통합한 융합보안 서비스',
      '- 출입통제, AI영상감지, OT보안, IDC, 시스템/네트워크 보안 등 융합보안 서비스 제공',
      '- 개별 보안이 아닌 시설·운영 전반을 고려한 통합 보안 체계 제공',
      '보안관제: AI 기반의 보안관제 서비스로 빠르고 정확한 탐지를 제공',
      '- SIEM 기반 보안 이벤트 통합 관제 및 침해사고 모니터링',
      '- 정기 레포팅 서비스 제공을 통한 보안 가시성 확보',
    ],
    recommend: '보안 솔루션은 도입했지만 전담 인력과 운영 체계가 부족하여 지속적인 보안 운영과 관리가 필요한 기업',
  },
];

function ServiceCard({ item, isLast }: { item: ServiceItem; isLast?: boolean }) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 md:p-8 border border-gray-700/50">
      {/* Desktop */}
      <div className="hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-bold text-white" style={{ fontSize: '34px' }}>{item.label}</h3>
          {item.badge && <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded whitespace-nowrap">{item.badge}</span>}
        </div>
        <p className="text-gray-400 mb-4" style={{ fontSize: '24px' }}>{item.subtitle}</p>
        {!isLast && <div className="border-t border-gray-700 mb-8" />}
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-[#5BA4F5] text-white text-sm font-bold rounded-full mb-3">특징</span>
          <div className="text-gray-200 text-lg leading-relaxed space-y-1">
            {item.features.map((f, i) => {
              const isSub = f.startsWith('- ');
              return (
                <p key={i} className={isSub ? 'pl-4' : ''}>
                  {isSub ? f.slice(2) : `• ${f}`}
                </p>
              );
            })}
          </div>
        </div>
        {item.compositions && (
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-white/15 text-white font-bold rounded mb-3" style={{ fontSize: '30px' }}>서비스 구성</span>
            <div className="text-gray-200 leading-relaxed space-y-3" style={{ fontSize: '24px' }}>
              {item.compositions.map((c) => (
                <div key={c.name}>
                  <p className="font-semibold mb-1">• {c.name}</p>
                  <p className="pl-4">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <span className="inline-block px-4 py-2 bg-white/15 text-white font-bold rounded mb-3" style={{ fontSize: '30px' }}>추천 고객</span>
          {Array.isArray(item.recommend) ? (
            <div className="text-gray-200 leading-relaxed space-y-1" style={{ fontSize: '24px' }}>
              {item.recommend.map((r, i) => <p key={i}>• {r}</p>)}
            </div>
          ) : (
            <p className="text-gray-200 leading-relaxed" style={{ fontSize: '24px' }}>{item.recommend}</p>
          )}
        </div>
      </div>
      {/* Mobile */}
      <div className="flex flex-col md:hidden gap-3">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">{item.label}</h3>
            {item.badge && <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded whitespace-nowrap">{item.badge}</span>}
          </div>
          <p className="text-gray-400 text-xs mb-2">{item.subtitle}</p>
          {!isLast && <div className="w-full border-t border-gray-700 mb-3" />}
        </div>
        <div className="mb-2">
          <span className="inline-block px-3 py-1 bg-[#5BA4F5] text-white text-xs font-bold rounded-full mb-2">특징</span>
          <div className="text-gray-200 text-xs leading-relaxed space-y-1">
            {item.features.map((f, i) => {
              const isSub = f.startsWith('- ');
              return (
                <p key={i} className={isSub ? 'pl-4' : ''}>
                  {isSub ? f.slice(2) : `• ${f}`}
                </p>
              );
            })}
          </div>
        </div>
        {item.compositions && (
          <div className="mb-2">
            <span className="inline-block px-3 py-1.5 bg-white/15 text-white font-bold rounded mb-2" style={{ fontSize: '18px' }}>서비스 구성</span>
            <div className="text-gray-200 leading-relaxed space-y-2" style={{ fontSize: '15px' }}>
              {item.compositions.map((c) => (
                <div key={c.name}>
                  <p className="font-semibold mb-1">• {c.name}</p>
                  <p className="pl-4">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <span className="inline-block px-3 py-1.5 bg-white/15 text-white font-bold rounded mb-2" style={{ fontSize: '18px' }}>추천 고객</span>
          {Array.isArray(item.recommend) ? (
            <div className="text-gray-200 leading-relaxed space-y-1" style={{ fontSize: '15px' }}>
              {item.recommend.map((r, i) => <p key={i}>• {r}</p>)}
            </div>
          ) : (
            <p className="text-gray-200 leading-relaxed" style={{ fontSize: '15px' }}>{item.recommend}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface Props {
  activeTab: MainTab;
}

export default function ServiceLicenseSection({ activeTab }: Props) {
  const services =
    activeTab === 'main'
      ? MAIN_SERVICES
      : activeTab === 'license'
      ? LICENSE_SERVICES
      : ADDON_SERVICES;

  return (
    <section id="service" className="py-[80px] px-4 md:px-6 bg-black w-full">
      <div className="max-w-6xl mx-auto space-y-6">
        {services.map((s, i) => (
          <ServiceCard key={s.key} item={s} isLast={i === services.length - 1} />
        ))}
      </div>
    </section>
  );
}