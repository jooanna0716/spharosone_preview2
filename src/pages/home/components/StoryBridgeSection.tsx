export default function StoryBridgeSection() {
  return (
    <section
      style={{
        height: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '80px 24px',
      }}
    >
      {/* 블롭 키프레임 */}
      <style>{`
        @keyframes bB1 {
          0%,100% { transform: translate(0,    0)   scale(1.00); }
          25%     { transform: translate(7vw, -5vh) scale(1.12); }
          60%     { transform: translate(-5vw, 8vh) scale(0.92); }
        }
        @keyframes bB2 {
          0%,100% { transform: translate(0,    0)    scale(1.00); }
          35%     { transform: translate(-8vw, 6vh)  scale(1.10); }
          70%     { transform: translate(6vw, -7vh)  scale(0.90); }
        }
        @keyframes bB3 {
          0%,100% { transform: translate(0,    0)    scale(1.00); }
          40%     { transform: translate(9vw,  6vh)  scale(1.14); }
          75%     { transform: translate(-6vw,-5vh)  scale(0.94); }
        }
        @keyframes bB4 {
          0%,100% { transform: translate(0,    0)    scale(1.00); }
          30%     { transform: translate(-9vw, 5vh)  scale(1.08); }
          65%     { transform: translate(7vw, -6vh)  scale(0.92); }
        }
        @keyframes bB5 {
          0%,100% { transform: translate(0,    0)    scale(1.00); }
          50%     { transform: translate(-5vw,-7vh)  scale(1.10); }
        }
      `}</style>

      {/* 텍스트 중심 그라디언트 블롭 */}
      <div style={{ position: 'absolute', left: '-5%',  top: '5%', width: '70vw', height: '90vh',
        background: 'radial-gradient(ellipse at center, rgba(98,0,204,0.75) 0%, rgba(80,0,180,0.45) 38%, transparent 68%)',
        animation: 'bB1 7s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', left: '10%', top: '0%',  width: '65vw', height: '85vh',
        background: 'radial-gradient(ellipse at center, rgba(170,50,255,0.70) 0%, rgba(140,30,240,0.42) 38%, transparent 66%)',
        animation: 'bB2 9s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', left: '20%', top: '10%', width: '60vw', height: '80vh',
        background: 'radial-gradient(ellipse at center, rgba(48,96,255,0.72) 0%, rgba(40,75,235,0.44) 40%, transparent 65%)',
        animation: 'bB3 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', right: '-5%', top: '5%', width: '70vw', height: '90vh',
        background: 'radial-gradient(ellipse at center, rgba(0,210,240,0.70) 0%, rgba(0,175,220,0.42) 35%, transparent 64%)',
        animation: 'bB4 6s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', left: '15%', bottom: '0%', width: '65vw', height: '80vh',
        background: 'radial-gradient(ellipse at center, rgba(0,230,195,0.60) 0%, rgba(0,200,175,0.35) 38%, transparent 65%)',
        animation: 'bB5 10s ease-in-out infinite' }} />

      {/* 다크 비녜트 — 가장자리 검정, 중앙 글로우 노출 */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(ellipse 58% 65% at 50% 48%, transparent 18%, rgba(10,10,10,0.55) 52%, rgba(10,10,10,0.90) 72%, #0a0a0a 90%)',
      }} />

      {/* Top fade */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '25%',
          background: 'linear-gradient(to bottom, #0a0a0a, transparent)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Text content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(28px, 4.2vw, 60px)',
            fontWeight: 800,
            lineHeight: 1.1,
            margin: '0 0 32px',
          }}
        >
          <span style={{ color: '#ffffff' }}>All-in-One. </span>
          <span className="acc">One for All.</span>
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
            fontSize: 'clamp(20px, 2.63vw, 38px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '28px',
            lineHeight: 1.3,
          }}
        >
          모든 것을 하나로, 모두의 기준으로
        </p>
        <p
          style={{
            fontSize: 'clamp(14px, 1.73vw, 25px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.70)',
            marginBottom: '24px',
            lineHeight: 1.75,
            whiteSpace: 'pre-line',
          }}
        >
          {`복잡한 인프라와 운영의 기준이 흔들릴 때,\nSpharos 등대가 방향을 밝히고\nOne이 모든 것을 하나로 연결합니다.`}
        </p>
        <p
          className="acc"
          style={{
            fontSize: '33px',
            fontWeight: 400,
            lineHeight: 1.75,
            whiteSpace: 'pre-line',
          }}
        >
          {`스파로스원은 설계부터 보안, 운영까지\n하나로 연결한 완성형 프라이빗 클라우드입니다.`}
        </p>
      </div>

    </section>
  );
}
