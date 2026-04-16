# Project Memory

## Overview

- Project name in `package.json`: `girls-products-website`
- Actual product: a small React e-commerce storefront for girls'/fashion/beauty-style products
- Bootstrapped with Create React App
- Main runtime: React 18 + React Router 6 + Bootstrap / React Bootstrap
- State management is lightweight and local: React Context + `localStorage`

## Run Commands

- Dev server: `npm start` or `npm run dev`
- Production build: `npm run build`
- Tests: `npm test`

## App Structure

- Entry point: `src/index.js`
  - Wraps the whole app with `ShopContextProvider`
- Root app: `src/App.js`
  - Loads Bootstrap CSS globally
  - Uses `BrowserRouter`
  - Renders `NavBar` at the top and `Footer` at the bottom for all routes
- Main page: `src/pages/home/HomePage.js`
  - Composes homepage sections in this order:
    - `Slider`
    - `Card`
    - `Popular`
    - `Offers`
    - `NewCollection`

## Routes

- `/` -> homepage
- `/product/:productId` -> single product view

Notes:

- The product route is declared in a slightly unusual nested way in `src/App.js`:
  - parent route: `/product`
  - child route: `:productId`
- It still supports links like `/product/7`

## State and Data Flow

### Shop Context

File: `src/components/ShopContext.js`

- Exposes:
  - `all_product`
  - `cartItems`
  - `addToCart(itemId)`
  - `removeFromCart(itemId)`
- Cart is stored in React state and persisted to `localStorage` under the key `cartItems`
- `getDefaultCart()` creates an object keyed by product id-ish indexes with initial quantity `0`

Important implementation detail:

- `getDefaultCart()` loops from `0` to `all_product.length`, so it creates an extra key at `0`
- Current product ids are `1` through `11`, so this does not break the app, but it is a small data-shape mismatch

## Product Data Sources

### `src/components/Assets/all_product.js`

- Master catalog used by:
  - `ShopContext`
  - product detail page
  - cart rendering
- Contains 11 items
- All items currently use category `women`
- Many names and prices are repeated placeholder-like values

### `src/components/Assets/data.js`

- Used by `Popular`
- Contains 6 "Top Ranking" cards

### `src/components/Assets/new_collections.js`

- Used by `NewCollection`
- Contains 9 items
- Serves as the "All Products" grid on the homepage

## Main Components

### Navigation

File: `src/components/Navbar.js`

- Uses React Bootstrap `Navbar`, `Nav`, `Container`, `Form`, `InputGroup`
- Tracks:
  - `activeLink` for nav highlighting
  - `scrolled` for navbar style change on scroll
  - `isSidebarOpen` for cart sidebar visibility
- Pulls `cartItems` from context and shows total quantity badge
- Cart sidebar is rendered conditionally with the `Cart` component

Behavior notes:

- Nav links use plain `href`, not `Link`/`NavLink`
- Several links point to routes that do not exist yet:
  - `/shop`
  - `/feature`
  - `/contact`
  - `/about`
  - `/blog`
- Search input is UI-only right now; no search behavior is wired up
- "Register" and "LogIn" buttons point to `#contact`, but there is no matching section in the current homepage

### Homepage Sections

#### `src/components/Slider.js`

- Uses React Bootstrap `Carousel`
- Displays 3 banner images from `src/assets/img`
- Inline image height is set to `80vh`

#### `src/components/Card.js`

- Uses `react-multi-carousel`
- Shows 4 category-style tiles:
  - Skin Care
  - Body Care
  - Make Up
  - Spa Care

#### `src/components/Popular.js`

- Maps `data_product`
- Renders `Items` cards plus an `ADD TO CART` button
- Displays a padded rank number for each item

#### `src/components/Offers.js`

- Another React Bootstrap carousel
- Uses 2 offer images, with the second repeated as the third slide

#### `src/components/NewCollection.js`

- Maps `new_collections`
- Renders `Items` cards plus an `ADD TO CART` button
- Heading says "All Products" even though data comes from `new_collections`

