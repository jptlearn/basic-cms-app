# Express Passport Authenticator App

A robust authentication system built with Express.js and Passport, featuring both local authentication and Google OAuth 2.0 integration.

## Features

- Local authentication (username/password)
- Google OAuth 2.0 integration
- Session management
- Protected routes
- User registration and login
- Secure password handling
- Database integration with Sequelize
- Input Validation
- Error Handling

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- Google OAuth 2.0 credentials

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd express-passport-authenticator-app
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
   PORT=your_port_number
   DB_NAME=your_database_name
   DB_HOST=your_database_host
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1hr
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   EXPRESS_SESSION_SECRET=your_session_secret

   ```

5. Start the application:

   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Routes

### Local Authentication

- `POST /auth/user/register`: Register a new user
- `POST /auth/user/login` : Login with uusername and password
- `GET /auth/user/logout` : Logout user

### Google OAuth 2.0 Authentication

- `GET /auth/google`: Initiate Google OAuth 2.0 authentication
- `GET /auth/google/callback`: Handle Google OAuth 2.0 callback

### Protected Routes

- `GET /auth/user`: Access a protected route (requires authentication)

## Usage

- Visit the home page to see the welcome message.
- Use the `/auth/user` route for user authentication.
- Use the `/auth/google` route to authenticate with Google.

## Middleware

- **authMiddleware**: Protects routes by ensuring the user is authenticated before accessing certain pages.
- **rateLimitMiddleware**: Limits the number of requests from a single IP address within a specified time window.

## Security Features

- Session management with secure cookies
- HTTP-only cookies
- Password hashing using bcrypt
- Protected routes middleware
- Input validation and sanitization
- Comprehensive error handling
- Rate limiting for auth routes
- Security headers with helmet

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

- Fork the repository
- Create your feature branch ( git checkout -b feature/amazing-feature )
- Commit your changes ( git commit -m 'Add some amazing feature' )
- Push to the branch ( git push origin feature/amazing-feature )
- Open a Pull Request

## Acknowledgments

- [Express](https://expressjs.com/)
- [Passport.js](http://www.passportjs.org/)
- [EJS](https://ejs.co/)
- [Node.js](https://nodejs.org/)
- [Sequelize](sequelize.org/)
