# BTS Events – Rental Checkout & Shipping Calculator

This project is a rental checkout and delivery form built for **BTS Events**, designed to collect event requirements, calculate shipping costs, and submit rental requests via email.

The application allows users to select rental products or bundles, enter delivery details, and submit their request for processing.

---

## What This App Does

- Collects event and delivery information
- Allows selection of products and bundles
- Automatically calculates shipping boxes
- Calculates delivery and collection costs based on US shipping zones
- Sends the full request via email
- Sends a notification message to a Microsoft Teams channel

---

## Cart & Products

### Supported Item Types

- Single products
- Bundles

### Box Calculation Rules

- **Single products** use a `boxCapacity`
  - Example:
    - 30 iPads → 1 box
    - 6 Monitors → 2 boxes
- **Bundles** define a fixed `numberOfBoxes`

Total shipping boxes are calculated automatically from the cart contents.

---

## Shipping & Zones

Shipping is calculated based on:

- Selected US state
- Mapped shipping zone
- Number of shipping boxes

Each zone has a fixed cost per box.

Delivery and collection costs are calculated separately.

---

## Delivery & Event Form

The form collects:

### Personal & Event Details

- Name and contact information
- Consultant name
- BTS office
- Project reference
- Event start and end dates

### Delivery Information

- Delivery contact details
- Address
- US state and ZIP code
- Delivery instructions

### Attachments

- Optional configuration file upload

Form validation is handled client-side to ensure all required fields are completed correctly.

---

## Submission & Notifications

When the form is submitted:

- All form data and selected products are compiled
- The request is sent via email to the email address entered by the user and CC'ed to BTS
- A notification message is sent to a Microsoft Teams channel to alert the BTS team of a new request

---

## Data Persistence

- Cart data is stored using localStorage
- Selected dates and delivery state persist between page reloads

---

## Tech Stack

- React
- Vite
- TypeScript
- @tanstack/react-form
- Zod (validation)
- Tailwind CSS

---

## Running the Project

```bash
npm install
npm run dev
```

## 📌 Notes

- This project focuses on the frontend rental flow
- Email delivery and Teams notifications are handled externally
- No payment processing is included at this stage
