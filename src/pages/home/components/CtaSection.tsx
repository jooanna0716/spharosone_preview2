import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function CtaSection() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section style={{ background: '#0d0d0d', padding: 'clamp(60px, 10vh, 140px) clamp(20px, 4vw, 60px)' }}>

      {/* 카드 */}
      <div
        style={{
          position: 'relative',
          borderRadius: '28px',
          overflow: 'hidden',
          background: '#08080c',
        }}
      >
        {/* 멀티컬러 글로우 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `
              radial-gradient(ellipse 70% 100% at -8% 115%,  rgba(130,20,255,0.95) 0%, rgba(100,10,220,0.55) 35%, transparent 65%),
              radial-gradient(ellipse 50% 70%  at 22%  110%, rgba(48,96,255,0.80)  0%, rgba(40,75,235,0.40) 40%, transparent 62%),
              radial-gradient(ellipse 38% 55%  at 46%  108%, rgba(0,210,240,0.65)  0%, rgba(0,175,220,0.30) 42%, transparent 60%),
              radial-gradient(ellipse 38% 55%  at 54%  108%, rgba(0,230,195,0.55)  0%, rgba(0,200,175,0.25) 42%, transparent 60%),
              radial-gradient(ellipse 50% 70%  at 78%  110%, rgba(48,96,255,0.80)  0%, rgba(40,75,235,0.40) 40%, transparent 62%),
              radial-gradient(ellipse 70% 100% at 108% 115%, rgba(130,20,255,0.95) 0%, rgba(100,10,220,0.55) 35%, transparent 65%)
            `,
          }}
        />

        {/* 본문 */}
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(60px, 12vh, 140px) clamp(32px, 8.33vw, 120px)' }}>
          <p
            className="font-semibold leading-tight acc"
            style={{ fontSize: 'var(--fs-label)', marginBottom: '20px' }}
          >
            프라이빗 클라우드의 새로운 기준 Spharos One
          </p>
          <h2
            className="font-extrabold text-white leading-tight"
            style={{ fontSize: 'clamp(28px, 4.5vw, 72px)', marginBottom: '16px' }}
          >
            전문 컨설턴트의 상담을 받아보세요
          </h2>
          <h3
            className="font-semibold leading-tight"
            style={{ fontSize: 'clamp(16px, 2.2vw, 36px)', color: 'rgba(255,255,255,0.75)', marginBottom: '48px' }}
          >
            설계·운영·보안까지 최적의 서비스를 제안합니다
          </h3>
          <button
            type="button"
            onClick={() => setPopupOpen(true)}
            className="inline-flex items-center gap-3 cursor-pointer group rounded-full font-semibold transition-all hover:opacity-90"
            style={{ background: '#5BA4F5', color: '#fff', fontSize: 'clamp(14px, 1.1vw, 18px)', padding: '14px 32px' }}
          >
            문의하기
            <span
              className="flex items-center justify-center rounded-full transition-transform group-hover:translate-x-1"
              style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.2)' }}
            >
              <i className="ri-arrow-right-line text-white text-base" />
            </span>
          </button>
        </div>

      </div>

      {popupOpen && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="rounded-2xl p-8 w-[440px] flex flex-col gap-5 shadow-xl"
            style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold" style={{ fontSize: '18px', color: '#f0f0f0' }}>문의하기</h3>
              <button
                type="button"
                onClick={() => setPopupOpen(false)}
                className="w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent border-none"
                style={{ color: '#777777' }}
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <p style={{ fontSize: '18px', color: '#aaaaaa' }}>원하시는 문의 방식을 선택해주세요.</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:jooanna@shinsegae.com?subject=[Spharos One] 서비스 문의&body=1. 이름 : %0D%0A2. 연락처 : %0D%0A3. 이메일 : %0D%0A4. 회사 : %0D%0A5. 직급 : %0D%0A6. 직무 : %0D%0A7. 문의 유형 [메인서비스 / 라이선스 / 부가서비스 중 선택] : %0D%0A8. 문의 내용 : %0D%0A%0D%0A※ 문의 답변을 목적으로 이름, 연락처, 이메일, 회사명, 직급, 직무, 문의 내용을 수집하고 있습니다. 수집 후 1개월 간 보관되며 이후 안전하게 파기됩니다."
                onClick={() => setPopupOpen(false)}
                className="w-full py-3 text-white font-semibold rounded-xl text-center cursor-pointer whitespace-nowrap transition-opacity hover:opacity-90"
                style={{ background: '#5BA4F5', fontSize: '18px' }}
              >
                <i className="ri-mail-line mr-1.5"></i>
                메일로 문의하기
              </a>
              <a
                href="https://shinsegae-inc.com/inquires.do"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setPopupOpen(false)}
                className="w-full py-3 font-semibold rounded-xl text-center cursor-pointer whitespace-nowrap transition-opacity hover:opacity-80"
                style={{ fontSize: '18px', background: '#2a2a2a', color: '#f0f0f0', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <i className="ri-article-line mr-1.5"></i>
                게시판 문의하기
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
