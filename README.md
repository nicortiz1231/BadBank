# BadBank

BadBank is a full-stack banking application built as part of the MIT xPRO Full Stack Development program.

The project is intentionally insecure and is meant to demonstrate why securely storing and protecting user data is important.

## Live Demo

[https://bad-bank-rho.vercel.app](https://bad-bank-rho.vercel.app)

## Showcase

![BadBank](BadBankDemo.gif)

## Features

- Create an account
- Log in and log out
- Deposit funds
- Withdraw funds
- View account balance
- Persist data with MongoDB
- View stored account data
- Basic overdraft protection

## Tech Stack

- React
- JavaScript
- Node.js
- Express
- MongoDB Atlas
- Bootstrap
- Vercel
- Render

## How It Works

The React frontend communicates with an Express API, which stores account information and balances in MongoDB Atlas.

The application was later updated to improve state handling, persist deposits and withdrawals, use environment variables, and support full-stack deployment.

## Why "BadBank"?

BadBank intentionally demonstrates poor security practices, including exposing user information that a real application should protect.

A real banking application would require secure authentication, password hashing, authorization, protected API routes, and other security controls.

## Run Locally

Backend:

```bash
cd server
npm install
npm start
```

Frontend:

```bash
cd client
npm install
npm start
```

Environment variables are required for the MongoDB connection and backend API URL.

## Disclaimer

This project is for educational purposes only and should not be used for real financial transactions or sensitive user data.
