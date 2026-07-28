# Basket Quest

Interactive shopping-basket planner. Pick a challenge, build a basket within budget, get live offers, check out with common payment methods (including MobilePay), and earn Quest Points on your profile.

## Features

- Challenge picker with live scoring and budget warnings
- Budget-aware product recommendations / offers
- Multi-page site: Shop, About (interactive vendors), Contact
- Account login with profile and Quest Points
- Checkout appears in the nav only when the basket has items
- Payment methods: Card, MobilePay, Apple Pay, Google Pay
- Cart and profile data saved in the browser (`localStorage`)

## Run locally

```bash
npm start
```

Open [http://localhost:5173](http://localhost:5173).

## Project structure

```
basket-quest/
├── index.html      # Shop, checkout, login, profile
├── about.html      # About + interactive vendors
├── contact.html    # Contact form
├── styles.css      # Shared styles
├── js/
│   └── app.js      # Shared app logic
├── package.json
└── README.md
```
