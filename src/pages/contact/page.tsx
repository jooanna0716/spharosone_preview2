import { useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

const CONTACT_INFO = [
  { icon: 'ri-map-pin-line', label: '주소', value: '서울특별시 강남구 테헤란로 152, 7층' },
  { icon: 'ri-phone-line', label: '전화', value: '02-1234-5678' },
  { icon: 'ri-mail-line', label: '이메일', value: 'hello@mycloudmembership.com' },
  { icon: 'ri-time-line', label: '운영시간', value: '평일 09:00 – 18:00 (토·일 휴무)' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    if (message.length > 500) return;

    setLoading(true);
    const formData = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
    try {
      await fetch('https://readdy.ai/api/form/d7jij4sbgqmqj6e8sma0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      setSubmitted(true);
    } catch {
      // silent fail
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 md:px-[120px] overflow-hidden" style={{ background: '#0d0d0d' }}>
        <div className="w-full text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full mb-4" style={{ background: 'rgba(91,164,245,0.15)', border: '1px solid rgba(91,164,245,0.3)', color: '#5BA4F5' }}>
            Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ color: '#f0f0f0' }}>
            무엇이든 물어보세요
          </h1>
          <p className="mt-4 text-base max-w-md mx-auto leading-relaxed" style={{ color: '#aaaaaa' }}>
            도입 문의, 기술 지원, 파트너십 등 어떤 내용이든 편하게 남겨주세요. 1영업일 내 답변드립니다.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 md:px-10" style={{ background: '#0d0d0d' }}>
        <div className="max-w-3xl mx-auto">

          {/* Form */}
          <div className="w-full">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 rounded-2xl p-12 text-center" style={{ background: '#1a2a40', border: '1px solid rgba(91,164,245,0.2)' }}>
                <div className="w-16 h-16 flex items-center justify-center rounded-full" style={{ background: '#5BA4F5' }}>
                  <i className="ri-check-line text-white text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#f0f0f0' }}>문의가 접수되었습니다!</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#aaaaaa' }}>
                  1영업일 이내에 담당자가 연락드릴 예정입니다.<br />감사합니다.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-6 py-2.5 text-white text-sm font-semibold rounded-full cursor-pointer whitespace-nowrap transition-opacity hover:opacity-90"
                  style={{ background: '#5BA4F5' }}
                >
                  다시 문의하기
                </button>
              </div>
            ) : (
              <form
                id="contact-form"
                data-readdy-form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 rounded-2xl p-8"
                style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <h2 className="text-xl font-bold" style={{ color: '#f0f0f0' }}>문의 남기기</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold" style={{ color: '#aaaaaa' }}>이름 *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="홍길동"
                      className="px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-colors"
                      style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0f0' }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold" style={{ color: '#aaaaaa' }}>이메일 *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="example@company.com"
                      className="px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-colors"
                      style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0f0' }}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold" style={{ color: '#aaaaaa' }}>회사명</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="(주)회사명"
                      className="px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-colors"
                      style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0f0' }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold" style={{ color: '#aaaaaa' }}>연락처</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="010-0000-0000"
                      className="px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-colors"
                      style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0f0' }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold" style={{ color: '#aaaaaa' }}>문의 유형</label>
                  <select
                    name="inquiry_type"
                    className="px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-colors cursor-pointer"
                    style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0f0' }}
                  >
                    <option value="">문의 유형을 선택해주세요</option>
                    <option value="도입 문의">도입 문의</option>
                    <option value="기술 지원">기술 지원</option>
                    <option value="파트너십">파트너십</option>
                    <option value="채용">채용</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold" style={{ color: '#aaaaaa' }}>문의 내용 *</label>
                    <span className={`text-xs ${charCount > 500 ? 'text-red-400' : ''}`} style={{ color: charCount > 500 ? undefined : '#666666' }}>{charCount}/500</span>
                  </div>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={500}
                    placeholder="문의하실 내용을 자세히 입력해주세요."
                    onChange={(e) => setCharCount(e.target.value.length)}
                    className="px-4 py-2.5 rounded-lg text-sm focus:outline-none transition-colors resize-none"
                    style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0f0' }}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading || charCount > 500}
                  className="w-full py-3.5 text-white font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap text-sm hover:opacity-90 disabled:opacity-50"
                  style={{ background: '#5BA4F5' }}
                >
                  {loading ? '전송 중...' : '문의 보내기'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
