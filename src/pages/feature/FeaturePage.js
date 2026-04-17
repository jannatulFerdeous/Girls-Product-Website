import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowRight,
  FiBox,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiMoon,
  FiShield,
  FiStar,
  FiTruck,
} from 'react-icons/fi';

import { siteImages } from '../../assets/newImageAssets';
import './FeaturePage.css';

const signatureFeatures = [
  {
    icon: FiMoon,
    title: '3D Shelf Styling',
    text: 'Modern product scenes with layered gradients, glass cards, and sculpted highlights.',
  },
  {
    icon: FiLayers,
    title: 'Editorial Layouts',
    text: 'Magazine-inspired storytelling that makes every collection feel curated and premium.',
  },
  {
    icon: FiShield,
    title: 'Trust-First UX',
    text: 'Clear product framing, protected checkout messaging, and confidence-building details.',
  },
  {
    icon: FiTruck,
    title: 'Fast Shopping Flow',
    text: 'Quick browsing, fast add-to-cart actions, and focused browsing paths for conversion.',
  },
];

const experienceSteps = [
  {
    number: '01',
    title: 'Discover',
    text: 'Hero storytelling introduces the brand mood with motion, depth, and visual hierarchy.',
  },
  {
    number: '02',
    title: 'Compare',
    text: 'Feature cards and editorial callouts make it easier to scan value at a glance.',
  },
  {
    number: '03',
    title: 'Convert',
    text: 'Each section leads naturally toward shop actions without feeling crowded or generic.',
  },
];

const highlightStats = [
  { value: '24H', label: 'Dispatch promise' },
  { value: '4.9', label: 'Average rating' },
  { value: '3D', label: 'Visual direction' },
];

const FeaturePage = () => {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const introTimeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

        introTimeline
          .from('.feature-kicker', { y: 24, opacity: 0, duration: 0.65 })
          .from('.feature-hero__content h1', { y: 42, opacity: 0, duration: 0.85 }, '-=0.3')
          .from('.feature-hero__content p', { y: 28, opacity: 0, duration: 0.7 }, '-=0.48')
          .from('.feature-hero__actions .feature-button', { y: 18, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.4')
          .from('.feature-hero__stats article', { y: 20, opacity: 0, stagger: 0.08, duration: 0.45 }, '-=0.35')
          .from('.feature-hero__scene', { scale: 0.94, opacity: 0, rotate: -4, duration: 0.9 }, '-=0.7')
          .from('.feature-floating-card', { y: 20, opacity: 0, stagger: 0.12, duration: 0.5 }, '-=0.45');

        gsap.to('.feature-orb--one', {
          yPercent: 16,
          xPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.feature-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to('.feature-orb--two', {
          yPercent: -14,
          xPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: '.feature-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.15,
          },
        });

        gsap.to('.feature-scene__image', {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: '.feature-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        gsap.utils.toArray('.feature-section-heading').forEach((heading) => {
          gsap.from(heading.children, {
            y: 28,
            opacity: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 82%',
            },
          });
        });

        gsap.utils.toArray('.feature-card').forEach((card, index) => {
          gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.72,
            ease: 'power3.out',
            delay: index * 0.05,
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
            },
          });
        });

        gsap.from('.feature-spotlight__media', {
          x: 48,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.feature-spotlight',
            start: 'top 78%',
          },
        });

        gsap.from('.feature-spotlight__content > *', {
          y: 26,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.feature-spotlight__content',
            start: 'top 80%',
          },
        });

        gsap.utils.toArray('.feature-step').forEach((step, index) => {
          gsap.from(step, {
            x: index % 2 === 0 ? -28 : 28,
            opacity: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 84%',
            },
          });
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className='feature-page' ref={pageRef}>
      <section className='feature-hero'>
        <div className='page-shell feature-hero__grid'>
          <div className='feature-hero__content'>
            <span className='feature-kicker'>Experience the signature features</span>
            <h1>Built to feel premium, animated, and confidently modern.</h1>
            <p>
              This feature page showcases how your store stands out: editorial design, 3D-inspired
              objects, smooth motion, and shopping moments that feel elevated instead of ordinary.
            </p>

            <div className='feature-hero__actions'>
              <Link to='/shop' className='feature-button feature-button--primary'>
                Explore the shop <FiArrowRight />
              </Link>
              <Link to='/' className='feature-button feature-button--ghost'>
                Return home
              </Link>
            </div>

            <div className='feature-hero__stats'>
              {highlightStats.map(({ value, label }) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className='feature-hero__visual' aria-hidden='true'>
            <div className='feature-orb feature-orb--one'></div>
            <div className='feature-orb feature-orb--two'></div>

            <div className='feature-hero__scene'>
              <div className='feature-scene__halo'></div>
              <div className='feature-scene__panel'>
                <div className='feature-scene__badge'>
                  <FiStar />
                  Featured Visual System
                </div>
                <img className='feature-scene__image' src={siteImages.posterVisualTwo} alt='' />
              </div>

              <div className='feature-floating-card feature-floating-card--top'>
                <span>Visual Mood</span>
                <strong>Soft luxury with depth</strong>
                <small>Curved shapes, glowing edges, and intentional whitespace.</small>
              </div>

              <div className='feature-floating-card feature-floating-card--bottom'>
                <FiHeart />
                <div>
                  <span>Why it works</span>
                  <strong>Memorable first impression</strong>
                  <small>Motion and hierarchy guide the eye before the user reads a word.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='feature-signature page-shell'>
        <div className='feature-section-heading'>
          <span className='feature-kicker'>Signature stack</span>
          <h2>Everything that makes this storefront feel more high-end.</h2>
          <p>
            Designed to present beauty and girls products in a cleaner, richer, and more modern
            way than a basic ecommerce template.
          </p>
        </div>

        <div className='feature-grid'>
          {signatureFeatures.map(({ icon: Icon, title, text }) => (
            <article key={title} className='feature-card'>
              <div className='feature-card__icon'>
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='feature-spotlight page-shell'>
        <div className='feature-spotlight__content'>
          <span className='feature-kicker'>Spotlight section</span>
          <h2>One page can communicate mood, trust, and value at the same time.</h2>
          <p>
            The strongest product pages do more than list features. They set tone, support trust,
            and create a premium feeling through layering, rhythm, and motion.
          </p>

          <ul className='feature-bullets'>
            <li><FiBox /> Product displays feel staged, not randomly placed.</li>
            <li><FiGlobe /> Responsive sections stay polished from mobile to desktop.</li>
            <li><FiLayers /> GSAP animation brings energy without overwhelming the page.</li>
          </ul>

          <Link to='/shop' className='feature-button feature-button--secondary'>
            View shopping experience
          </Link>
        </div>

        <div className='feature-spotlight__media'>
          <div className='feature-spotlight__image-shell feature-spotlight__image-shell--primary'>
            <img src={siteImages.bodyWashBlackOrchid} alt='Skincare feature showcase' />
          </div>
          <div className='feature-spotlight__image-shell feature-spotlight__image-shell--secondary'>
            <img src={siteImages.serumStillLife} alt='Beauty product detail preview' />
          </div>
        </div>
      </section>

      <section className='feature-journey page-shell'>
        <div className='feature-section-heading'>
          <span className='feature-kicker'>User flow</span>
          <h2>A smoother journey from discovery to checkout.</h2>
          <p>
            The feature story is broken into steps so every section has a job and every animation
            supports the browsing path.
          </p>
        </div>

        <div className='feature-steps'>
          {experienceSteps.map(({ number, title, text }) => (
            <article key={number} className='feature-step'>
              <span className='feature-step__number'>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FeaturePage;
