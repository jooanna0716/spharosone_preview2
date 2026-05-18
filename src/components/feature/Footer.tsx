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
    <footer className="bg-white pt-10 pb-[60px] px-6 md:px-[110px]">
      <div className="w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1.5">
            <img src="https://storage.readdy-site.link/project_files/09bf78ae-475d-4476-990b-92bad66325f9/0a8ade1a-2694-4299-b405-e77100ad8f4e__.png?v=683262a65621c6dd2fa34ba9bdf569f2" alt="SHINSEGAE I&C" className="h-9 w-auto object-contain" />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-1 border border-gray-200 bg-white text-xs text-gray-500 cursor-pointer whitespace-nowrap"
            >
              <span>Family Site</span>
              <span className="text-[10px] text-gray-400 leading-none">{open ? '▲' : '▼'}</span>
            </button>
            {open && (
              <div className="absolute right-0 bottom-full mb-1 w-[210px] bg-white border border-gray-200 z-50">
                {familySites.map((site) => (
                  <a
                    key={site.name}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 cursor-pointer"
                  >
                    {site.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 leading-relaxed">
            서울특별시 강남구 테헤란로 231, 센터필드 EAST 24층&nbsp;&nbsp;|&nbsp;&nbsp;<span className="text-gray-600">대표이사</span> 양윤지&nbsp;&nbsp;|&nbsp;&nbsp;<span className="text-gray-600">TEL</span> 02-3397-1234&nbsp;&nbsp;|&nbsp;&nbsp;<span className="text-gray-600">사업자등록번호</span> 201-81-20549
          </p>
          <p className="text-sm text-gray-400 mt-3">
            Copyright &copy; SHINSEGAE I&amp;C Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
