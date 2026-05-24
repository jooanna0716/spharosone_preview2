import { useEffect, useRef } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import HeroSection from './components/HeroSection';
import CouponShowcase from './components/CouponShowcase';
import PricingModelSection from './components/PricingModelSection';
import ImpactSection from './components/ImpactSection';
import TestimonialSection from './components/TestimonialSection';
import CtaSection from './components/CtaSection';
import StoryBridgeSection from './components/StoryBridgeSection';
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const bridgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // 히어로(100vh) 영역 벗어나면 브릿지로 즉시 스냅 (아래 방향 스크롤 시에만)
  useEffect(() => {
    let snapLocked = false;
    let prevScrollY = window.scrollY;
    const checkDeadZone = () => {
      if (window.innerWidth < 768) return;
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > prevScrollY;
      prevScrollY = currentScrollY;
      if (!scrollingDown) return; // 위로 스크롤 시 스냅 안 함
      if (snapLocked) return;
      const bridge = bridgeRef.current;
      if (!bridge) return;
      const bridgeTop = bridge.getBoundingClientRect().top + window.scrollY;
      if (currentScrollY > 5 && currentScrollY < bridgeTop) {
        snapLocked = true;
        window.scrollTo({ top: bridgeTop, behavior: 'smooth' });
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
      if (window.innerWidth < 768) return;
      if (locked || e.deltaY <= 0) return;

      const showcase = showcaseRef.current;
      const impact = impactRef.current;
      const testimonial = testimonialRef.current;
      const cta = ctaRef.current;
      const bridge = bridgeRef.current;
      if (!showcase || !impact || !testimonial || !cta || !bridge) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const bridgeTop = bridge.offsetTop;
      const bridgeH = bridge.offsetHeight;

      // 1. 히어로 구간: 브릿지로 즉시 스냅
      if (scrollY < bridgeTop) {
        e.preventDefault();
        snapTo(bridge);
        return;
      }

      // 2. 브릿지 진입 → bridgeTop에 정확히 스냅 (이미 거기 있으면 핵심가치로)
      if (scrollY >= bridgeTop && scrollY < bridgeTop + bridgeH * 0.6) {
        e.preventDefault();
        if (Math.abs(scrollY - bridgeTop) < 10) {
          snapTo(showcase);
        } else {
          snapTo(bridge);
        }
        return;
      }

      // 3. 브릿지 하반부 → 핵심가치
      if (scrollY >= bridgeTop + bridgeH * 0.6 && scrollY < bridgeTop + bridgeH) {
        e.preventDefault();
        snapTo(showcase);
        return;
      }

      // 4. 핵심가치 + 과금방식 구간: 자유 스크롤
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
