import { useState } from 'react';

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
// 카드 폭: 왼쪽 패딩(120px) 뺀 너비를 2.5등분. 2장 + 반장 peek
const CARD_W = `calc((100vw - 120px - ${GAP * 2}px) / 2.5)`;
const CARD_W_MOBILE = `calc((100vw - 48px - ${GAP}px) / 1.2)`;

export default function TestimonialSection() {
  const [startIdx, setStartIdx] = useState(0);
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const [animKey, setAnimKey] = useState(0);

  const navigate = (dir: 1 | -1) => {
    setSlideDir(dir);
    setAnimKey(k => k + 1);
    setStartIdx(i => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const cards = [0, 1, 2].map(offset => ({
    item: TESTIMONIALS[(startIdx + offset) % TESTIMONIALS.length],
    id: (startIdx + offset) % TESTIMONIALS.length,
  }));

  return (
    <section style={{ background: '#0d0d0d', paddingTop: 'clamp(48px, 8vh, 96px)', paddingBottom: 'clamp(48px, 8vh, 96px)' }}>

      {/* 헤더 */}
      <div
        className="flex items-end justify-between"
        style={{ paddingLeft: 'clamp(24px, 8.33vw, 120px)', paddingRight: 'clamp(24px, 8.33vw, 120px)', marginBottom: '36px' }}
      >
        <div>
          <span style={{ color: ACTIVE_BLUE, fontWeight: 700, fontSize: 'var(--fs-label)', display: 'block', marginBottom: '10px', letterSpacing: '0.05em' }}>
            기대효과
          </span>
          <h2 style={{ color: '#f0f0f0', fontWeight: 800, fontSize: 'var(--fs-display)', margin: 0, lineHeight: 1.15 }}>
            현장의 고민을 확신으로
          </h2>
        </div>

        {/* 화살표 */}
        <div className="flex items-center gap-2">
          {[{ dir: -1 as const, icon: 'ri-arrow-left-s-line' }, { dir: 1 as const, icon: 'ri-arrow-right-s-line' }].map(({ dir, icon }) => (
            <button
              key={dir}
              onClick={() => navigate(dir)}
              className="flex items-center justify-center cursor-pointer transition-all hover:bg-white/10"
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.25)',
                background: 'transparent', color: 'rgba(255,255,255,0.8)',
              }}
            >
              <i className={`${icon} text-xl`} />
            </button>
          ))}
        </div>
      </div>

      {/* 카드 트랙 — overflow:hidden으로 2.5번째 카드 클리핑 */}
      <div style={{ paddingLeft: 'clamp(24px, 8.33vw, 120px)', overflow: 'hidden' }}>
        <div
          key={animKey}
          className="flex"
          style={{
            gap: `${GAP}px`,
            animation: `slideCards${slideDir > 0 ? 'Left' : 'Right'} 0.35s cubic-bezier(0.25,0.46,0.45,0.94) both`,
          }}
        >
          {cards.map(({ item, id }) => (
            <div
              key={id}
              className="flex-shrink-0 flex flex-col"
              style={{
                width: `clamp(260px, ${CARD_W}, 560px)`,
                background: '#1c1c1c',
                borderRadius: '16px',
                padding: 'clamp(20px, 2vw, 32px)',
                border: '1px solid rgba(255,255,255,0.07)',
                minHeight: '280px',
              }}
            >
              {/* 원형 이미지 */}
              <div
                style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  overflow: 'hidden', marginBottom: '20px', flexShrink: 0,
                  border: '2px solid rgba(91,164,245,0.35)',
                  boxShadow: '0 0 0 4px rgba(91,164,245,0.08)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.company}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* 회사명 */}
              <p style={{ color: ACTIVE_BLUE, fontWeight: 700, fontSize: 'var(--fs-body)', marginBottom: '6px', letterSpacing: '0.04em' }}>
                {item.company}
              </p>

              {/* 인용 */}
              <p style={{ color: '#777777', fontSize: 'var(--fs-body)', lineHeight: 1.55, marginBottom: '20px' }}>
                {item.quote}
              </p>

              {/* 하이라이트 */}
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '3px' }}>
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
          ))}
        </div>
      </div>

      {/* 모바일용 도트 */}
      <div className="flex md:hidden justify-center gap-1.5 mt-6">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setSlideDir(i > startIdx ? 1 : -1); setAnimKey(k => k + 1); setStartIdx(i); }}
            style={{
              width: i === startIdx ? '28px' : '8px', height: '3px',
              borderRadius: '2px', background: i === startIdx ? ACTIVE_BLUE : 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s', border: 'none', cursor: 'pointer', padding: 0,
            }}
          />
        ))}
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
