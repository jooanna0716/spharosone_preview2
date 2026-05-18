import { useState } from 'react';

const COMPARISON_ROWS = [
  { label: '초기 비용', capex: '대규모 하드웨어 구매', opex: '선납금 0원' },
  { label: '도입 기간', capex: '수개월 구축 소요', opex: '빠른 도입 시작' },
  { label: '운영 방식', capex: '직접 구축·관리', opex: '구독형 + 관제 포함' },
  { label: '계약 조건', capex: '장기 고정 계약', opex: '유연한 옵션 선택' },
  { label: '규모 확장', capex: '추가 투자 필요', opex: '기능 즉시 추가·조정' },
  { label: '위약금', capex: '조기 해지 시 발생', opex: '위약금 0원' },
];

const CASH_FLOW = [
  { period: '초기',    capex: 75,  opex: 12, diff: -63 },
  { period: '6개월',  capex: 78,  opex: 24, diff: -54 },
  { period: '1년',    capex: 82,  opex: 36, diff: -46 },
  { period: '18개월', capex: 86,  opex: 48, diff: -38 },
  { period: '2년',    capex: 90,  opex: 56, diff: -34 },
  { period: '30개월', capex: 95,  opex: 64, diff: -31 },
  { period: '3년',    capex: 100, opex: 72, diff: -28 },
];

const TCO_DATA = [
  { label: '하드웨어',  capex: 32, opex: 0,  saving: 100 },
  { label: '소프트웨어', capex: 23, opex: 0,  saving: 100 },
  { label: '구축/전환', capex: 18, opex: 8,  saving: 56  },
  { label: '유지보수',  capex: 15, opex: 12, saving: 20  },
];

const CONTRACT_OPTIONS = [
  {
    tag: '구독',
    title: '월 단위 구독',
    period: '월 · 12 · 24 · 36개월',
    desc: '기본 월 단위 구독에서 12/24/36개월 장기 옵션까지 비즈니스 계획에 맞는 다양한 계약 기간을 선택할 수 있습니다.',
    bg: '#5BA4F5',
  },
  {
    tag: '혜택',
    title: '자체 프로모션',
    period: '스파로스원 고객은 특별하게',
    desc: '초기 도입 프로모션, 계약 기간별 차등 할인, 서비스 추가 시 결합 할인 등 다양한 비용 절감 혜택을 누릴 수 있습니다.',
    bg: '#1a1a1a',
  },
  {
    tag: '편의',
    title: '간소화된 관리',
    period: '변경 · 연장 · 해지',
    desc: '서비스 변경, 계약 연장, 해지 프로세스가 간소화되어 복잡한 절차 없이 계약 조건을 관리할 수 있습니다.',
    bg: '#1a1a1a',
  },
];

