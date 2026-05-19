import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal — Desktop-only GSAP ScrollTrigger section animations.
 * Animates elements with class "animate-on-scroll" as they enter the viewport.
 * On mobile (< 768px) the elements are just shown immediately without animation.
 *
 * @param {string} containerSelector — optional root selector to scope triggers
 */
export default function useScrollReveal(containerSelector = null) {
  useEffect(() => {
    // No animations on mobile
    if (window.innerWidth < 768) {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const root = containerSelector ? document.querySelector(containerSelector) : document;
    if (!root) return;

    const triggers = [];

    // --- 1. Generic fade-up for .animate-on-scroll ---
    const fadeEls = root.querySelectorAll('.animate-on-scroll');
    fadeEls.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 48, filter: 'blur(4px)' });

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.75,
            ease: 'power3.out',
            delay: (i % 4) * 0.07, // slight stagger based on position in batch
          });
        },
      });
      triggers.push(st);
    });

    // --- 2. Section heading reveal (.char-reveal) —  split-like mask wipe ---
    const headings = root.querySelectorAll('.char-reveal');
    headings.forEach((el) => {
      gsap.set(el, { clipPath: 'inset(0 100% 0 0)', opacity: 1 });

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.1,
            ease: 'power4.inOut',
          });
        },
      });
      triggers.push(st);
    });

    // --- 3. Staggered card grids (.stagger-children) ---
    const grids = root.querySelectorAll('.stagger-children');
    grids.forEach((grid) => {
      const children = Array.from(grid.children);
      gsap.set(children, { opacity: 0, y: 36, scale: 0.97 });

      const st = ScrollTrigger.create({
        trigger: grid,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(st);
    });

    // --- 4. Horizontal slide-in for alternating left/right elements ---
    const slideLeftEls = root.querySelectorAll('.slide-in-left');
    slideLeftEls.forEach((el) => {
      gsap.set(el, { opacity: 0, x: -60 });
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
        },
      });
      triggers.push(st);
    });

    const slideRightEls = root.querySelectorAll('.slide-in-right');
    slideRightEls.forEach((el) => {
      gsap.set(el, { opacity: 0, x: 60 });
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
        },
      });
      triggers.push(st);
    });

    // --- 5. Scale reveal for images and cards (.scale-reveal) ---
    const scaleEls = root.querySelectorAll('.scale-reveal');
    scaleEls.forEach((el) => {
      gsap.set(el, { opacity: 0, scale: 0.9, transformOrigin: 'center bottom' });
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'expo.out',
          });
        },
      });
      triggers.push(st);
    });

    // --- 6. Count-up for stat numbers (.count-up[data-target]) ---
    const counters = root.querySelectorAll('.count-up[data-target]');
    counters.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target')) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const obj = { val: 0 };

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.val).toLocaleString() + suffix;
            },
          });
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [containerSelector]);
}
