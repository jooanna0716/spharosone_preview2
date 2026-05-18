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
      <section className="relative pt-32 pb-16 px-6 md:px-[110px] bg-stone-50 overflow-hidden">
        <div className="w-full text-center">
          <span className="inline-block px-4 py-1.5 bg-amber-50 border border-amber-200 text-amber-600 text-xs font-semibold tracking-widest uppercase rounded-full mb-4">
            Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            무엇이든 물어보세요
          </h1>
          <p className="mt-4 text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            도입 문의, 기술 지원, 파트너십 등 어떤 내용이든 편하게 남겨주세요. 1영업일 내 답변드립니다.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 md:px-10 bg-white">
        <div className="max-w-3xl mx-auto">

          {/* Form */}
          <div className="w-full">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 bg-amber-50 rounded-2xl p-12 text-center border border-amber-100">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-amber-500">
                  <i className="ri-check-line text-white text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900">문의가 접수되었습니다!</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  1영업일 이내에 담당자가 연락드릴 예정입니다.<br />감사합니다.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-full cursor-pointer whitespace-nowrap"
                >
                  다시 문의하기
                </button>
              </div>
            ) : (
              <form
                id="contact-form"
                data-readdy-form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 bg-stone-50 rounded-2xl p-8 border border-gray-100"
              >
                <h2 className="text-xl font-bold text-gray-900">문의 남기기</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">이름 *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="홍길동"
                      className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">이메일 *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="example@company.com"
                      className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">회사명</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="(주)회사명"
                      className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">연락처</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="010-0000-0000"
                      className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">문의 유형</label>
                  <select
                    name="inquiry_type"
                    className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
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
                    <label className="text-xs font-semibold text-gray-600">문의 내용 *</label>
                    <span className={`text-xs ${charCount > 500 ? 'text-red-500' : 'text-gray-400'}`}>{charCount}/500</span>
                  </div>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={500}
                    placeholder="문의하실 내용을 자세히 입력해주세요."
                    onChange={(e) => setCharCount(e.target.value.length)}
                    className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading || charCount > 500}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap text-sm"
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
