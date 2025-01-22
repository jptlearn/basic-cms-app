# Express Passport Authentication App

A web application built with Node.js, Express, and Passport.js for user authentication. This application demonstrates how to set up user authentication using session management and integrates Google OAuth for authentication.

## Features

- User registration and login
- Google OAuth authentication
- Session management
- Middleware for route protection
- EJS view engine for rendering dynamic HTML pages

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to build web applications.
- **Passport.js**: Middleware for authentication in Node.js applications.
- **EJS**: Templating engine for rendering HTML views.
- **dotenv**: Module to load environment variables from a `.env` file.
- **Express-session**: Middleware for managing sessions in Express applications.
- **Cookie-parser**: Middleware for parsing cookies in HTTP requests.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/express-passport-authentication-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd express-passport-authentication-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:

   ```plaintext
   PORT=3000
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

5. Start the application:

   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Visit the home page to see the welcome message.
- Use the `/auth/user` route for user authentication.
- Use the `/auth/google` route to authenticate with Google.

## Middleware

- **authMiddleware**: Protects routes by ensuring the user is authenticated before accessing certain pages.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## Acknowledgments

- [Express](https://expressjs.com/)
- [Passport.js](http://www.passportjs.org/)
- [EJS](https://ejs.co/)
- [Node.js](https://nodejs.org/)