function CheckIcon({ pass }: { pass: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        background: pass ? '#5BA4F5' : 'rgba(0,0,0,0.12)',
        flexShrink: 0,
        marginRight: '10px',
      }}
    >
      {pass ? (
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
          <path d="M1 4L4.5 7.5L11 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 2L8 8M8 2L2 8" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

/* ── 슬라이드1: CAPEX vs OPEX 카드 비교 ── */
function CompareSlide() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', height: '100%' }}>
      {/* CAPEX */}
      <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#888', background: 'rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: '20px' }}>기존 방식</span>
          <span style={{ fontSize: '24px', fontWeight: 700, color: '#aaaaaa' }}>CAPEX</span>
        </div>
        <p style={{ fontSize: 'var(--fs-body)', color: '#777777', lineHeight: 1.6, margin: 0 }}>
          서버·스토리지를 직접 구매하고 데이터센터를 구축하는 전통적인 자본 지출 방식입니다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {COMPARISON_ROWS.map((row) => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center' }}>
              <CheckIcon pass={false} />
              <span style={{ fontSize: '20px', color: '#888888' }}>
                <span style={{ fontWeight: 600, color: '#666666', marginRight: '6px' }}>{row.label}:</span>
                {row.capex}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* OPEX */}
      <div style={{ background: '#1f2a3a', borderRadius: '20px', padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 4px 32px rgba(91,164,245,0.25)', border: '2px solid #5BA4F5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff', background: '#5BA4F5', padding: '4px 12px', borderRadius: '20px' }}>추천</span>
          <span style={{ fontSize: 'var(--fs-subtitle)', fontWeight: 700, color: '#f0f0f0' }}>Spharos One (OPEX)</span>
        </div>
        <p style={{ fontSize: '20px', color: '#aaaaaa', lineHeight: 1.6, margin: 0 }}>
          초기 투자 없이 사용한 만큼 지불하는 구독형 운영 지출 방식으로 유연하게 클라우드를 운영합니다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {COMPARISON_ROWS.map((row) => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center' }}>
              <CheckIcon pass={true} />
              <span style={{ fontSize: 'var(--fs-body)', color: '#f0f0f0' }}>
                <span style={{ fontWeight: 600, color: '#5BA4F5', marginRight: '6px' }}>{row.label}:</span>
                {row.opex}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 공통 범례 ── */
function ChartLegend() {
  return (
    <div style={{ display: 'flex', gap: '16px', margin: '8px 0 10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: '20px', height: '3px', background: '#AAAAAA', borderRadius: '2px' }} />
        <span style={{ fontSize: '12px', color: '#888', fontWeight: 600 }}>CAPEX</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: '20px', height: '3px', background: '#5BA4F5', borderRadius: '2px' }} />
        <span style={{ fontSize: '12px', color: '#5BA4F5', fontWeight: 600 }}>OPEX (Spharos One)</span>
      </div>
    </div>
  );
}

/* ── 슬라이드2: 왼쪽 라인 차트 + 오른쪽 막대 그래프 ── */
function CashFlowSlide() {
  const SVG_H = 200; // 양쪽 공통 SVG 높이

  // ── 왼쪽 라인 차트 ──
  const LW = 420;
  const lPL = 44, lPR = 12, lPT = 12, lPB = 32;
  const lCW = LW - lPL - lPR;
  const lCH = SVG_H - lPT - lPB;
  const n = CASH_FLOW.length;
  const xOf = (i: number) => lPL + (i / (n - 1)) * lCW;
  const yOf = (v: number) => lPT + lCH - (v / 110) * lCH;
  const capexPts = CASH_FLOW.map((d, i) => `${xOf(i)},${yOf(d.capex)}`).join(' ');
  const opexPts  = CASH_FLOW.map((d, i) => `${xOf(i)},${yOf(d.opex)}`).join(' ');
  const areaD = [
    `M${xOf(0)},${yOf(CASH_FLOW[0].capex)}`,
    ...CASH_FLOW.map((d, i) => `L${xOf(i)},${yOf(d.capex)}`),
    `L${xOf(n - 1)},${yOf(CASH_FLOW[n - 1].opex)}`,
    ...[...CASH_FLOW].reverse().map((d, i) => `L${xOf(n - 1 - i)},${yOf(d.opex)}`),
    'Z',
  ].join('');

  // ── 오른쪽 막대 그래프 ──
  const BW = 380;
  // 상단 여백을 넉넉히 줘서 절감률 태그 표시
  const bPL = 40, bPR = 12, bPT = 44, bPB = 32;
  const bCW = BW - bPL - bPR;
  const bCH = SVG_H - bPT - bPB;
  const maxVal = 36;
  const groupW = bCW / TCO_DATA.length;
  const barW = 26, barGap = 6;
  const capexX = (i: number) => bPL + i * groupW + (groupW - barW * 2 - barGap) / 2;
  const opexX  = (i: number) => capexX(i) + barW + barGap;
  const groupCx = (i: number) => bPL + i * groupW + groupW / 2;
  const barTop = (v: number) => bPT + bCH - (v / maxVal) * bCH;
  const barHt  = (v: number) => (v / maxVal) * bCH;

  const containerStyle: React.CSSProperties = {
    flex: 1,
    background: '#161b25',
    borderRadius: '16px',
    padding: '16px 14px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(91,164,245,0.15)',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'stretch' }}>

      {/* 왼쪽 */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ margin: 0, fontSize: 'var(--fs-subtitle)', fontWeight: 700, color: '#f0f0f0' }}>현금흐름 분석</p>
        <ChartLegend />
        <div style={containerStyle}>
          <svg width="100%" viewBox={`0 0 ${LW} ${SVG_H}`} style={{ overflow: 'visible' }}>
            <path d={areaD} fill="rgba(91,164,245,0.13)" />
            {[0, 25, 50, 75, 100].map(v => (
              <g key={v}>
                <line x1={lPL} y1={yOf(v)} x2={LW - lPR} y2={yOf(v)} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 3" />
                <text x={lPL - 5} y={yOf(v) + 4} textAnchor="end" fontSize="11" fill="#666">{v}%</text>
              </g>
            ))}
            <polyline points={capexPts} fill="none" stroke="#AAAAAA" strokeWidth="2" strokeLinejoin="round" />
            <polyline points={opexPts}  fill="none" stroke="#5BA4F5" strokeWidth="2" strokeLinejoin="round" />
            {CASH_FLOW.map((d, i) => <circle key={`cp${i}`} cx={xOf(i)} cy={yOf(d.capex)} r="3.5" fill="#AAAAAA" />)}
            {CASH_FLOW.map((d, i) => <circle key={`op${i}`} cx={xOf(i)} cy={yOf(d.opex)}  r="3.5" fill="#5BA4F5" />)}
            {CASH_FLOW.map((d, i) => (
              <text key={`xl${i}`} x={xOf(i)} y={SVG_H - 4} textAnchor="middle" fontSize="11" fill="#666">{d.period}</text>
            ))}
          </svg>
        </div>
      </div>

      {/* 오른쪽 */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ margin: 0, fontSize: 'var(--fs-subtitle)', fontWeight: 700, color: '#f0f0f0' }}>3년 TCO 분석</p>
        <ChartLegend />
        <div style={containerStyle}>
          <svg width="100%" viewBox={`0 0 ${BW} ${SVG_H}`} style={{ overflow: 'visible' }}>
            {/* 그리드 */}
            {[0, 10, 20, 30].map((v) => (
              <g key={v}>
                <line x1={bPL} y1={barTop(v)} x2={BW - bPR} y2={barTop(v)} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 3" />
                <text x={bPL - 5} y={barTop(v) + 4} textAnchor="end" fontSize="11" fill="#666">{v}%</text>
              </g>
            ))}
            {/* X 축 */}
            <line x1={bPL} y1={barTop(0)} x2={BW - bPR} y2={barTop(0)} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

            {TCO_DATA.map((d, i) => {
              const cx = groupCx(i);
              const tagW = 68, tagH = 20, tagR = 10;
              const tagX = cx - tagW / 2;
              const tagY = 4;
              return (
                <g key={d.label}>
                  {/* 절감률 태그 (그래프 중간 상단) */}
                  <rect x={tagX} y={tagY} width={tagW} height={tagH} rx={tagR}
                    fill="rgba(91,164,245,0.12)"
                    stroke="#5BA4F5" strokeWidth="1" />
                  <text x={cx} y={tagY + 13} textAnchor="middle" fontSize="11" fontWeight="800"
                    fill="#5BA4F5">
                    -{d.saving}% 절감
                  </text>

                  {/* CAPEX 바 */}
                  <rect x={capexX(i)} y={barTop(d.capex)} width={barW} height={barHt(d.capex)} fill="#BBBBBB" rx="3" />
                  <text x={capexX(i) + barW / 2} y={barTop(d.capex) - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#888">{d.capex}%</text>

                  {/* OPEX 바 */}
                  {d.opex > 0 ? (
                    <>
                      <rect x={opexX(i)} y={barTop(d.opex)} width={barW} height={barHt(d.opex)} fill="#5BA4F5" rx="3" />
                      <text x={opexX(i) + barW / 2} y={barTop(d.opex) - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#5BA4F5">{d.opex}%</text>
                    </>
                  ) : (
                    <>
                      <rect x={opexX(i)} y={barTop(0) - 3} width={barW} height={3} fill="#5BA4F5" rx="2" />
                      <text x={opexX(i) + barW / 2} y={barTop(0) - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#5BA4F5">0%</text>
                    </>
                  )}

                  {/* X 레이블 */}
                  <text x={cx} y={SVG_H - 4} textAnchor="middle" fontSize="11" fill="#888888" fontWeight="600">{d.label}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── 메인 컴포넌트 ── */
export default function PricingModelSection() {
  const [slide, setSlide] = useState(0);

  return (
    <section style={{ background: '#0d0d0d', padding: 'clamp(60px, 10vh, 160px) 0' }}>
      <div style={{ width: '100%', padding: '0 120px' }}>

        {/* 헤더 */}
        <div style={{ marginBottom: '64px' }}>
          <span style={{ fontSize: 'var(--fs-label)', color: '#5BA4F5', fontWeight: 600 }}>비즈니스 혜택</span>
          <h2 style={{ fontSize: 'var(--fs-display)', fontWeight: 800, color: '#f0f0f0', lineHeight: 1.2, margin: '8px 0 0' }}>
            선납금 0원, 위약금 0원<br />구독으로 비즈니스 혜택을 누리세요
          </h2>
        </div>

        {/* 캐러셀 */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px' }}>
          <div
            style={{
              display: 'flex',
              transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
              transform: `translateX(-${slide * 100}%)`,
            }}
          >
            {/* 슬라이드 1 */}
            <div style={{ minWidth: '100%', padding: '4px' }}>
              <CompareSlide />
            </div>
            {/* 슬라이드 2 */}
            <div style={{ minWidth: '100%', padding: '4px' }}>
              <CashFlowSlide />
            </div>
          </div>
        </div>

        {/* 도트 네비게이션 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              style={{
                width: i === slide ? '32px' : '10px',
                height: '10px',
                borderRadius: '5px',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                background: i === slide ? '#5BA4F5' : 'rgba(255,255,255,0.18)',
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* 구분선 */}
        <div style={{ width: '52px', height: '3px', background: '#5BA4F5', borderRadius: '2px', margin: '72px 0 48px' }} />

        {/* 유연한 계약 옵션 */}
        <h3 style={{ fontSize: 'var(--fs-heading)', fontWeight: 700, color: '#f0f0f0', margin: '0 0 32px', lineHeight: 1.3 }}>
          유연한 계약 옵션
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {CONTRACT_OPTIONS.map((opt) => {
            const isDark = opt.bg === '#5BA4F5';
            return (
              <div
                key={opt.title}
                style={{
                  background: opt.bg,
                  borderRadius: '20px',
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: isDark ? '0 8px 32px rgba(91,164,245,0.35)' : '0 2px 16px rgba(0,0,0,0.07)',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: isDark ? '#fff' : '#5BA4F5',
                    background: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(91,164,245,0.12)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    alignSelf: 'flex-start',
                  }}
                >
                  {opt.tag}
                </span>
                <p style={{ fontSize: 'var(--fs-subtitle)', fontWeight: 700, color: '#f0f0f0', margin: 0 }}>
                  {opt.title}
                </p>
                <p style={{ fontSize: '20px', fontWeight: 600, color: isDark ? 'rgba(255,255,255,0.85)' : '#5BA4F5', margin: 0 }}>
                  {opt.period}
                </p>
                <p style={{ fontSize: 'var(--fs-body)', color: isDark ? 'rgba(255,255,255,0.80)' : '#aaaaaa', lineHeight: 1.7, margin: 0 }}>
                  {opt.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
