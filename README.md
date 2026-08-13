# BadBank

BadBank is a full-stack banking application built as part of the MIT xPRO Full Stack Development program.

The project was created to demonstrate common banking workflows while intentionally exposing insecure data-handling practices. The goal is to show that a polished interface does not automatically mean an application is secure.

## Live Demo

[BadBank](https://bad-bank-rho.vercel.app)

## Showcase

![BadBank Demo](BadBankDemo.gif)

## Overview

BadBank simulates a simple online banking experience where users can create accounts, log in, manage a balance, deposit funds, withdraw funds, and inspect stored account information.

The frontend was later redesigned to give the project a more polished, portfolio-ready banking interface while preserving the intentionally insecure architecture that gives the project its name.

## Features

* Create a new banking account
* Log in and log out
* View an account overview
* Deposit funds
* Withdraw funds
* Prevent withdrawals that exceed the available balance
* Persist account data with MongoDB Atlas
* View stored user records in a dedicated security demonstration
* Responsive banking-style interface
* Production deployment across Vercel and Render

## Tech Stack

### Frontend

* React
* JavaScript
* React Router
* CSS
* Vercel

### Backend

* Node.js
* Express
* MongoDB
* MongoDB Atlas
* Render

## Architecture

BadBank uses a simple full-stack architecture:

```text
React Frontend
      |
      v
Express REST API
      |
      v
MongoDB Atlas
```

The React frontend sends requests to the Express API for account creation, authentication data, deposits, withdrawals, and account records.

The Express server communicates with MongoDB Atlas to persist user information and account balances.

## Why "BadBank"?

BadBank is intentionally insecure.

The project demonstrates several practices that a real banking application should never use, including exposing sensitive user data and storing credentials in a way that allows them to be retrieved directly.

These weaknesses are intentional and serve as the primary educational purpose of the project.

A production financial application would require security measures such as:

* Password hashing
* Secure authentication
* Protected sessions or tokens
* Authorization and access control
* Restricted API responses
* Input validation
* Rate limiting
* Secure secret management
* Auditing and monitoring

The project highlights the difference between an application that **looks secure** and one that is actually designed securely.

## UI Revamp

The original version of BadBank focused primarily on demonstrating full-stack functionality.

The interface was later redesigned to make the project more suitable for a professional portfolio while keeping the original security lesson intact.

The redesign includes:

* Modern online-banking inspired navigation
* Responsive page layouts
* Account overview dashboard
* Balance and transaction cards
* Improved deposit and withdrawal workflows
* Clear success and error states
* Security-focused messaging
* Dedicated insecure-data demonstration
* Consistent typography, spacing, colors, and visual hierarchy

## Running Locally

Clone the repository:

```bash
git clone https://github.com/nicortiz1231/BadBank.git
cd BadBank
```

### Backend

```bash
cd server
npm install
npm start
```

The backend runs locally on:

```text
http://localhost:5050
```

Create a `.env` file inside the `server` directory and provide your MongoDB Atlas connection string:

```env
ATLAS_URI=your_mongodb_atlas_connection_string
```

### Frontend

Open another terminal:

```bash
cd client
npm install
npm start
```

The React application will start on the local port configured by the project.

For local development, the frontend falls back to:

```text
http://localhost:5050
```

for API requests.

For production, the frontend uses:

```env
REACT_APP_API_URL=your_production_api_url
```

## Deployment

The production application is deployed using:

* **Vercel** for the React frontend
* **Render** for the Express API
* **MongoDB Atlas** for database persistence

The deployed frontend communicates with the Render API using the `REACT_APP_API_URL` environment variable.

## Project Purpose

BadBank began as an educational full-stack development exercise and evolved into a portfolio project focused on both application architecture and security awareness.

The project demonstrates experience with:

* React application development
* REST API integration
* Express routing
* MongoDB persistence
* State management
* Form validation
* Environment variables
* Full-stack deployment
* Responsive UI/UX design
* Security concepts and insecure implementation patterns

## Disclaimer

BadBank is for educational and demonstration purposes only.

It should **not** be used for real financial transactions, sensitive personal information, or real passwords.
