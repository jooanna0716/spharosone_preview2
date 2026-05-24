import { useState, useEffect } from 'react';

type MainTab = 'main' | 'license' | 'addon';

interface TableRow {
  category?: string;
  categoryRowspan?: number;
  categoryGroupEnd?: boolean;
  classification?: string;
  classificationRowspan?: number;
  item: string;
  spec: string;
  unit: string;
  unitRowspan?: number;
  skipUnit?: boolean;
  billing?: string;
  billingRowspan?: number;
  billingGroupEnd?: boolean;
  note?: string;
  noteRowspan?: number;
  skipBilling?: boolean;
  skipNote?: boolean;
  groupEnd?: boolean;
}

interface ServiceItem {
  key: string;
  label: string;
  subtitle: string;
  badge?: string;
  definition?: string;
  features: string[];
  compositions?: { name: string; desc: string }[];
  serviceTable?: { title: string; rows: TableRow[] };
  recommend: string | string[];
}

const MAIN_SERVICES: ServiceItem[] = [
  {
    key: 'IaaS',
    label: 'IaaS',
    subtitle: 'Infrastructure as a Service',
    definition: '서버, 스토리지, 네트워크 등의 IT 인프라를 서비스 형태로 제공해 기업 환경에 맞춘 유연한 설계와 자원의 가변적 확장을 지원하는 서비스입니다.',
    features: [],
    compositions: [
      { name: 'IaaS', desc: '신세계아이앤씨 데이터센터 인프라 기반으로 가상 자원을 유연하게 제공하는 클라우드 인프라 서비스' },
      { name: 'IaaS (Outpost)', desc: '고객 데이터센터 내 전용 인프라를 구축해 보안·컴플라이언스 요건을 충족하며 클라우드 유연성을 제공하는 온프레미스형 IaaS 서비스' },
    ],
    serviceTable: {
      title: 'IaaS 서비스 구성',
      rows: [
        { category: 'IaaS', categoryRowspan: 7, categoryGroupEnd: true, classification: '기본 서비스료', item: '관리 플랫폼', spec: '', unit: 'VM', unitRowspan: 7, billing: '월청구', billingRowspan: 7, billingGroupEnd: true, note: '계정당 기본료' },
        { classification: 'VM 타입', classificationRowspan: 2, item: '기본', spec: '8 Core / 32 GB / 1,000 GB', skipUnit: true, skipBilling: true },
        { item: '추가', spec: '4 Core / 32 GB / 1,000 GB', skipUnit: true, skipBilling: true },
        { classification: '관제 및 운영대행', item: '관제 및 운영대행', spec: '대당', skipUnit: true, skipBilling: true },
        { classification: '백업 서비스', item: '스냅샷', spec: 'VM 당', skipUnit: true, skipBilling: true },
        { classification: '공용 방화벽 서비스', item: '공용 방화벽 서비스', spec: '방화벽 사용 IP 수량에 따라 과금', skipUnit: true, skipBilling: true },
        { classification: '백신', groupEnd: true, item: 'V3 Net for Windows Server', spec: '공유 자원 풀', skipUnit: true, skipBilling: true },
        { category: 'IaaS\n(outpost)', categoryRowspan: 5, classification: 'SCI', item: 'Spharos One cloud infrastructure', spec: '100GB 당', unit: 'Core', billing: '월청구', billingRowspan: 5, note: 'Spharos CMP 기본 포함', noteRowspan: 5 },
        { classification: 'SCM', item: 'Spharos One cloud manager', spec: 'VM 당', unit: 'Core', skipBilling: true, skipNote: true },
        { classification: 'SUS', item: 'Spharos One unified storage', spec: 'VM 당', unit: 'TiB', skipBilling: true, skipNote: true },
        { classification: 'SAI (SKP)', item: 'Spharos One AI platform', spec: 'VM 당', unit: 'Core', skipBilling: true, skipNote: true },
        { classification: 'HW', item: '요구 사양 별', spec: 'VM 당', unit: 'Node', skipBilling: true, skipNote: true },
      ],
    },
    recommend: [
      '인프라를 직접 구축하지 않고, 필요한 만큼 유연하게 사용하고자 하는 기업',
      '초기 투자 비용 부담을 줄이고, 서비스 확장 및 운영 변화에 맞춰 인프라를 효율적으로 운영하려는 기업',
    ],
  },
  {
    key: 'DRaaS',
    label: 'DRaaS',
    subtitle: 'Disaster Recovery as a Service',
    definition: '재해나 시스템 장애 발생 시 데이터와 시스템을 신속하게 복구할 수 있는 환경을 제공해 서비스 중단을 최소화하고 비즈니스 연속성을 보장하는 서비스입니다.',
    features: [],
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
    definition: '사용자가 장소나 기기에 구애받지 않고 동일한 업무 환경에 접속할 수 있도록 지원하여 보안성과 안정성을 강화하는 클라우드 기반 가상 데스크톱 서비스입니다.',
    features: [],
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
    definition: '표준 아키텍처를 기반으로 서버, 스토리지, 가상화, DR을 통합 패키징해 고객사 환경에 맞춘 최적의 설치와 유연한 인프라 확장을 지원하는 온프레미스 클라우드 구축 서비스입니다.',
    features: [],
    recommend: [
      '자체 클라우드 및 가상화 인프라를 안정적인 온프레미스에 신규 구축하여 운영 복잡도를 줄이려고 하는 기업',
      '노후 서버 및 스토리지 환경을 통합·고도화하려는 기업',
    ],
  },
  {
    key: 'SCM',
    label: 'SCM',
    subtitle: 'Spharos One Cloud Manager',
    definition: '인프라 상태, 비용, 보안 현황을 단일 플랫폼에서 가시화하고 온프레미스와 클라우드를 통합 운영해 자원 효율성과 비용 절감을 극대화하는 관리 솔루션입니다.',
    features: [],
    recommend: [
      '클라우드 인프라를 체계적으로 운영·관리하고 표준화된 관리 체계를 구축하려는 기업',
      '온프레미스 환경을 동시에 운영하거나, 비용·보안·운영 정책을 통합 관리해야 하는 중대형 기업',
    ],
  },
  {
    key: 'SUS',
    label: 'SUS',
    subtitle: 'Spharos One Unified Storage',
    definition: '파일, 오브젝트, 블록 스토리지를 하나의 솔루션으로 통합해 관리 및 백업을 수행하며, 재해 복구(DR) 기능을 통해 데이터 보안과 복구의 안정성을 보장하는 통합 스토리지 서비스입니다.',
    features: [],
    recommend: [
      '인프라 유지보수 인력 없이 안정적인 소프트웨어 운영 환경을 유지하고자 하는 기업',
      '시스템 안정성과 보안 수준을 지속적으로 유지해야 하는 금융·유통·제조·공공기관',
      '24/7 서비스 운영 기업',
    ],
  },
  {
    key: 'SKP',
    label: 'SKP',
    subtitle: 'Spharos One Kubernetes Platform',
    definition: '클러스터 및 테넌트 환경에서 쿠버네티스의 설치부터 모니터링까지 전 단계를 통합 관리해 컨테이너 기반 서비스의 운영 효율을 높여주는 플랫폼입니다.',
    features: [],
    recommend: [
      '데이터 암호화 및 보안 컴플라이언스 요건이 높은 금융·공공 기업',
      '개인정보 및 민감 데이터를 안전하게 보호해야 하거나, 내부 보안 통제 및 감사 대응 체계를 강화하려는 기업',
    ],
  },
  {
    key: 'SAI',
    label: 'SAI',
    subtitle: 'Spharos One AI Platform',
    definition: '온프레미스 환경에서 GPU 통합 관리 및 공유를 지원하고 LLM 등 AI 워크로드의 신속한 실행과 효율적인 운영을 가능하게 하는 기업용 AI 전용 솔루션입니다.',
    features: [],
    recommend: [
      'AI·ML 워크로드를 온프레미스 환경에서 운영하고자 하는 기업',
      '대규모 데이터 분석 및 생성형 AI 서비스를 준비하는 기업',
    ],
  },
];

