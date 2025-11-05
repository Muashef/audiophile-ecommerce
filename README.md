### Audiophile E-commerce 

 This project implements a full checkout flow for an e-commerce website using Next.js (App Router), TypeScript, TailwindCSS, Convex for server state, and Nodemailer for transactional emails. It supports a dummy payment flow, stores orders in Convex, and sends confirmation emails to customers.

---

### Features

- Cart Management: Add, update, and remove items from the cart using jotai state management.

- Checkout Form: Collects customer details including name, email, phone, shipping address, and payment method.

- Payment Methods:

  - E-Money (with number and PIN)

  - Cash on Delivery

- Order Storage: Orders are stored in Convex database without requiring user login.

- Email Notifications: Sends order confirmation emails via Nodemailer.

- Confirmation Page: Displays the order summary after successful checkout.

- TailwindCSS Styling: Responsive UI consistent with the Figma design.

## Getting Started

- Installation

- Clone the repository:

 - git clone https://github.com/Muashef/audiophile-ecommerce.git
 - cd audiophile-ecommerce

- Install dependencies:

 - npm install

 - npm run dev

- Visit http://localhost:3000
