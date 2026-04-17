import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiMapPin, FiPhoneCall, FiSend, FiStar } from 'react-icons/fi';

import contactImage from '../../assets/img/contact-img.svg';
import './ContactPage.css';

const contactCards = [
  {
    icon: FiMail,
    title: 'Email Us',
    text: 'hello@softglowbeauty.com',
  },
  {
    icon: FiPhoneCall,
    title: 'Call Support',
    text: '+880 1700 000000',
  },
  {
    icon: FiMapPin,
    title: 'Visit Studio',
    text: 'Kuril, Dhaka, Bangladesh',
  },
];

const ContactPage = () => {
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
          .from('.contact-kicker', { y: 22, opacity: 0, duration: 0.6 })
          .from('.contact-hero__content h1', { y: 42, opacity: 0, duration: 0.82 }, '-=0.3')
          .from('.contact-hero__content p', { y: 24, opacity: 0, duration: 0.7 }, '-=0.46')
          .from('.contact-card', { y: 20, opacity: 0, stagger: 0.08, duration: 0.42 }, '-=0.32')
          .from('.contact-form-wrap', { x: 36, opacity: 0, duration: 0.82 }, '-=0.48')
          .from('.contact-hero__media', { scale: 0.94, opacity: 0, duration: 0.8 }, '-=0.65');

        gsap.to('.contact-orb--one', {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: '.contact-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to('.contact-orb--two', {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.contact-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className='contact-page' ref={pageRef}>
      <section className='contact-hero'>
        <div className='page-shell contact-hero__grid'>
          <div className='contact-hero__content'>
            <span className='contact-kicker'>Connect with us</span>
            <h1>Let’s talk about skincare, makeup, and your next favorite routine.</h1>
            <p>
              Whether you have product questions, collaboration ideas, or need support with an
              order, we’re here to make the experience feel personal and easy.
            </p>

            <div className='contact-cards'>
              {contactCards.map(({ icon: Icon, title, text }) => (
                <article key={title} className='contact-card'>
                  <div className='contact-card__icon'>
                    <Icon />
                  </div>
                  <div>
                    <h2>{title}</h2>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className='contact-hero__visual'>
            <div className='contact-orb contact-orb--one'></div>
            <div className='contact-orb contact-orb--two'></div>

            <div className='contact-form-wrap'>
              <div className='contact-form-wrap__badge'>
                <FiStar />
                Reply within 24 hours
              </div>

              <form className='contact-form'>
                <label>
                  <span>Name</span>
                  <input type='text' placeholder='Your name' />
                </label>

                <label>
                  <span>Email</span>
                  <input type='email' placeholder='your@email.com' />
                </label>

                <label>
                  <span>Subject</span>
                  <input type='text' placeholder='How can we help?' />
                </label>

                <label>
                  <span>Message</span>
                  <textarea rows='5' placeholder='Tell us what you need...' />
                </label>

                <button type='button' className='contact-submit'>
                  Send Message <FiSend />
                </button>
              </form>
            </div>

            <div className='contact-hero__media' aria-hidden='true'>
              <img src={contactImage} alt='' />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