const ADDON_SERVICES: ServiceItem[] = [
  {
    key: 'Consulting',
    label: '정보보안 컨설팅',
    subtitle: 'Information Security Consulting',
    definition: 'ISMS, ISMS-P, ISO27001 등 국내외 보안 인증 획득을 위해 현황 분석과 위험 평가부터 개선안 도출, 심사 대응까지 전 과정을 밀착 지원하는 전문 컨설팅 서비스입니다.',
    features: [],
    recommend: [
      '정보보호 인증 취득 및 유지 관리가 필요한 기업',
      '개인정보보호법, 정보통신망법 등 보안·컴플라이언스 대응 체계 구축이 필요한 기업',
      '보안 수준 강화와 체계적인 위험 관리 및 보안사고 예방 체계가 필요한 기업',
    ],
  },
  {
    key: 'Pentest',
    label: '취약점 진단 및 모의해킹',
    subtitle: 'Vulnerability Assessment & Penetration Testing',
    definition: '웹·모바일 모의해킹과 인프라 시스템 및 소스코드 진단을 통해 침투 가능성과 잠재적 결함을 선제적으로 파악하고, 실질적인 기술적 대응 방안을 제시하는 보안 점검 서비스입니다.',
    features: [],
    recommend: [
      '웹·모바일 서비스와 IT 인프라의 보안 취약점을 사전에 점검하고 대응하려는 기업',
      '해킹, 정보 유출 등 사이버 위협 예방과 안정적인 서비스 운영 체계가 필요한 기업',
      '모의해킹 및 취약점 진단을 통해 보안 수준을 강화하고 기술적 대응 체계를 고도화하려는 기업',
    ],
  },
  {
    key: 'Converged',
    label: '융합보안 및 관제서비스',
    subtitle: 'Converged Security & Monitoring Service',
    definition: '물리·사이버·운영 데이터를 통합해 시설 전반의 보안 체계를 구축하는 융합보안과, AI 및 SIEM 기반으로 침해 사고를 실시간 탐지하고 정기 분석 정보를 제공하는 보안관제가 결합된 통합 보호 서비스입니다.',
    features: [],
    recommend: [
      '물리·사이버 보안을 통합 관리하고 실시간 위협 대응 체계가 필요한 기업',
      '보안 솔루션은 구축했지만 전문 인력과 운영 체계가 부족한 기업',
      '24시간 보안 모니터링과 침해 사고 예방·대응 체계를 강화하려는 기업',
    ],
  },
];

