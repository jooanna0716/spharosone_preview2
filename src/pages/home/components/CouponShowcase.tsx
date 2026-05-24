import { useEffect, useRef, useState } from 'react';

const CARDS = [
  {
    number: '01',
    titleBlue: '안정성과 신뢰성',
    titleBlack: '확보',
    desc: 'Nutanix 기술을 바탕으로 시스템 안정성을 높이고, 장기적으로 신뢰할 수 있는 운영 환경을 구현해 기업이 안정적으로 비즈니스를 지속할 수 있는 기반을 제공합니다.',
    image: '/images/안정적인 뉴타닉스.png',
  },
  {
    number: '02',
    titleBlue: '균형 잡힌',
    titleBlack: '하이브리드',
    desc: '프라이빗부터 퍼블릭까지 아우르는 하이브리드 클라우드 환경으로, 민감한 데이터는 안전하게 보호하고 민첩하게 확장하여 보안 수준과 운영 효율을 높입니다.',
    image: '/images/하이브리드.png',
  },
  {
    number: '03',
    titleBlue: '도입 장벽은 낮추고,',
    titleBlack: '비용 부담은 최소화',
    desc: '초기 인프라 구축에 필요한 대규모 투자 없이 필요한 만큼 구독형으로 사용해 예산 부담을 낮추고 비용을 예측 가능하게 관리할 수 있습니다.',
    image: '/images/OPEX.png',
  },
  {
    number: '04',
    titleBlue: '기업에 딱 맞는',
    titleBlack: '서비스형 인프라',
    desc: '단순 장비 임대가 아닌, 고객 비즈니스 환경에 맞는 가상화·DR·AI 등 인프라를 맞춤형으로 설계하고 필요에 따라 자유롭게 확장해 비용 효율성과 최적의 운영 환경을 구현합니다.',
    image: '/images/맞춤형.png',
  },
  {
    number: '05',
    titleBlue: '손쉬운',
    titleBlack: '운영·관리',
    desc: '스파로스 CMP를 통해 분산된 클라우드 자원·비용·운영 현황을 통합 관리해 가시성을 확보하고 신속한 의사결정을 지원하며 운영 리소스를 효율화할 수 있습니다.',
    image: '/images/스파로스cmp.png',
  },
];

/* 스크롤 진입 시 위/아래로 살짝 튀어오르는 카드 */
function BouncyCard({ children, index, style }: { children: React.ReactNode; index: number; style: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(60px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = visible ? 'translateY(0)' : 'translateY(60px)';
      }}
    >
      {children}
    </div>
  );
}

/* ─── 데스크탑 ─── */
function DesktopCouponShowcase() {
  return (
    <section style={{ background: '#0d0d0d', padding: 'clamp(80px, 13vh, 180px) 0' }}>
      <div style={{ width: '100%', padding: '0 120px' }}>

        {/* 헤더 */}
        <div style={{ marginBottom: '48px' }}>
          <span className="section-label acc" style={{ fontSize: 'var(--fs-label)' }}>핵심가치</span>
          <h2 className="font-extrabold" style={{ fontSize: 'var(--fs-display)', color: '#f0f0f0', lineHeight: 1.2 }}>
            스파로스 원을 선택해야 하는 이유
          </h2>
        </div>

        {/* 5행 1열 카드 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {CARDS.map((card, idx) => (
            <BouncyCard
              key={card.number}
              index={idx}
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '360px 1fr',
                alignItems: 'stretch',
                background: '#1a1a1a',
                boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: '240px',
              }}
            >
              {/* 왼쪽: 이미지 (오버레이 없음) */}
              <div
                style={{
                  backgroundImage: card.image ? `url('${card.image}')` : 'none',
                  backgroundColor: card.image ? undefined : '#F0F0F0',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* 오른쪽: 제목 + 설명 */}
              <div
                style={{
                  padding: '40px clamp(28px, 2.5vw, 48px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '20px',
                }}
              >
                <h3 className="font-bold" style={{ fontSize: 'var(--fs-label)', lineHeight: 1.35, margin: 0 }}>
                  <span className="acc">{card.titleBlue}</span>
                  <br />
                  <span style={{ color: '#f0f0f0' }}>{card.titleBlack}</span>
                </h3>
                <p style={{ fontSize: 'var(--fs-subtitle)', color: 'rgba(240,240,240,0.65)', lineHeight: 1.7, margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            </BouncyCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 모바일 ─── */
function MobileCouponShowcase() {
  return (
    <section style={{ background: '#0d0d0d', padding: '80px 0' }}>
      <div style={{ width: '100%', padding: '0 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <span className="section-label acc" style={{ fontSize: 'var(--fs-label)' }}>핵심가치</span>
          <h2 className="font-extrabold" style={{ fontSize: 'var(--fs-display)', color: '#f0f0f0', lineHeight: 1.2 }}>
            스파로스 원을 선택해야 하는 이유
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {CARDS.map((card, idx) => (
            <BouncyCard
              key={card.number}
              index={idx}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                background: '#1a1a1a',
                boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '180px',
                  backgroundImage: card.image ? `url('${card.image}')` : 'none',
                  backgroundColor: card.image ? undefined : '#F0F0F0',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <h3 className="font-bold" style={{ fontSize: 'var(--fs-label)', lineHeight: 1.35, margin: 0 }}>
                  <span className="acc">{card.titleBlue}</span>
                  <br />
                  <span style={{ color: '#f0f0f0' }}>{card.titleBlack}</span>
                </h3>
                <p style={{ fontSize: 'var(--fs-sm)', color: 'rgba(240,240,240,0.65)', lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
              </div>
            </BouncyCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CouponShowcase() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile ? <MobileCouponShowcase /> : <DesktopCouponShowcase />;
}
