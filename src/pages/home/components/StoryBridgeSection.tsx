export default function StoryBridgeSection() {
  return (
    <section
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 24px',
      }}
    >
      {/* 배경 이미지 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/스파로스원 정의_중간.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* 검정 오버레이 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
        }}
      />
      {/* 콘텐츠 — 오버레이 위 */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2
          style={{
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.1,
            margin: '0 0 32px',
          }}
        >
          <span style={{ color: '#ffffff' }}>All-in-One. </span>
          <span style={{ color: '#5BA4F5' }}>One for All.</span>
        </h2>

        <div
          style={{
            width: '52px',
            height: '3px',
            background: '#5BA4F5',
            borderRadius: '2px',
            marginBottom: '48px',
          }}
        />

        <p
          style={{
            fontSize: '30px',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: 1.4,
          }}
        >
          모든 것을 하나로, 모두의 기준으로
        </p>
        <p
          style={{
            fontSize: '24px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.70)',
            marginBottom: '32px',
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
          }}
        >
          {`스파로스원은 설계부터 보안, 운영까지 하나로 연결한\n완성형 프라이빗 클라우드입니다.`}
        </p>
        <p
          style={{
            fontSize: '24px',
            fontWeight: 500,
            color: '#5BA4F5',
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
          }}
        >
          {`더 단순하게, 더 안정적으로\n그리고 더 합리적인 비용으로`}
        </p>
      </div>
    </section>
  );
}
