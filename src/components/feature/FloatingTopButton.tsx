import { useState, useEffect } from 'react';

export default function FloatingTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  };

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      className={`fixed right-6 bottom-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gray-900 hover:bg-gray-800 text-white shadow-lg cursor-pointer transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="맨 위로 이동"
      title="맨 위로"
    >
      <i className="ri-arrow-up-line text-xl"></i>
    </button>
  );
}
