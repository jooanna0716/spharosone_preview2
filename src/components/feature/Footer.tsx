import { useState } from 'react';

const familySites = [
  { name: '신세계아이앤씨', url: 'https://shinsegae-inc.com/' },
  { name: 'Spharos Cloud EDI', url: 'https://cedi.spharos.com/intro' },
  { name: 'Spharos Academy', url: 'https://www.spharosacademy.com/' },
  { name: 'Spharos EV', url: 'https://ev.spharos.com/' },
  { name: 'Spharos POS', url: 'https://pos.spharos.com/' },
  { name: 'goodMD', url: 'https://www.good-md.com/index.html' },
  { name: 'eCvan', url: 'https://emart.ecvan.co.kr/pre_ecvan_ui/index.jsp' },
  { name: 'eCtax', url: 'https://www.ectax.co.kr/service' },
  { name: 'eCdocu', url: 'https://www.ecdocu.co.kr/main/mainDocu.do' },
];

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="pt-10 pb-[60px] px-6 md:px-[120px]" style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1.5">
            <img src="/images/신세계아이앤씨_푸터로고.png" alt="SHINSEGAE I&C" className="h-9 w-auto object-contain" />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-1 cursor-pointer whitespace-nowrap"
              style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#777777', fontSize: '12px' }}
            >
              <span>Family Site</span>
              <span style={{ fontSize: '10px', color: '#555555' }}>{open ? '▲' : '▼'}</span>
            </button>
            {open && (
              <div className="absolute right-0 bottom-full mb-1 w-[210px] z-50" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}>
                {familySites.map((site) => (
                  <a
                    key={site.name}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 text-xs cursor-pointer transition-colors"
                    style={{ color: '#aaaaaa' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#2a2a2a')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {site.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="pt-6">
          <p className="text-sm leading-relaxed" style={{ color: '#777777' }}>
            서울특별시 강남구 테헤란로 231, 센터필드 EAST 24층&nbsp;&nbsp;|&nbsp;&nbsp;<span style={{ color: '#aaaaaa' }}>대표이사</span> 양윤지&nbsp;&nbsp;|&nbsp;&nbsp;<span style={{ color: '#aaaaaa' }}>TEL</span> 02-3397-1234&nbsp;&nbsp;|&nbsp;&nbsp;<span style={{ color: '#aaaaaa' }}>사업자등록번호</span> 201-81-20549
          </p>
          <p className="text-sm mt-3" style={{ color: '#555555' }}>
            Copyright &copy; SHINSEGAE I&amp;C Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
