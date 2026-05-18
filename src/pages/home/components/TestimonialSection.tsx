import { useState, useEffect, useRef } from 'react';

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

const GAP = 12;
const NAVBAR_H = 64;
const ACTIVE_BLUE = '#5BA4F5';

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const [leftOffset, setLeftOffset] = useState(0);
  const [mainCardWidth, setMainCardWidth] = useState(0);
  const [sideCardWidth, setSideCardWidth] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isArrowScrollingRef = useRef(false);

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const px = vw >= 768 ? 110 : 24;

      const containerLeft = px;
      const containerRight = vw - px;
      const contentW = containerRight - containerLeft;

      // 사이드 카드 2장 폭 = 컨텐츠 폭의 약 18% (작은 미리보기)
      const sideW = Math.floor((contentW * 0.18 - GAP) / 2);
      const sideArea = sideW * 2 + GAP;
      const mainW = contentW - sideArea - GAP;

      setLeftOffset(containerLeft);
      setMainCardWidth(mainW);
      setSideCardWidth(sideW);
    };

    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // 스크롤 → 카드 인덱스 계산 (화살표 클릭 직후엔 무시)
  useEffect(() => {
    const onScroll = () => {
      if (isArrowScrollingRef.current) return;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const per = window.innerHeight;
      if (scrolled < 0) {
        setCurrent(0);
        return;
      }
      const idx = Math.min(
        Math.max(Math.floor(scrolled / per), 0),
        TESTIMONIALS.length - 1
      );
      setCurrent(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 화살표: 카드 변경 + 스크롤 위치도 동기화 (스크롤 핸들러 일시 lock)
  const goTo = (idx: number) => {
    isArrowScrollingRef.current = true;
    setCurrent(idx);
    const section = sectionRef.current;
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY + idx * window.innerHeight;
      window.scrollTo({ top, behavior: 'auto' });
    }
    // 다음 스크롤 이벤트가 끝나기를 기다린 후 lock 해제
    window.setTimeout(() => {
      isArrowScrollingRef.current = false;
    }, 250);
  };
  const prev = () => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((current + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];
  const nextItems = [1, 2].map((offset) => TESTIMONIALS[(current + offset) % TESTIMONIALS.length]);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${TESTIMONIALS.length * 100}vh`, position: 'relative', background: '#F0F0F0' }}
    >
      <div
        className="sticky flex flex-col overflow-hidden"
        style={{ top: `${NAVBAR_H}px`, height: `calc(100vh - ${NAVBAR_H}px)`, background: '#F0F0F0' }}
      >

      {/* 헤더 */}
      <div className="flex-shrink-0 px-6 md:px-[110px] pb-8 w-full" style={{ paddingTop: '80px' }}>
        <div className="text-left">
          <span
            className="inline-block font-bold mb-3"
            style={{ color: ACTIVE_BLUE, fontSize: 'clamp(18px, 2vw, 30px)' }}
          >
            기대효과
          </span>
          <h2 className="font-extrabold leading-tight" style={{ color: '#111111', fontSize: 'clamp(28px, 4vw, 60px)' }}>
            현장의 고민을 확신으로
          </h2>
        </div>
      </div>

      {/* 슬라이더 - 모바일 */}
      <div className="block md:hidden relative w-full overflow-hidden" style={{ flex: 4, minHeight: 0 }}>
        <img
          key={current}
          src={t.image}
          alt={t.company}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-x-4 top-8 bottom-16 bg-[#EFF9F6]/85 backdrop-blur-sm rounded-2xl p-6 flex flex-col">
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-[16px] font-bold text-gray-900 leading-none mb-2">{t.company}</p>
            <p className="text-[15px] text-gray-700 leading-snug">{t.quote}</p>
            <div className="h-6 flex-shrink-0" />
            <div className="text-[20px] font-extrabold text-gray-900 leading-snug">
              {t.highlights.map((h, i) => (
                <p key={i}>
                  {h.mark ? (
                    <mark className="bg-blue-200 text-gray-900 px-0.5">{h.text}</mark>
                  ) : (
                    h.text
                  )}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="h-[3px] rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: i === current ? '32px' : '12px',
                    background: i === current ? ACTIVE_BLUE : '#d1d5db',
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                <i className="ri-arrow-left-line text-sm" />
              </button>
              <button
                onClick={next}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                <i className="ri-arrow-right-line text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden" style={{ flex: 1, flexShrink: 0 }} />

      {/* 슬라이더 - 데스크탑 */}
      <div
        className="hidden md:flex items-stretch"
        style={{
          flex: 4,
          paddingLeft: leftOffset > 0 ? `${leftOffset}px` : '110px',
          paddingRight: leftOffset > 0 ? `${leftOffset}px` : '110px',
          gap: `${GAP}px`,
          minHeight: 0,
          paddingBottom: '0',
        }}
      >
        <div
          className="flex-shrink-0 flex overflow-hidden rounded-2xl bg-[#E5EBF4]"
          style={{
            width: mainCardWidth > 0 ? `${mainCardWidth}px` : '700px',
          }}
        >
          <div className="relative overflow-hidden flex-shrink-0 w-[42%]">
            <img
              key={current}
              src={t.image}
              alt={t.company}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="flex-1 flex flex-col justify-between px-8 py-6 md:px-10 md:py-8">
            <div className="flex-1 flex flex-col justify-center">
              <p className="font-bold text-gray-900 leading-none mb-2" style={{ fontSize: 'clamp(16px, 1.6vw, 24px)' }}>{t.company}</p>
              <p className="text-gray-900 leading-snug mb-3" style={{ fontSize: 'clamp(14px, 1.5vw, 22px)' }}>
                {t.quote}
              </p>
              <div className="h-3" />
              <div className="font-extrabold text-gray-900 leading-relaxed" style={{ fontSize: 'clamp(18px, 2vw, 28px)' }}>
                {t.highlights.map((h, i) => (
                  <p key={i}>
                    {h.mark ? (
                      <mark className="bg-blue-200 text-gray-900 px-0.5">{h.text}</mark>
                    ) : (
                      h.text
                    )}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="h-[3px] rounded-full transition-all duration-300 cursor-pointer"
                      style={{
                        width: i === current ? '96px' : '16px',
                        background: i === current ? ACTIVE_BLUE : '#d1d5db',
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    onClick={prev}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <i className="ri-arrow-left-line text-sm" />
                  </button>
                  <button
                    onClick={next}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition cursor-pointer"
                  >
                    <i className="ri-arrow-right-line text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 사이드 이미지들 */}
        {nextItems.map((item, i) => (
          <div
            key={`${current}-next-${i}`}
            onClick={() => goTo((current + 1 + i) % TESTIMONIALS.length)}
            className="flex-shrink-0 rounded-2xl overflow-hidden relative cursor-pointer group"
            style={{
              width: sideCardWidth > 0 ? `${sideCardWidth}px` : '88px',
            }}
          >
            <img
              src={item.image}
              alt={item.company}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>
      <div className="hidden md:block" style={{ height: '80px', flexShrink: 0 }} />
      </div>
    </section>
  );
}
