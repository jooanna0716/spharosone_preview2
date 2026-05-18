export default function AllInOneSection() {
  return (
    <section
      style={{
        background: '#0a0a0a',
        padding: '60px 0',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: '24px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          color: 'rgba(255,255,255,0.45)',
          marginBottom: '24px',
        }}
      >
        Spharos One
      </p>
      <h2
        style={{
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 800,
          lineHeight: 1.15,
          margin: '0 0 20px',
        }}
      >
        <span style={{ color: '#ffffff' }}>All-in-One. </span>
        <span className="acc">One for All.</span>
      </h2>
      <p
        style={{
          fontSize: '30px',
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 400,
        }}
      >
        하나의 플랫폼, 모두를 위한 클라우드
      </p>
    </section>
  );
}
