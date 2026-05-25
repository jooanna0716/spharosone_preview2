import React, { useState } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

/* ── 모바일 전용 슬라이드1 ── */
function MobileCompareSlide() {
  const [capexOpen, setCapexOpen] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Spharos One — 항상 펼침 */}
      <div style={{ background: '#1a2d45', borderRadius: '16px', border: '2px solid #5BA4F5', overflow: 'hidden' }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(91,164,245,0.2)' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#5BA4F5', background: 'rgba(91,164,245,0.15)', padding: '4px 10px', borderRadius: '20px' }}>추천</span>
          <p style={{ fontSize: '18px', fontWeight: 700, color: '#f0f0f0', margin: '10px 0 0' }}>Spharos One (OPEX)</p>
          <p style={{ fontSize: '13px', color: '#7ab8e8', margin: '6px 0 0', lineHeight: 1.5 }}>초기 투자 없이 사용한 만큼 지불하는 구독형 운영 지출 방식</p>
        </div>
        {COMPARISON_ROWS.map((row, i) => (
          <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '12px 20px', background: i % 2 === 0 ? '#1e3352' : '#192d48', borderTop: '1px solid rgba(91,164,245,0.1)' }}>
            <span style={{ fontSize: '14px', color: '#7ec8f5', fontWeight: 700 }}>{row.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#5BA4F5', fontWeight: 700 }}>✓</span>
              <span style={{ fontSize: '14px', color: '#d8eeff' }}>{row.opex}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CAPEX — 아코디언 */}
      <div style={{ background: '#1c1c1c', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <button
          onClick={() => setCapexOpen(p => !p)}
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '13px', color: '#666', fontWeight: 600, margin: 0 }}>기존 방식 (CAPEX) 보기</p>
          </div>
          <span style={{ color: '#666', fontSize: '14px', display: 'inline-block', transform: capexOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
        </button>
        <div style={{ maxHeight: capexOpen ? '600px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
          {COMPARISON_ROWS.map((row, i) => (
            <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '12px 20px', background: i % 2 === 0 ? '#191919' : '#161616', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '14px', color: '#888', fontWeight: 600 }}>{row.label}</span>
              <span style={{ fontSize: '14px', color: '#666' }}>{row.capex}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

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
  { period: '12개월', capex: 82,  opex: 36, diff: -46 },
  { period: '18개월', capex: 86,  opex: 48, diff: -38 },
  { period: '24개월', capex: 90,  opex: 56, diff: -34 },
  { period: '30개월', capex: 95,  opex: 64, diff: -31 },
  { period: '36개월', capex: 100, opex: 72, diff: -28 },
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
    period: '월 단위부터 장기 계약까지',
    desc: '기본 월 단위 구독에서 12/24/36개월 장기 옵션까지 비즈니스 계획에 맞는 다양한 계약 기간을 선택할 수 있습니다.',
    bg: '#1a1a1a',
  },
  {
    tag: '혜택',
    title: '자체 프로모션',
    period: '스파로스 원 고객은 특별하게',
    desc: '초기 도입 프로모션, 계약 기간별 할인, 서비스 결합 할인 등 다양한 할인 프로모션을 제공합니다.',
    bg: '#1a1a1a',
  },
  {
    tag: '관리',
    title: '간소화된 관리',
    period: '변경 · 연장 · 해지까지 간편하게',
    desc: '서비스 변경, 계약 연장, 해지까지 복잡한 절차 없이 간소하게 계약을 관리할 수 있습니다.',
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
  const { isMobile } = useBreakpoint();

  if (isMobile) return <MobileCompareSlide />;

  const COL = '26% 37% 37%';
  const cellBase: React.CSSProperties = { padding: '13px 24px', display: 'flex', alignItems: 'center' };
  const opexBorder = '3px solid #5BA4F5';
  const lastIdx = COMPARISON_ROWS.length - 1;

  return (
    <div>
    <div style={{ width: '100%', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>

      {/* 헤더 */}
      <div style={{ display: 'grid', gridTemplateColumns: COL }}>
        <div style={{ background: '#111827', padding: '22px 24px' }} />
        {/* CAPEX 헤더 */}
        <div style={{ background: '#1c1c1c', padding: '22px 24px', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: 'var(--fs-subtitle)', fontWeight: 600, color: '#888', marginBottom: '6px' }}>기존 방식</div>
          <div style={{ fontSize: 'var(--fs-subtitle)', fontWeight: 700, color: '#aaaaaa', marginBottom: '8px' }}>CAPEX</div>
          <div style={{ fontSize: 'var(--fs-subtitle)', color: '#606060', lineHeight: 1.5 }}>서버·스토리지를 직접 구매하고<br />데이터센터를 구축하는 자본 지출 방식</div>
        </div>
        {/* OPEX 헤더 */}
        <div style={{ background: '#1a2d45', padding: '22px 24px', borderLeft: opexBorder, borderTop: opexBorder, borderRight: opexBorder }}>
          <div style={{ fontSize: 'var(--fs-subtitle)', fontWeight: 700, color: '#5BA4F5', marginBottom: '6px' }}>추천</div>
          <div style={{ fontSize: 'var(--fs-subtitle)', fontWeight: 700, color: '#f0f0f0', marginBottom: '8px' }}>Spharos One (OPEX)</div>
          <div style={{ fontSize: 'var(--fs-subtitle)', color: '#7ab8e8', lineHeight: 1.5 }}>초기 투자 없이 사용한 만큼 지불하는<br />구독형 운영 지출 방식</div>
        </div>
      </div>

      {/* 데이터 행 */}
      {COMPARISON_ROWS.map((row, i) => (
        <div key={row.label} style={{ display: 'grid', gridTemplateColumns: COL, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {/* 항목명 */}
          <div style={{ ...cellBase, background: '#111827', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <span style={{ fontSize: 'var(--fs-body)', fontWeight: 700, color: '#7ec8f5' }}>{row.label}</span>
          </div>
          {/* CAPEX 값 */}
          <div style={{ ...cellBase, background: i % 2 === 0 ? '#191919' : '#161616', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: 'var(--fs-body)', color: '#777' }}>{row.capex}</span>
          </div>
          {/* OPEX 값 */}
          <div style={{ ...cellBase, background: i % 2 === 0 ? '#1e3352' : '#192d48', borderLeft: opexBorder, borderRight: opexBorder, borderBottom: i === lastIdx ? opexBorder : undefined, gap: '10px' }}>
            <span style={{ color: '#5BA4F5', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 'var(--fs-body)', color: '#d8eeff', fontWeight: 500 }}>{row.opex}</span>
          </div>
        </div>
      ))}
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
        <span style={{ fontSize: '13px', color: '#888', fontWeight: 600 }}>CAPEX</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: '20px', height: '3px', background: '#5BA4F5', borderRadius: '2px' }} />
        <span className="acc" style={{ fontSize: '13px', fontWeight: 600 }}>OPEX (Spharos One)</span>
      </div>
    </div>
  );
}

/* ── 슬라이드2: 왼쪽 라인 차트 + 오른쪽 막대 그래프 ── */
function CashFlowSlide() {
  const { isMobile } = useBreakpoint();
  const SVG_H = 270; // 양쪽 공통 SVG 높이

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
  const BW = 420;
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
    minHeight: '260px',
    background: '#161b25',
    borderRadius: '16px',
    padding: '16px 14px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(91,164,245,0.15)',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '24px', alignItems: 'stretch', flex: 1 }}>

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
                    {d.saving}% 절감
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
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <section style={{ background: '#0d0d0d', padding: 'clamp(60px, 10vh, 160px) 0' }}>
      <div style={{ width: '100%', padding: isMobile ? '0 16px' : isTablet ? '0 clamp(24px, 4vw, 60px)' : '0 120px' }}>

        {/* 헤더 */}
        <div style={{ marginBottom: '64px' }}>
          <span className="acc" style={{ fontSize: 'var(--fs-label)', fontWeight: 600 }}>비용 효율화</span>
          <h2 style={{ fontSize: 'var(--fs-display)', fontWeight: 800, color: '#f0f0f0', lineHeight: 1.2, margin: '8px 0 0' }}>
            선납금 0원, 위약금 0원<br />초기 투자 없이 구독으로 시작하세요
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
            <div style={{ minWidth: '100%', padding: '4px', display: 'flex', flexDirection: 'column' }}>
              <CashFlowSlide />
            </div>
          </div>
        </div>

        {/* 원형 숫자 네비게이션 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '28px' }}>
          {[1, 2].map((num) => {
            const isActive = slide === num - 1;
            return (
              <button
                key={num}
                onClick={() => setSlide(num - 1)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: isActive ? '2px solid #5BA4F5' : '2px solid rgba(255,255,255,0.2)',
                  background: isActive ? '#5BA4F5' : 'transparent',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              >
                {num}
              </button>
            );
          })}
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
                  className={isDark ? undefined : 'acc'}
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: isDark ? '#fff' : undefined,
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
                <p className={isDark ? undefined : 'acc'} style={{ fontSize: '20px', fontWeight: 600, color: isDark ? 'rgba(255,255,255,0.85)' : undefined, margin: 0 }}>
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
