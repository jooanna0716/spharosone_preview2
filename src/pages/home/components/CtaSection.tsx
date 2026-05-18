import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function CtaSection() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/images/문의하기.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full px-6 md:px-[110px] py-48 md:py-64">
        <p
          className="font-semibold leading-tight"
          style={{ fontSize: '24px', color: '#5BA4F5' }}
        >
          프라이빗 클라우드의 새로운 기준 Spharos One
        </p>
        <div className="mt-5">
          <h2
            className="font-extrabold text-white leading-tight"
            style={{ fontSize: '60px' }}
          >
            전문 컨설턴트의 상담을 받아보세요
          </h2>
          <h3
            className="mt-3 font-semibold leading-tight"
            style={{ fontSize: 'clamp(22px, 3.125vw, 40px)', color: '#ffffff' }}
          >
            설계·운영·보안까지 최적의 서비스를 제안합니다
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setPopupOpen(true)}
          className="inline-flex items-center gap-3 mt-10 cursor-pointer group rounded-full px-8 py-4 font-semibold transition-all hover:opacity-90"
          style={{ background: '#5BA4F5', color: '#fff', fontSize: '30px' }}
        >
          문의하기
          <span
            className="flex items-center justify-center rounded-full transition-transform group-hover:translate-x-1"
            style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.2)' }}
          >
            <i className="ri-arrow-right-line text-white text-base"></i>
          </span>
        </button>
      </div>

      {popupOpen && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 w-[440px] flex flex-col gap-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900" style={{ fontSize: '24px' }}>문의하기</h3>
              <button
                type="button"
                onClick={() => setPopupOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <p className="text-gray-500" style={{ fontSize: '24px' }}>원하시는 문의 방식을 선택해주세요.</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:jooanna@shinsegae.com?subject=[Spharos One] 서비스 문의&body=1. 이름 : %0D%0A2. 연락처 : %0D%0A3. 이메일 : %0D%0A4. 회사 : %0D%0A5. 직급 : %0D%0A6. 직무 : %0D%0A7. 문의 유형 [메인서비스 / 라이선스 / 부가서비스 중 선택] : %0D%0A8. 문의 내용 : %0D%0A%0D%0A※ 문의 답변을 목적으로 이름, 연락처, 이메일, 회사명, 직급, 직무, 문의 내용을 수집하고 있습니다. 수집 후 1개월 간 보관되며 이후 안전하게 파기됩니다."
                onClick={() => setPopupOpen(false)}
                className="w-full py-3 text-white font-semibold rounded-xl text-center cursor-pointer whitespace-nowrap transition-opacity hover:opacity-90"
                style={{ background: '#5BA4F5', fontSize: '24px' }}
              >
                <i className="ri-mail-line mr-1.5"></i>
                메일로 문의하기
              </a>
              <a
                href="https://shinsegae-inc.com/inquires.do"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setPopupOpen(false)}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-center cursor-pointer whitespace-nowrap"
                style={{ fontSize: '24px' }}
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
