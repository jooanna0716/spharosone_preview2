import { useEffect, useRef } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import HeroSection from './components/HeroSection';
import SpharosOneStorySection from './components/SpharosOneStorySection';
import CouponShowcase from './components/CouponShowcase';
import PricingModelSection from './components/PricingModelSection';
import ImpactSection from './components/ImpactSection';
import TestimonialSection from './components/TestimonialSection';
import CtaSection from './components/CtaSection';
import StoryBridgeSection from './components/StoryBridgeSection';

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let locked = false;

    const snapTo = (target: HTMLElement | number) => {
      locked = true;
      const top = typeof target === 'number' ? target : target.offsetTop;
      window.scrollTo({ top, behavior: 'smooth' });
      setTimeout(() => { locked = false; }, 2000);
    };

    const handleWheel = (e: WheelEvent) => {
      if (locked || e.deltaY <= 0) return;

      const hero = heroRef.current;
      const story = storyRef.current;
      const showcase = showcaseRef.current;
      const impact = impactRef.current;
      const testimonial = testimonialRef.current;
      const cta = ctaRef.current;
      const bridge = bridgeRef.current;
      if (!hero || !story || !showcase || !impact || !testimonial || !cta || !bridge) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const storyTop = story.offsetTop;
      const storyH = story.offsetHeight;
      const lastCardStart = storyTop + (2 / 3) * storyH;
      const bridgeTop = bridge.offsetTop;
      const bridgeH = bridge.offsetHeight;

      // 1. 히어로 → 스토리 섹션
      if (scrollY < storyTop) {
        e.preventDefault();
        snapTo(story);
        return;
      }

      // 2. 스토리 카드 1-2: 자연 스크롤 (카드 3 시작 전까지)
      if (scrollY >= storyTop && scrollY < lastCardStart) {
        return;
      }

      // 3. 스토리 마지막 카드(3번) 구간 → 브릿지로 바로 스냅
      if (scrollY >= lastCardStart && scrollY < bridgeTop) {
        e.preventDefault();
        snapTo(bridge);
        return;
      }

      // 4. 브릿지 섹션 → 핵심가치(showcase)로 스냅
      if (scrollY >= bridgeTop && scrollY < bridgeTop + bridgeH) {
        e.preventDefault();
        snapTo(showcase);
        return;
      }

      // 5. 핵심가치 + 과금방식 구간: 자유 스크롤
      {
        const pricing = pricingRef.current;
        const showcaseTop = showcase.offsetTop;
        const pricingEnd = pricing ? pricing.offsetTop + pricing.offsetHeight : showcase.offsetTop + showcase.offsetHeight;
        if (scrollY + vh > showcaseTop && scrollY < pricingEnd) {
          return;
        }
      }

      // 6. 도입효과 마지막 슬라이드(24/7) → 기대효과
      {
        const impactTop = impact.offsetTop;
        const lastSlideStart = impactTop + 3 * vh;
        const impactEnd = impactTop + impact.offsetHeight - vh;
        if (scrollY >= lastSlideStart - 30 && scrollY <= impactEnd + 80) {
          e.preventDefault();
          snapTo(testimonial);
          return;
        }
      }

      // 7. 기대효과 마지막 카드(6번째) → CTA
      {
        const testimonialTop = testimonial.offsetTop;
        const lastTestimonialCard = testimonialTop + 5 * vh;
        const testimonialEnd = testimonialTop + testimonial.offsetHeight - vh;
        if (scrollY >= lastTestimonialCard - 30 && scrollY <= testimonialEnd + 80) {
          e.preventDefault();
          snapTo(cta);
          return;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <div ref={heroRef}><HeroSection /></div>
      <div style={{ height: '80px', background: '#000000' }} />
      <div ref={storyRef}><SpharosOneStorySection /></div>
      <div ref={bridgeRef}><StoryBridgeSection /></div>
      <div ref={showcaseRef} id="showcase-section"><CouponShowcase /></div>
      <div ref={pricingRef}><PricingModelSection /></div>
      <div ref={impactRef}><ImpactSection /></div>
      <div ref={testimonialRef}><TestimonialSection /></div>
      <div ref={ctaRef}><CtaSection /></div>
      <Footer />
    </main>
  );
}