const GROUP_BORDER = '2px solid #555';

const thCell: React.CSSProperties = {
  background: '#5BA4F5',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '18px',
  padding: '12px 16px',
  textAlign: 'center',
  borderRight: '1px solid #4a90e0',
  whiteSpace: 'nowrap',
};

const tdCell: React.CSSProperties = {
  fontSize: '18px',
  padding: '11px 16px',
  textAlign: 'center',
  borderRight: '1px solid rgba(255,255,255,0.08)',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  color: '#e0e0e0',
  verticalAlign: 'middle',
};

function groupStyle(base: React.CSSProperties, groupEnd?: boolean, categoryGroupEnd?: boolean): React.CSSProperties {
  if (groupEnd || categoryGroupEnd) return { ...base, borderBottom: GROUP_BORDER };
  return base;
}

function ServiceTableModal({ table, onClose }: { table: NonNullable<ServiceItem['serviceTable']>; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#1a1a1a',
          borderRadius: '16px',
          width: 'min(1200px, 95vw)',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '44px 44px 40px',
          position: 'relative',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '20px', right: '24px',
            background: 'none', border: 'none', fontSize: '24px',
            cursor: 'pointer', color: '#aaaaaa', lineHeight: 1,
          }}
        >
          ✕
        </button>

        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', color: '#f0f0f0' }}>
          {table.title}
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid rgba(255,255,255,0.1)', tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '110px' }} />
              <col style={{ width: '150px' }} />
              <col style={{ width: '190px' }} />
              <col style={{ width: '300px' }} />
              <col style={{ width: '90px' }} />
              <col style={{ width: '90px' }} />
              <col style={{ width: '150px' }} />
            </colgroup>
            <thead>
              <tr>
                {['분류', '구분', '항목', '사양', '단위', '월 요금', '비고'].map((h) => (
                  <th key={h} style={thCell}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr key={i}>
                  {row.category !== undefined && (
                    <td
                      rowSpan={row.categoryRowspan}
                      style={groupStyle({ ...tdCell, fontWeight: 600, whiteSpace: 'pre-line', background: '#222222' }, false, row.categoryGroupEnd)}
                    >
                      {row.category}
                    </td>
                  )}
                  {row.classification !== undefined && (
                    <td
                      rowSpan={row.classificationRowspan ?? 1}
                      style={groupStyle({ ...tdCell, background: '#222222' }, row.groupEnd)}
                    >
                      {row.classification}
                    </td>
                  )}
                  <td style={groupStyle(tdCell, row.groupEnd)}>{row.item}</td>
                  <td style={groupStyle({ ...tdCell, textAlign: 'left' }, row.groupEnd)}>{row.spec}</td>
                  {!row.skipUnit && (
                    <td rowSpan={row.unitRowspan ?? 1} style={groupStyle({ ...tdCell, whiteSpace: 'nowrap' }, row.groupEnd, row.categoryGroupEnd)}>{row.unit}</td>
                  )}
                  {!row.skipBilling && (
                    row.billing !== undefined
                      ? <td rowSpan={row.billingRowspan ?? 1} style={groupStyle(tdCell, row.groupEnd || row.billingGroupEnd)}>{row.billing}</td>
                      : <td style={groupStyle(tdCell, row.groupEnd)}></td>
                  )}
                  {!row.skipNote && (
                    row.note !== undefined
                      ? <td rowSpan={row.noteRowspan ?? 1} style={groupStyle({ ...tdCell, textAlign: 'left' }, row.groupEnd)}>{row.note}</td>
                      : <td style={groupStyle(tdCell, row.groupEnd)}></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ServiceDetailRow({ item }: { item: ServiceItem; isFirst?: boolean }) {
  const [open, setOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <>
      {popupOpen && item.serviceTable && (
        <ServiceTableModal table={item.serviceTable} onClose={() => setPopupOpen(false)} />
      )}

      <div
        className="px-6 md:px-10"
        style={{
          background: '#1a1a1a',
          borderRadius: '20px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* 데스크탑 */}
        <div className="hidden md:block py-10">
          {/* 제목 */}
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h3 className="font-bold" style={{ fontSize: '30px', lineHeight: 1.1, color: '#f0f0f0' }}>{item.label}</h3>
            {item.badge && (
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#ffffff',
                  background: '#5BA4F5',
                  padding: '4px 12px',
                  borderRadius: '20px',
                }}
              >
                {item.badge}
              </span>
            )}
          </div>
          <p className="mb-8" style={{ fontSize: '20px', color: '#aaaaaa' }}>{item.subtitle}</p>

          {/* 상세 */}
          <div className="space-y-8">
            {item.definition ? (
              <>
                <p className="leading-relaxed" style={{ fontSize: '28px', color: 'rgba(240,240,240,0.8)' }}>{item.definition}</p>
                <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.10)', margin: '8px 0 0' }} />
              </>
            ) : item.features.length > 0 && (
              <div>
                <p className="font-bold text-black text-2xl mb-3">특징</p>
                <div className="text-black/80 text-xl leading-relaxed space-y-1">
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
            )}

            {item.compositions && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span
                    className="font-bold"
                    style={{ fontSize: '24px', background: 'rgba(255,255,255,0.08)', padding: '6px 20px', borderRadius: '20px', color: '#f0f0f0' }}
                  >
                    서비스 구성
                  </span>
                  {item.serviceTable && (
                    <button
                      onMouseEnter={() => setBtnHovered(true)}
                      onMouseLeave={() => setBtnHovered(false)}
                      onClick={() => setPopupOpen(true)}
                      className={btnHovered ? undefined : 'acc'}
                      style={{
                        fontSize: 'var(--fs-body)',
                        fontWeight: 600,
                        color: btnHovered ? '#3a87e0' : undefined,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        textDecoration: 'underline',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      상세 보기
                    </button>
                  )}
                </div>
                <div className="leading-relaxed space-y-3" style={{ fontSize: '24px', color: 'rgba(240,240,240,0.8)' }}>
                  {item.compositions.map((c) => (
                    <div key={c.name}>
                      <p className="font-semibold" style={{ color: '#f0f0f0' }}>• {c.name}</p>
                      <p className="pl-4" style={{ color: 'rgba(240,240,240,0.65)' }}>{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span
                className="inline-block font-bold mb-3"
                style={{ fontSize: '24px', background: 'rgba(255,255,255,0.08)', padding: '4px 16px', borderRadius: '20px', color: '#f0f0f0' }}
              >
                추천 고객
              </span>
              {Array.isArray(item.recommend) ? (
                <div className="leading-relaxed space-y-1" style={{ fontSize: '24px', color: 'rgba(240,240,240,0.8)' }}>
                  {item.recommend.map((r, i) => <p key={i}>• {r}</p>)}
                </div>
              ) : (
                <p className="leading-relaxed" style={{ fontSize: '24px', color: 'rgba(240,240,240,0.8)' }}>{item.recommend}</p>
              )}
            </div>
          </div>
        </div>

        {/* 모바일 아코디언 */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between py-5 cursor-pointer"
          >
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-2xl" style={{ color: '#f0f0f0' }}>{item.label}</h3>
                {item.badge && (
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', background: '#5BA4F5', padding: '2px 8px', borderRadius: '20px' }}>
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-sm mt-1" style={{ color: '#aaaaaa' }}>{item.subtitle}</p>
            </div>
            <span className="w-8 h-8 flex items-center justify-center text-xl" style={{ color: '#aaaaaa' }}>
              {open ? '−' : '+'}
            </span>
          </button>

          {open && (
            <div className="pb-6 space-y-6">
              {item.definition ? (
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,240,240,0.8)' }}>{item.definition}</p>
              ) : item.features.length > 0 && (
                <div>
                  <p className="font-bold text-black text-base mb-2">특징</p>
                  <div className="text-black/80 text-sm leading-relaxed space-y-1">
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
              )}
              {item.compositions && (
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span
                      style={{ fontSize: '14px', fontWeight: 700, background: 'rgba(255,255,255,0.08)', padding: '4px 14px', borderRadius: '20px', color: '#f0f0f0' }}
                    >
                      서비스 구성
                    </span>
                    {item.serviceTable && (
                      <button
                        onClick={() => setPopupOpen(true)}
                        className="acc"
                        style={{
                          fontSize: '13px',
                          fontWeight: 600,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          textDecoration: 'underline',
                        }}
                      >
                        상세 보기
                      </button>
                    )}
                  </div>
                  <div className="leading-relaxed space-y-2" style={{ fontSize: '14px', color: 'rgba(240,240,240,0.8)' }}>
                    {item.compositions.map((c) => (
                      <div key={c.name}>
                        <p className="font-semibold" style={{ color: '#f0f0f0' }}>• {c.name}</p>
                        <p className="pl-4" style={{ color: 'rgba(240,240,240,0.65)' }}>{c.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <span
                  className="inline-block font-bold mb-2"
                  style={{ fontSize: '14px', background: 'rgba(255,255,255,0.08)', padding: '4px 14px', borderRadius: '20px', color: '#f0f0f0' }}
                >
                  추천 고객
                </span>
                {Array.isArray(item.recommend) ? (
                  <div className="leading-relaxed space-y-1" style={{ fontSize: '14px', color: 'rgba(240,240,240,0.8)' }}>
                    {item.recommend.map((r, i) => <p key={i}>• {r}</p>)}
                  </div>
                ) : (
                  <p className="leading-relaxed" style={{ fontSize: '14px', color: 'rgba(240,240,240,0.8)' }}>{item.recommend}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

interface Props {
  activeTab: MainTab;
}

export default function ServiceLicenseSection({ activeTab }: Props) {
  const [isMd, setIsMd] = useState(true);
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    setIsMd(mql.matches);
    const h = (e: MediaQueryListEvent) => setIsMd(e.matches);
    mql.addEventListener('change', h);
    return () => mql.removeEventListener('change', h);
  }, []);

  const services =
    activeTab === 'main'
      ? MAIN_SERVICES
      : activeTab === 'license'
      ? LICENSE_SERVICES
      : ADDON_SERVICES;

  return (
    <section style={{ background: '#0d0d0d', padding: isMd ? '80px 0 80px' : '24px 0 40px' }}>
      <div style={{ width: '100%', padding: isMd ? '0 clamp(24px, 5vw, 120px)' : '0 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {services.map((s) => (
            <ServiceDetailRow key={s.key} item={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
