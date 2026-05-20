export default function BridgeSection() {
  return (
    <section
      style={{
        background: '#0d0d0d',
        padding: '100px 120px 100px',
      }}
    >
      {/* 섹션 제목 */}
      <h2
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'var(--fs-display)',
          fontWeight: 800,
          color: '#FFFFFF',
          lineHeight: 1.2,
          margin: '0 0 48px',
        }}
      >
        복잡한 클라우드, Spharos One으로 끝내세요
      </h2>

      {/* 이미지 */}
      <div
        style={{
          width: '100%',
          height: '200px',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '48px',
        }}
      >
        <img
          src="/images/등대_스파로스.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* 본문 텍스트 */}
      <p
        style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 'var(--fs-label)',
          color: 'rgba(255,255,255,0.80)',
          lineHeight: 1.9,
          margin: 0,
          whiteSpace: 'pre-line',
        }}
      >
        {`복잡한 인프라와 끝없는 선택 속에서도\nSpharos가 방향을 밝히고, One이 모든 것을 연결합니다.\n흩어진 클라우드를 하나의 기준으로 통합해\n더 단순하게, 더 안전하게, 더 강력하게.`}
      </p>
    </section>
  );
}
