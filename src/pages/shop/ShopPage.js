import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiBox,
  FiFilter,
  FiLayers,
  FiShoppingBag,
  FiStar,
  FiTruck,
} from 'react-icons/fi';

import { ShopContext } from '../../context/ShopContext';
import './ShopPage.css';

const filterOptions = [
  { id: 'all', label: 'All Drops' },
  { id: 'new', label: 'New Arrival' },
  { id: 'bestseller', label: 'Best Seller' },
  { id: 'premium', label: 'Premium Picks' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
];

const storefrontNotes = [
  {
    icon: FiBox,
    title: 'Sculpted Packaging',
    text: 'Rounded silhouettes, glossy finishes, and product-first framing.',
  },
  {
    icon: FiLayers,
    title: 'Layered Display',
    text: 'A 3D-inspired shopping view with floating objects and depth.',
  },
  {
    icon: FiTruck,
    title: 'Fast Delivery',
    text: 'Dhaka dispatch in 24 hours for the latest beauty edits.',
  },
];

const getProductProfile = (product, index) => {
  const profiles = [
    {
      accent: 'Rose Quartz',
      finish: 'Soft Glow',
      filter: 'new',
      tone: 'glass-rose',
      rating: 4.9,
    },
    {
      accent: 'Pearl Mist',
      finish: 'Cloud Touch',
      filter: 'premium',
      tone: 'glass-pearl',
      rating: 4.8,
    },
    {
      accent: 'Amber Silk',
      finish: 'Golden Lift',
      filter: 'bestseller',
      tone: 'glass-amber',
      rating: 5.0,
    },
    {
      accent: 'Cocoa Veil',
      finish: 'Velvet Wear',
      filter: 'premium',
      tone: 'glass-cocoa',
      rating: 4.7,
    },
  ];

  return {
    ...profiles[index % profiles.length],
    badge: index < 3 ? 'Editor Pick' : index % 2 === 0 ? 'Trending Now' : 'Studio Choice',
    product,
  };
};

const ShopPage = () => {
  const { all_product, addToCart } = useContext(ShopContext);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const preparedProducts = all_product.map((product, index) => getProductProfile(product, index));

  const filteredProducts = preparedProducts
    .filter(({ filter }) => activeFilter === 'all' || filter === activeFilter)
    .sort((left, right) => {
      if (sortBy === 'price-low') {
        return left.product.new_price - right.product.new_price;
      }

      if (sortBy === 'price-high') {
        return right.product.new_price - left.product.new_price;
      }

      return left.product.id - right.product.id;
    });

  const averagePrice = Math.round(
    all_product.reduce((total, product) => total + product.new_price, 0) / all_product.length,
  );

  return (
    <main className='shop-page'>
      <section className='shop-hero'>
        <div className='page-shell shop-hero__grid'>
          <div className='shop-hero__content'>
            <span className='shop-kicker'>3D storefront experience</span>
            <h1>Shop the soft-luxury collection in a modern floating gallery.</h1>
            <p>
              A cleaner way to browse your beauty and fashion essentials with sculpted cards,
              glassmorphism panels, and rich visual depth that feels premium on every screen.
            </p>

            <div className='shop-hero__actions'>
              <a href='#shop-catalog' className='shop-button shop-button--primary'>
                Browse Collection <FiArrowRight />
              </a>
              <Link to='/' className='shop-button shop-button--ghost'>
                Back to Home
              </Link>
            </div>

            <div className='shop-hero__stats'>
              <article>
                <strong>{all_product.length}</strong>
                <span>Curated products</span>
              </article>
              <article>
                <strong>Tk. {averagePrice}</strong>
                <span>Average edit price</span>
              </article>
              <article>
                <strong>4.9/5</strong>
                <span>Customer satisfaction</span>
              </article>
            </div>
          </div>

          <div className='shop-hero__visual' aria-hidden='true'>
            <div className='shop-orb shop-orb--one'></div>
            <div className='shop-orb shop-orb--two'></div>
            <div className='shop-orb shop-orb--three'></div>

            <div className='shop-stage'>
              <div className='shop-stage__ring'></div>
              <div className='shop-stage__pedestal'>
                <div className='shop-stage__pedestal-top'></div>
                <div className='shop-stage__product shop-stage__product--one'></div>
                <div className='shop-stage__product shop-stage__product--two'></div>
                <div className='shop-stage__product shop-stage__product--three'></div>
              </div>

              <div className='shop-float-card shop-float-card--top'>
                <span>Fresh Drop</span>
                <strong>Glass-skin essentials</strong>
                <small>Curated for a polished premium shelf look.</small>
              </div>

              <div className='shop-float-card shop-float-card--bottom'>
                <FiStar />
                <div>
                  <span>Design Note</span>
                  <strong>3D object layering</strong>
                  <small>Depth, shadow, and motion are doing the heavy lifting.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='shop-insights page-shell'>
        {storefrontNotes.map(({ icon: Icon, title, text }) => (
          <article key={title} className='shop-insight-card'>
            <div className='shop-insight-card__icon'>
              <Icon />
            </div>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className='shop-catalog page-shell' id='shop-catalog'>
        <div className='shop-catalog__toolbar'>
          <div>
            <span className='shop-kicker'>Store collection</span>
            <h2>Browse the full edit</h2>
          </div>

          <div className='shop-controls'>
            <div className='shop-filter-group' role='tablist' aria-label='Product filters'>
              {filterOptions.map(({ id, label }) => (
                <button
                  key={id}
                  type='button'
                  className={id === activeFilter ? 'is-active' : ''}
                  onClick={() => setActiveFilter(id)}
                >
                  <FiFilter />
                  {label}
                </button>
              ))}
            </div>

            <label className='shop-sort'>
              <span>Sort by</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                {sortOptions.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className='shop-catalog__layout'>
          <aside className='shop-sidebar'>
            <span className='shop-kicker'>Shelf concept</span>
            <h3>Modern visual merchandising for a girls product brand.</h3>
            <p>
              The page uses floating gradients, translucent surfaces, soft peach lighting, and
              pseudo-3D display blocks so the shop feels more designed and less template-based.
            </p>

            <div className='shop-sidebar__chips'>
              <span>Glassmorphism</span>
              <span>Soft peach</span>
              <span>3D pedestals</span>
              <span>Mobile friendly</span>
            </div>

            <Link to='/' className='shop-button shop-button--secondary'>
              Explore homepage story
            </Link>
          </aside>

          <div className='shop-grid'>
            {filteredProducts.map(({ product, accent, finish, badge, tone, rating }) => (
              <article key={product.id} className={`shop-card ${tone}`}>
                <span className='shop-card__badge'>{badge}</span>

                <div className='shop-card__visual'>
                  <div className='shop-card__shadow'></div>
                  <div className='shop-card__pedestal'></div>
                  <img src={product.image} alt={product.name} />
                </div>

                <div className='shop-card__meta'>
                  <div className='shop-card__eyebrow'>
                    <span>{accent}</span>
                    <span>
                      <FiStar />
                      {rating}
                    </span>
                  </div>

                  <Link to={`/product/${product.id}`} className='shop-card__title'>
                    {product.name}
                  </Link>
                  <p>{finish}</p>

                  <div className='shop-card__footer'>
                    <div className='shop-card__price'>
                      <strong>Tk. {product.new_price}</strong>
                      <span>Tk. {product.old_price}</span>
                    </div>

                    <button type='button' onClick={() => addToCart(product.id)}>
                      <FiShoppingBag />
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShopPage;
