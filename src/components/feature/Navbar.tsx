import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';


const NAV_LINKS = [
  { label: '소개', path: '/' },
  { label: '주요 서비스', path: '/services' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isServices = location.pathname === '/services';
  const transparent = (isHome || isServices) && !scrolled;

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => {
      if (isServices) {
        setScrolled(window.scrollY > 80);
        return;
      }
      const showcase = document.getElementById('showcase-section');
      const threshold = showcase ? showcase.offsetTop : window.innerHeight * 4 + 80;
      setScrolled(window.scrollY >= threshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  return (
    <>
    <nav
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background: transparent ? 'transparent' : 'rgba(13,13,13,0.85)',
        backdropFilter: transparent ? 'none' : 'blur(12px)',
        WebkitBackdropFilter: transparent ? 'none' : 'blur(12px)',
        borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: transparent ? 'none' : '0 1px 8px rgba(0,0,0,0.3)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      <div className="w-full px-6 md:px-[120px] flex items-end justify-between" style={{ height: '72px', paddingBottom: '14px' }}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img
            src="/images/Spharos-One-Black.png"
            alt="Spharos One Logo"
            className="h-10 w-auto object-contain"
            style={{ transition: 'opacity 0.3s ease' }}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors cursor-pointer whitespace-nowrap${isActive ? ' acc' : ''}`}
                style={{
                  fontSize: '20px',
                  color: isActive ? undefined : (transparent ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.85)'),
                  fontWeight: isActive ? '700' : '400',
                  transition: 'color 0.3s ease',
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setPopupOpen(true)}
            className="transition-all cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold border-none"
            style={{
              fontSize: '16px',
              background: transparent ? 'rgba(255,255,255,0.15)' : '#5BA4F5',
              color: '#ffffff',
              border: transparent ? '1px solid rgba(255,255,255,0.4)' : 'none',
              transition: 'background 0.3s ease',
            }}
          >
            문의하기
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden cursor-pointer w-8 h-8 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <i className={`${menuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}
            style={{ color: '#ffffff' }}
          ></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4 border-t" style={{ background: 'rgba(13,13,13,0.95)', borderColor: 'rgba(255,255,255,0.08)' }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`cursor-pointer whitespace-nowrap${location.pathname === link.path ? ' acc' : ''}`}
              style={{
                fontSize: '16px',
                color: location.pathname === link.path ? undefined : 'rgba(255,255,255,0.85)',
                fontWeight: location.pathname === link.path ? '700' : '400',
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setPopupOpen(true)}
            className="cursor-pointer whitespace-nowrap bg-transparent border-none text-left"
            style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', fontWeight: '400' }}
          >
            문의하기
          </button>
        </div>
      )}

    </nav>

      {/* Contact Popup */}
      {popupOpen && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="rounded-2xl p-8 w-[calc(100vw-32px)] max-w-[440px] flex flex-col gap-5 shadow-xl"
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
    </>
  );
}
