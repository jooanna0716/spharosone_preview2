import { useState, useEffect } from 'react';

const TESTIMONIALS = [
  {
    company: '유통A사',
    quote: '"트래픽 변동으로 인프라 투자와 예산 예측이 어려웠는데..."',
    highlights: [
      { text: '초기 비용 부담이 확 줄었어요', mark: false },
      { text: '사용량 기반으로', mark: true },
      { text: '비용도 예측할 수 있어서', mark: true },
      { text: '예산 운영이 훨씬 유연합니다', mark: true },
    ],
    image: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/1967d19d22cb3c073a3497b63e00b4c5.png',
  },
  {
    company: '금융B사',
    quote: '"신규 인프라 도입 시 안정성 검증으로 의사결정이 지연되었는데.."',
    highlights: [
      { text: '이미 검증된 기술이다 보니', mark: false },
      { text: '도입 의사결정이 어렵지 않았고', mark: false },
      { text: '시스템 안정성을 바탕으로', mark: true },
      { text: '믿고 사용할 수 있습니다', mark: true },
    ],
    image: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/3601a8591adf2e1e6caabefd3548dbcf.png',
  },
  {
    company: '이커머스C사',
    quote: '"보안을 유지하면서도 클라우드 활용이 꼭 필요했는데..."',
    highlights: [
      { text: '중요한 데이터는 프라이빗에,', mark: true },
      { text: '업데이트가 잦은 어플리케이션은', mark: true },
      { text: '퍼블릭에 올려', mark: true },
      { text: '효율적으로 운영합니다', mark: false },
    ],
    image: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/e2576f57fee98982388b884c9196439b.png',
  },
  {
    company: '공공기관D사',
    quote: '"보안 요구사항이 까다로워 인프라 설계가 어려운 상황이였는데..."',
    highlights: [
      { text: '보안이 가장 까다롭고', mark: false },
      { text: '중요한 부분이었는데', mark: false },
      { text: '도입 전단계부터 환경에 맞춰', mark: true },
      { text: '설계 받으니 든든합니다', mark: true },
    ],
    image: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/2879f7e52e056f5ba5e55caa397c1b23.png',
  },
  {
    company: 'E그룹사 IT조직',
    quote: '"기존에는 여러 시스템 환경으로 운영 관리가 복잡했었는데..."',
    highlights: [
      { text: '시스템 운영 환경이 달라도', mark: false },
      { text: '하나의 플랫폼에서', mark: true },
      { text: '통합적으로 관리할 수 있어', mark: true },
      { text: '업무 리소스도 확 줄였습니다', mark: false },
    ],
    image: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/54ae3a8f8c8af3a3e421fd2f8e5f0902.png',
  },
  {
    company: '이커머스F사',
    quote: '"트래픽 급증 시 서버 확장과 장애 대응이 어려웠었는데..."',
    highlights: [
      { text: '리소스를 유연하게 조절해서', mark: false },
      { text: '갑자기 트래픽이 몰려도 걱정 없고', mark: false },
      { text: '문제 발생시에도 안정적으로', mark: true },
      { text: '서비스를 유지합니다', mark: true },
    ],
    image: 'https://static.readdy.ai/image/74d9b2b644fd8fb2513402f53651a609/d9036f5dd216c5f735f4addfbc751f2a.png',
  },
];

const ACTIVE_BLUE = '#5BA4F5';
const GAP = 20;
const TOTAL = TESTIMONIALS.length;

