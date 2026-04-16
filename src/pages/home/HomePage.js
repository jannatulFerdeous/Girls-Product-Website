import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowRight,
  FiGift,
  FiLock,
  FiShield,
  FiStar,
  FiTruck,
} from "react-icons/fi";

import { ShopContext } from "../../context/ShopContext";
import featuredProducts from "../../data/products/featuredProducts";
import newCollections from "../../data/products/newCollections";
import heroImage from "../../assets/store/exclusive_image.png";
import categoryImage1 from "../../assets/img/cat-1.jpg";
import categoryImage2 from "../../assets/img/cat-2.jpg";
import categoryImage3 from "../../assets/img/cat-3.jpg";
import categoryImage4 from "../../assets/img/cat-4.jpg";
import bannerWomen from "../../assets/store/banner_women.png";
import bannerKids from "../../assets/store/banner_kids.png";
import "./HomePage.css";

const categories = [
  {
    eyebrow: "Glow",
    title: "Skin Rituals",
    description:
      "Hydration-first essentials with luminous finishes and soft-care textures.",
    image: categoryImage1,
  },
  {
    eyebrow: "Body",
    title: "Daily Softness",
    description:
      "Creamy formulas, warm fragrance notes, and elevated everyday self-care.",
    image: categoryImage2,
  },
  {
    eyebrow: "Color",
    title: "Studio Makeup",
    description: "Modern pigment stories for effortless day-to-night looks.",
    image: categoryImage3,
  },
  {
    eyebrow: "Spa",
    title: "Reset Collection",
    description:
      "Calm, restore, and slow down with a minimalist at-home retreat.",
    image: categoryImage4,
  },
];

const serviceHighlights = [
  {
    icon: FiTruck,
    title: "Fast Dispatch",
    text: "Orders packed within 24 hours.",
  },
  {
    icon: FiShield,
    title: "Beauty Approved",
    text: "Curated quality with thoughtful sourcing.",
  },
  {
    icon: FiGift,
    title: "Gift-Ready",
    text: "Premium wrapping on every signature drop.",
  },
  {
    icon: FiLock,
    title: "Secure Checkout",
    text: "Protected payments and worry-free support.",
  },
];

const brandMentions = [
  "LUMIERE",
  "EDIT MODERN",
  "SOFT GLOW",
  "THE DAILY LOOK",
  "AURA PICKS",
];

