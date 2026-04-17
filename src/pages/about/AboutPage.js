import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiHeart, FiLayers, FiShield, FiStar, FiTruck } from 'react-icons/fi';

import heroImage from '../../assets/store/hero_image.png';
import detailImage from '../../assets/store/slide-2.jpg';
import './AboutPage.css';

const values = [
  {
    icon: FiHeart,
    title: 'Beauty With Intention',
    text: 'We curate skincare and makeup that feels soft, modern, and easy to love every day.',
  },
  {
    icon: FiShield,
    title: 'Trust In Every Pick',
    text: 'Quality, comfort, and thoughtful presentation guide every collection we feature.',
  },
  {
    icon: FiLayers,
    title: 'Editorial Shopping',
    text: 'Our store is designed to feel like a beauty magazine with smoother discovery.',
  },
  {
    icon: FiTruck,
    title: 'Fast Everyday Delivery',
    text: 'The experience is built for quick browsing and confident checkout moments.',
  },
];

const milestones = [
  {
    number: '01',
    title: 'Start With Care',
    text: 'The brand began around the idea that self-care products should feel elevated, not generic.',
  },
  {
    number: '02',
    title: 'Blend Makeup And Ritual',
    text: 'We combined soft-glam beauty, skincare essentials, and premium visual storytelling.',
  },
  {
    number: '03',
    title: 'Design For Confidence',
    text: 'Everything from curation to interface aims to help shoppers feel guided and inspired.',
  },
];

const AboutPage = () => {
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
          .from('.about-kicker', { y: 22, opacity: 0, duration: 0.6 })
          .from('.about-hero__content h1', { y: 42, opacity: 0, duration: 0.85 }, '-=0.3')
          .from('.about-hero__content p', { y: 24, opacity: 0, duration: 0.7 }, '-=0.45')
          .from('.about-hero__actions .about-button', { y: 18, opacity: 0, stagger: 0.1, duration: 0.45 }, '-=0.35')
          .from('.about-hero__stats article', { y: 18, opacity: 0, stagger: 0.08, duration: 0.42 }, '-=0.25')
          .from('.about-hero__media', { scale: 0.94, opacity: 0, rotate: -3, duration: 0.85 }, '-=0.6');

        gsap.to('.about-orb--one', {
          yPercent: 14,
          xPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to('.about-orb--two', {
          yPercent: -12,
          xPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        });

        gsap.utils.toArray('.about-section-heading').forEach((heading) => {
          gsap.from(heading.children, {
            y: 24,
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

        gsap.utils.toArray('.about-value-card').forEach((card, index) => {
          gsap.from(card, {
            y: 34,
            opacity: 0,
            duration: 0.72,
            delay: index * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
            },
          });
        });

        gsap.from('.about-story__content > *', {
          y: 24,
          opacity: 0,
          duration: 0.72,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-story__content',
            start: 'top 80%',
          },
        });

        gsap.from('.about-story__media', {
          x: 42,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-story',
            start: 'top 78%',
          },
        });

        gsap.utils.toArray('.about-milestone').forEach((item, index) => {
          gsap.from(item, {
            x: index % 2 === 0 ? -24 : 24,
            opacity: 0,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 84%',
            },
          });
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className='about-page' ref={pageRef}>
      <section className='about-hero'>
        <div className='page-shell about-hero__grid'>
          <div className='about-hero__content'>
            <span className='about-kicker'>About our beauty world</span>
            <h1>We built this brand around softness, confidence, and modern self-care.</h1>
            <p>
              From skincare rituals to makeup essentials, our goal is to make beauty shopping feel
              curated, elevated, and calm. Every page is shaped to feel more premium than a
              typical online store.
            </p>

            <div className='about-hero__actions'>
              <Link to='/shop' className='about-button about-button--primary'>
                Explore the collection <FiArrowRight />
              </Link>
              <Link to='/contact' className='about-button about-button--ghost'>
                Talk to us
              </Link>
            </div>

            <div className='about-hero__stats'>
              <article>
                <strong>Beauty</strong>
                <span>Skincare and makeup focus</span>
              </article>
              <article>
                <strong>Premium</strong>
                <span>Modern editorial experience</span>
              </article>
              <article>
                <strong>Daily</strong>
                <span>Designed for easy rituals</span>
              </article>
            </div>
          </div>

          <div className='about-hero__visual' aria-hidden='true'>
            <div className='about-orb about-orb--one'></div>
            <div className='about-orb about-orb--two'></div>
            <div className='about-hero__media'>
              <img src={heroImage} alt='' />
              <div className='about-floating-card'>
                <FiStar />
                <div>
                  <span>Brand mood</span>
                  <strong>Soft glow, bold polish</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='about-values page-shell'>
        <div className='about-section-heading'>
          <span className='about-kicker'>What we stand for</span>
          <h2>A beauty store that feels intentional at every touchpoint.</h2>
          <p>
            We care about atmosphere, trust, and product storytelling just as much as the product
            itself, because the full experience shapes how the brand feels.
          </p>
        </div>

        <div className='about-values__grid'>
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title} className='about-value-card'>
              <div className='about-value-card__icon'>
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='about-story page-shell'>
        <div className='about-story__content'>
          <span className='about-kicker'>Our story</span>
          <h2>Beauty should feel personal, clear, and a little luxurious.</h2>
          <p>
            This project brings together product curation, makeup inspiration, and skincare-first
            calm into a single visual system. The design language uses glow, glassmorphism, and
            subtle motion to make the brand feel warm and high-end.
          </p>
          <p>
            We want people to move from discovery to purchase without confusion, while still
            enjoying a brand identity that feels expressive and memorable.
          </p>
        </div>

        <div className='about-story__media'>
          <img src={detailImage} alt='Beauty and skincare brand story visual' />
        </div>
      </section>

      <section className='about-journey page-shell'>
        <div className='about-section-heading'>
          <span className='about-kicker'>Journey</span>
          <h2>How the brand experience comes together.</h2>
          <p>
            Every section has a purpose: set the mood, build trust, and make product discovery
            feel easy and inspiring.
          </p>
        </div>

        <div className='about-milestones'>
          {milestones.map(({ number, title, text }) => (
            <article key={number} className='about-milestone'>
              <span className='about-milestone__number'>{number}</span>
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

export default AboutPage;
