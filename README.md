# Basic CMS (Content Management System) App

## Overview

This project is a fully developed backend application powered by the Express framework, running within the Node.js runtime environment. It provides a basic Content Management System (CMS) that allows users to register, add blogs, view blogs, and modify their own blogs.

## Features

- **User Registration**: Users can create an account.
- **Blog Management**: Users can add, view, and modify their blogs.
- **Logout Feature**: Users can log out from the system.
  -\*\*

## Technology Stack

- **Backend Framework**: Express
- **Database**: MySQL
- **ORM**: Sequelize (Object Relational Mapping)

## Benefits of ORM

Object Relational Mapping allows us to connect to the database in an object-oriented style, making querying very easy. Instead of writing raw SQL queries, we can use models as objects and utilize their methods to perform queries.

## Installation

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up your database configuration in the `.env` file.

5. Run the application:
   ```bash
   npm start
   ```

## Usage

After starting the application, you can access the API endpoints to register users and manage blogs.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.