### Product Card / Detail

#### `src/components/Items.js`

- Reusable product tile
- Clicking the image navigates to `/product/:id`
- Shows `name`, `new_price`, and optional `old_price`

#### `src/components/Product.js`

- Reads `productId` from router params
- Finds matching product from context `all_product`
- Renders `Breadcrum` and `ProductDisplay`

Risk:

- If an invalid `productId` is visited, `product` becomes `undefined`
- `Breadcrum` is safe because it uses optional chaining
- `ProductDisplay` is not safe and assumes `product` exists

#### `src/components/ProductDisplay.js`

- Uses `product.image`, `product.name`, `product.old_price`, `product.new_price`
- Shows repeated thumbnails from the same image
- Rating stars and review count are hardcoded
- Description text is placeholder lorem ipsum
- `ADD TO CART` uses context `addToCart(product.id)`

#### `src/components/Breadcrum.js`

- Simple breadcrumb text:
  - `HOME > SHOP > {product name}`
- Imports `Breadcrum.Module.css`, but the component file itself currently does not import that stylesheet

### Cart

#### `src/components/Cart.js`

- Thin wrapper around `CartItems`
- Receives `onClose`
- Renders close button labeled `X`

#### `src/components/CartItems.js`

- Iterates over `all_product`
- Shows only products where `cartItems[e.id] > 0`
- Supports remove/decrement only

Limitations:

- No cart total price
- No quantity increment control inside cart
- No checkout flow
- Remove button is text-only (`Delete`)

### Footer

File: `src/components/Footer.js`

- Built with `mdb-react-ui-kit`
- Social icons are present but most links use `#`
- Includes address, legal, and social sections
- Content is partly real, partly placeholder (`Lorem`, `#`, etc.)

## Styling

- Styling is done with plain CSS files named like `*.Module.css`
- These files are imported as regular global styles, not CSS Modules objects
- `Navbar.Module.css` is the largest stylesheet and also defines:
  - custom `@font-face` rules
  - base resets
  - global body typography
  - navbar and cart sidebar styling

Important styling note:

- Despite the `.Module.css` names, the project is mostly using them as global CSS
- That means class names can still collide across files if reused carelessly

## Assets

- Fonts live in `src/assets/font`
- General banners and misc images live in `src/assets/img`
- Product and commerce-specific assets live in `src/components/Assets`

Notable non-code assets:

- `src/components/Assets/PROJECT_REPORT.pdf`
- `src/assets/img/Animation - 1718006980725.json`
- `src/assets/img/LottieFiles_ Download Free lightweight animations for website & apps..html`

These look like stored reference/download artifacts rather than active runtime dependencies.

## Unused or Incomplete Pieces

- `src/components/DescriptionBox.js`
  - fully commented out
  - referenced but not rendered on product page
- `public/FakeData/project.json`
  - exists, but appears unused by current React code
- Several installed packages appear unused in current app code:
  - `@emailjs/browser`
  - `express`
  - `nodemailer`
  - `lottie-react`
  - `cors`

## Current Quality / Maintenance Notes

- Build now succeeds
- CRA toolchain is old and emits non-blocking warnings during build
- Product detail page still has a debug `console.log`
- Some route targets in the navbar do not exist
- Some text content is still placeholder
- There are no tests in the repo yet

## Good First Improvements

- Normalize routing with `Link` / `NavLink` and only expose real routes
- Add product-not-found handling on `/product/:productId`
- Convert global `.Module.css` usage either to real CSS Modules or rename files to plain `.css`
- Remove unused dependencies and orphaned assets
- Add cart totals and better cart controls
- Replace placeholder data/content with real catalog copy

## Files To Read First Next Time

- `src/App.js`
- `src/components/ShopContext.js`
- `src/components/Navbar.js`
- `src/pages/home/HomePage.js`
- `src/components/Product.js`
- `src/components/ProductDisplay.js`
- `src/components/CartItems.js`
- `src/components/Assets/all_product.js`
