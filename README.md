# Basket Quest

Interactive shopping-basket planner. Pick a challenge, build a basket within budget and tags, get live recommendations, check out with MobilePay, and earn Quest Points on your profile.

## Features

- Challenge picker with live scoring and progress
- Product catalogue with categories and tags
- Basket with quantity controls and free parcel-shop delivery threshold
- Recommendations based on your current basket
- Account login / sign-up with profile and Quest Points
- Checkout with delivery options and MobilePay
- About and Contact pages
- Cart, session, and profile data saved in the browser (`localStorage`)

## Run locally

No build step required.

```bash
npm start
```

Then open [http://localhost:5173](http://localhost:5173).

Or open `index.html` directly in your browser (use a local server if scripts are blocked).

## Stack

- HTML
- Vanilla JavaScript
- Tailwind CSS (CDN)
- Custom CSS (`styles.css`)

## Project structure

```
basket-quest/
├── index.html      # Pages and markup
├── styles.css      # Custom styles
├── js/
│   └── app.js      # App logic (cart, scoring, auth, checkout)
├── package.json    # Local static server script
└── README.md
```
