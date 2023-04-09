# Ringer - Social Media Web App

Ringer is a social media web app where users can post, like, and view reels. It is built using Node.js, Express, MongoDB, and React.

## Features

- User authentication and authorization using JWT
- Posting of images and videos
- Liking and unliking of posts
- Viewing of reels with auto-play and auto-pause functionality
- Pagination of posts and reels
- Responsive design for mobile and desktop devices

## Installation

1. Clone the repository: `git clone https://github.com/<username>/<repository>.git`
2. Install dependencies:
   - Server: `cd server && npm install`
   - Client: `cd client && npm install`
3. Set up environment variables by creating a `.env` file in the `server` directory and copying the contents of `.env.example` into it. Then replace the placeholder values with your own values.
4. Start the server and client:
   - Server: `cd server && npm start`
   - Client: `cd client && npm start`
5. Access the app in a web browser at http://localhost:3000

## API Endpoints

### /api/auth

- POST `/register`: Register a new user
- POST `/login`: Authenticate a user and generate a JWT token

### /api/posts

- GET `/:` Get all posts
- POST `/:` Create a new post
- PUT `/:id/like`: Like a post by ID
- PUT `/:id/unlike`: Unlike a post by ID

### /api/reels

- GET `/:` Get all reels

## Technologies

- Node.js
- Express
- MongoDB
- React
- Bootstrap

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