export default function TestimonialSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [cardIdx, setCardIdx] = useState(0);       // 모바일: 1장씩
  const [pageIdx, setPageIdx] = useState(0);       // 데스크탑: 3장씩
  const PAGE_COUNT = Math.ceil(TOTAL / 3);
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const navigate = (dir: 1 | -1) => {
    setSlideDir(dir);
    setAnimKey(k => k + 1);
    if (isMobile) {
      setCardIdx(p => (p + dir + TOTAL) % TOTAL);
    } else {
      setPageIdx(p => (p + dir + PAGE_COUNT) % PAGE_COUNT);
    }
  };

  // 데스크탑: 3장씩
  const startIdx = pageIdx * 3;
  const desktopCards = [0, 1, 2].map(offset => ({
    item: TESTIMONIALS[(startIdx + offset) % TOTAL],
    id: (startIdx + offset) % TOTAL,
  }));

  const Card = ({ item }: { item: typeof TESTIMONIALS[0] }) => (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        background: '#1c1c1c',
        borderRadius: '16px',
        padding: 'clamp(16px, 2vw, 32px) clamp(16px, 2vw, 32px) clamp(16px, 4vh, 50px)',
        border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: 'clamp(44px, 6vh, 64px)', height: 'clamp(44px, 6vh, 64px)', borderRadius: '50%',
          overflow: 'hidden', marginBottom: 'clamp(10px, 1.5vh, 20px)', flexShrink: 0,
          border: '2px solid rgba(91,164,245,0.35)',
          boxShadow: '0 0 0 4px rgba(91,164,245,0.08)',
        }}
      >
        <img src={item.image} alt={item.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <p style={{ color: ACTIVE_BLUE, fontWeight: 700, fontSize: 'var(--fs-body)', marginBottom: '6px', letterSpacing: '0.04em' }}>
        {item.company}
      </p>
      <p style={{ color: '#777777', fontSize: 'var(--fs-body)', lineHeight: 1.55, marginBottom: 'clamp(8px, 1.5vh, 20px)' }}>
        {item.quote}
      </p>
      <div style={{ marginTop: 'clamp(16px, 3vh, 36px)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {item.highlights.map((h, hi) => (
          <p
            key={hi}
            style={{
              fontSize: 'var(--fs-subtitle)',
              fontWeight: h.mark ? 700 : 400,
              color: '#f0f0f0',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {h.text}
          </p>
        ))}
      </div>
    </div>
  );

  const ArrowButtons = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {([{ dir: -1 as const, icon: 'ri-arrow-left-s-line' }, { dir: 1 as const, icon: 'ri-arrow-right-s-line' }] as const).map(({ dir, icon }) => (
        <button
          key={dir}
          onClick={() => navigate(dir)}
          style={{
            width: '40px', height: '40px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.25)',
            background: 'transparent', color: 'rgba(255,255,255,0.8)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <i className={`${icon} text-xl`} />
        </button>
      ))}
    </div>
  );

  return (
    <section style={{ background: '#0d0d0d', minHeight: isMobile ? 'auto' : '100vh', display: 'flex', flexDirection: 'column', paddingTop: 'clamp(32px, 6vh, 120px)', paddingBottom: 'clamp(32px, 6vh, 120px)' }}>

      {/* 헤더 */}
      <div
        style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          paddingLeft: 'clamp(24px, 8.33vw, 120px)', paddingRight: 'clamp(24px, 8.33vw, 120px)',
          marginBottom: 'clamp(16px, 3vh, 36px)',
        }}
      >
        <div>
          <span style={{ color: ACTIVE_BLUE, fontWeight: 700, fontSize: 'var(--fs-label)', display: 'block', marginBottom: '10px', letterSpacing: '0.05em' }}>
            기대효과
          </span>
          <h2 style={{ color: '#f0f0f0', fontWeight: 800, fontSize: 'var(--fs-display)', margin: 0, lineHeight: 1.15 }}>
            현장의 고민을 확신으로
          </h2>
        </div>
        <ArrowButtons />
      </div>

      {/* 카드 트랙 */}
      <div style={{ paddingLeft: 'clamp(24px, 8.33vw, 120px)', paddingRight: 'clamp(24px, 8.33vw, 120px)', overflow: 'hidden', flex: isMobile ? 'none' : 1, display: 'flex', flexDirection: 'column' }}>
        {isMobile ? (
          /* ── 모바일: 1장씩 ── */
          <div
            key={animKey}
            style={{
              animation: `slideCards${slideDir > 0 ? 'Left' : 'Right'} 0.35s cubic-bezier(0.25,0.46,0.45,0.94) both`,
            }}
          >
            <Card item={TESTIMONIALS[cardIdx]} />
          </div>
        ) : (
          /* ── 데스크탑: 3장씩 ── */
          <div
            key={animKey}
            style={{
              display: 'flex',
              gap: `${GAP}px`,
              flex: 1,
              animation: `slideCards${slideDir > 0 ? 'Left' : 'Right'} 0.35s cubic-bezier(0.25,0.46,0.45,0.94) both`,
            }}
          >
            {desktopCards.map(({ item, id }) => (
              <Card key={id} item={item} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideCardsLeft {
          from { transform: translateX(8%); opacity: 0.6; }
          to   { transform: translateX(0);  opacity: 1; }
        }
        @keyframes slideCardsRight {
          from { transform: translateX(-8%); opacity: 0.6; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      `}</style>
    </section>
  );
}
