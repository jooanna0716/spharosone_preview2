export default function ServiceStructureSection() {
  return (
    <section style={{ background: '#0d0d0d', padding: 'clamp(80px, 13vh, 160px) 0 clamp(80px, 10vh, 140px)' }}>
      <div style={{ width: '100%', padding: '0 120px' }}>

        <div style={{ marginBottom: '56px' }}>
          <span className="section-label acc" style={{ fontSize: 'var(--fs-label)' }}>서비스 구조</span>
          <h2 className="font-extrabold" style={{ fontSize: 'var(--fs-display)', color: '#f0f0f0', lineHeight: 1.2 }}>
            모든 역량을 하나로 연결한 서비스
          </h2>
        </div>

        <img
          src="/images/서비스구조.png"
          alt="서비스 구조"
          style={{ width: '100%', maxHeight: '480px', objectFit: 'contain', display: 'block' }}
        />

      </div>
    </section>
  );
}