const HomePage = () => {
  const { addToCart } = useContext(ShopContext);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const pageRef = useRef(null);

  const featured = featuredProducts.slice(0, 4);
  const arrivals = newCollections.slice(0, 4);

  const handleSceneMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    setPointer({ x, y });
  };

  const resetScene = () => {
    setPointer({ x: 0, y: 0 });
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heroTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        heroTimeline
          .from(".home-kicker", { y: 26, opacity: 0, duration: 0.7 })
          .from(
            ".home-hero__content h1",
            { y: 46, opacity: 0, duration: 0.9 },
            "-=0.35",
          )
          .from(
            ".home-hero__content p",
            { y: 28, opacity: 0, duration: 0.75 },
            "-=0.55",
          )
          .from(
            ".home-hero__actions .home-button",
            { y: 18, opacity: 0, stagger: 0.12, duration: 0.55 },
            "-=0.45",
          )
          .from(
            ".home-hero__panel",
            { scale: 0.92, opacity: 0, rotate: -4, duration: 0.9 },
            "-=0.85",
          )
          .from(
            ".home-floating-card--top",
            { y: 22, opacity: 0, duration: 0.55 },
            "-=0.45",
          );

        gsap.to(".home-hero__image", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".home-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });

        gsap.to(".home-hero__orb--one", {
          yPercent: 18,
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".home-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(".home-hero__orb--two", {
          yPercent: -16,
          xPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".home-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.3,
          },
        });

        gsap.from(".home-marquee__track", {
          xPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".home-marquee",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.utils.toArray(".home-service-card").forEach((card, index) => {
          gsap.from(card, {
            y: 36,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: index * 0.05,
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
            },
          });
        });

        gsap.utils.toArray(".home-section-heading").forEach((heading) => {
          gsap.from(heading.children, {
            y: 32,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 82%",
            },
          });
        });

        gsap.utils.toArray(".home-category-card").forEach((card) => {
          gsap.from(card, {
            y: 48,
            opacity: 0,
            scale: 0.96,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
            },
          });
        });

        gsap.from(".home-product-card", {
          y: 40,
          opacity: 0,
          stagger: 0.14,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".home-product-grid",
            start: "top 82%",
          },
        });

        gsap.from(".home-editorial__media", {
          x: -44,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".home-editorial__grid",
            start: "top 78%",
          },
        });

        gsap.from(".home-editorial__content > *", {
          x: 34,
          opacity: 0,
          stagger: 0.12,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".home-editorial__content",
            start: "top 80%",
          },
        });

        gsap.from(".home-arrival-card", {
          y: 36,
          opacity: 0,
          stagger: 0.12,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".home-arrivals__grid",
            start: "top 82%",
          },
        });

        gsap.from(".home-promo-card", {
          y: 44,
          opacity: 0,
          scale: 0.97,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".home-promo-card",
            start: "top 82%",
          },
        });

        gsap.to(".home-promo-card img", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".home-promo-card",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      return () => mm.revert();
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="home-page">
      <section className="home-hero">
        <div className="home-shell home-hero__grid">
          <div className="home-hero__content">
            <span className="home-kicker">Night edit 2026</span>
            <h1>Beauty essentials with a darker, sharper flagship feel.</h1>
            <p>
              A refined storefront for glow-led skincare, modern makeup, and
              elevated self-care, designed to feel cinematic, minimal, and
              premium.
            </p>

            <div className="home-hero__actions">
              <Link
                to="/product/1"
                className="home-button home-button--primary"
              >
                Shop the edit <FiArrowRight />
              </Link>
              <a href="#featured" className="home-button home-button--ghost">
                Explore best sellers
              </a>
            </div>
          </div>

          <div
            className="home-hero__visual"
            onMouseMove={handleSceneMove}
            onMouseLeave={resetScene}
          >
            <div className="home-hero__orb home-hero__orb--one" />
            <div className="home-hero__orb home-hero__orb--two" />

            <div
              className="home-hero__panel"
              style={{
                transform: `perspective(1400px) rotateX(${pointer.y * -8}deg) rotateY(${pointer.x * 11}deg)`,
              }}
            >
              <div className="home-hero__badge">
                <FiStar />
                Signature launch
              </div>

              <img
                src={heroImage}
                alt="Exclusive collection spotlight"
                className="home-hero__image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="home-marquee">
        <div className="home-marquee__track">
          <span>Free shipping over Tk.3000</span>
          <span>Clean beauty picks</span>
          <span>Fresh arrivals every week</span>
          <span>Luxury textures, everyday prices</span>
          <span>Free shipping over Tk.3000</span>
          <span>Clean beauty picks</span>
        </div>
      </section>

      <section className="home-brands">
        <div className="home-shell">
          <p className="home-brands__label">
            Loved by modern beauty shoppers and styled like a premium launch
            page
          </p>
          <div className="home-brands__row">
            {brandMentions.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="home-services">
        <div className="home-shell home-services__grid">
          {serviceHighlights.map(({ icon: Icon, title, text }) => (
            <article key={title} className="home-service-card">
              <span className="home-service-card__icon">
                <Icon />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-categories">
        <div className="home-shell">
          <div className="home-section-heading">
            <span>Shop by mood</span>
            <h2>Four refined worlds, arranged like a campaign.</h2>
            <p>
              Each collection is framed with a stronger visual identity so the
              homepage feels intentional, spacious, and brand-led instead of
              busy.
            </p>
          </div>

          <div className="home-categories__grid">
            {categories.map((category, index) => (
              <article
                key={category.title}
                className="home-category-card"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <img src={category.image} alt={category.title} />
                <div className="home-category-card__overlay" />
                <div className="home-category-card__content">
                  <span>{category.eyebrow}</span>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="home-featured">
        <div className="home-shell">
          <div className="home-section-heading home-section-heading--split">
            <div>
              <span>Best sellers</span>
              <h2>Best sellers presented with cleaner hierarchy.</h2>
            </div>
            <p>
              Better spacing, quieter surfaces, and stronger pricing emphasis
              make the product area feel closer to the storefronts people
              remember.
            </p>
          </div>

          <div className="home-product-grid">
            {featured.map((item, index) => (
              <article
                key={item.id}
                className="home-product-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link
                  to={`/product/${item.id}`}
                  className="home-product-card__image-wrap"
                >
                  <span className="home-product-card__tag">Top pick</span>
                  <img src={item.image} alt={item.name} />
                </Link>

                <div className="home-product-card__body">
                  <div className="home-product-card__meta">
                    <span>Signature finish</span>
                    <div className="home-rating">
                      <FiStar />
                      <FiStar />
                      <FiStar />
                      <FiStar />
                      <FiStar />
                    </div>
                  </div>

                  <Link
                    to={`/product/${item.id}`}
                    className="home-product-card__title"
                  >
                    {item.name}
                  </Link>

                  <p className="home-product-card__description">
                    Soft-focus finish, lightweight feel, and an easy daily
                    ritual.
                  </p>

                  <div className="home-product-card__price">
                    <strong>Tk.{item.new_price}</strong>
                    <span>Tk.{item.old_price}</span>
                  </div>

                  <button
                    type="button"
                    className="home-button home-button--small"
                    onClick={() => addToCart(item.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-editorial">
        <div className="home-shell home-editorial__grid">
          <div className="home-editorial__media">
            <img src={bannerWomen} alt="Women collection" />
            <div className="home-editorial__accent-card">
              <span>Limited campaign</span>
              <strong>Soft-focus formulas, stronger silhouettes.</strong>
            </div>
          </div>

          <div className="home-editorial__content">
            <span className="home-kicker">Editorial drop</span>
            <h2>
              Designed to feel closer to a launch campaign than a generic shop
              grid.
            </h2>
            <p>
              The layout now leans into spacious luxury: fewer visual
              interruptions, stronger typography, more premium imagery blocks,
              and product storytelling that feels curated.
            </p>

            <div className="home-editorial__points">
              <div>
                <strong>01</strong>
                <p>Large visual anchors create instant premium brand energy.</p>
              </div>
              <div>
                <strong>02</strong>
                <p>
                  Micro-depth and floating cards add a three-dimensional touch.
                </p>
              </div>
              <div>
                <strong>03</strong>
                <p>
                  Product sections stay conversion-friendly and easy to scan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-arrivals">
        <div className="home-shell">
          <div className="home-section-heading home-section-heading--split">
            <div>
              <span>Fresh arrivals</span>
              <h2>New arrivals with a more premium shopping rhythm.</h2>
            </div>
            <p>
              The page now alternates between product density and editorial
              breathing room so shopping feels smoother and more elevated.
            </p>
          </div>

          <div className="home-arrivals__layout">
            <div className="home-arrivals__grid">
              {arrivals.map((item, index) => (
                <article
                  key={item.id}
                  className="home-arrival-card"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <Link
                    to={`/product/${item.id}`}
                    className="home-arrival-card__media"
                  >
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <div className="home-arrival-card__body">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                    <div className="home-arrival-card__price">
                      <strong>Tk.{item.new_price}</strong>
                      <span>Tk.{item.old_price}</span>
                    </div>
                    <button
                      type="button"
                      className="home-button home-button--small home-button--secondary"
                      onClick={() => addToCart(item.id)}
                    >
                      Add to cart
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="home-promo-card">
              <img src={bannerKids} alt="Kids collection" />
              <div className="home-promo-card__content">
                <span>Gift edit</span>
                <h3>Build a playful bundle for festive moments.</h3>
                <p>
                  Pair glow care, body favorites, and soft accessories in one
                  curated package made to feel elevated.
                </p>
                <Link
                  to="/product/8"
                  className="home-button home-button--primary"
                >
                  View collection <FiArrowRight />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
