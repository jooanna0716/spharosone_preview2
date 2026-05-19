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

  // 히어로 dead zone(sticky 해제 후 빈 검정 구간) 진입 시 자동 앵커
  useEffect(() => {
    let snapLocked = false;
    const checkDeadZone = () => {
      if (snapLocked) return;
      const hero = heroRef.current;
      const story = storyRef.current;
      if (!hero || !story) return;
      const heroScrollable = hero.offsetHeight - window.innerHeight;
      const storyTop = story.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > heroScrollable && window.scrollY < storyTop) {
        snapLocked = true;
        window.scrollTo({ top: storyTop, behavior: 'smooth' });
        setTimeout(() => { snapLocked = false; }, 1500);
      }
    };
    window.addEventListener('scroll', checkDeadZone, { passive: true });
    return () => window.removeEventListener('scroll', checkDeadZone);
  }, []);

  useEffect(() => {
    let locked = false;

    const snapTo = (target: HTMLElement | number) => {
      locked = true;
      const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
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
      const bridgeTop = bridge.offsetTop;
      const bridgeH = bridge.offsetHeight;

      // 1. 히어로 구간: 자유 스크롤 (dead zone은 checkDeadZone 이펙트가 처리)
      if (scrollY < storyTop) {
        return;
      }

      // 2. 스토리: 카드 1·2 자연 스크롤, 카드 3 이후 → 브릿지 앵커
      if (scrollY >= storyTop && scrollY < bridgeTop) {
        const NAVBAR_H = 64;
        const stickyPanelH = vh - NAVBAR_H;
        const totalScrollable = story.offsetHeight - stickyPanelH;
        const progress = totalScrollable > 0
          ? Math.max(0, Math.min(1, (scrollY - storyTop) / totalScrollable))
          : 0;
        if (progress >= 2 / 3) {
          e.preventDefault();
          snapTo(bridge);
          return;
        }
        return;
      }

      // 3. 브릿지 진입 → bridgeTop에 정확히 스냅 (이미 거기 있으면 showcase로)
      if (scrollY >= bridgeTop && scrollY < bridgeTop + bridgeH * 0.6) {
        e.preventDefault();
        if (Math.abs(scrollY - bridgeTop) < 10) {
          snapTo(showcase);
        } else {
          snapTo(bridge);
        }
        return;
      }

      // 4. 브릿지 하반부 → showcase
      if (scrollY >= bridgeTop + bridgeH * 0.6 && scrollY < bridgeTop + bridgeH) {
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
