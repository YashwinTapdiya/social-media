# InstaBook - Social Media App 

InstaBook is a social media application where users can register, log in, post, comment, like etc. The platform is built using EJS, Node.js, MongoDB, RedisDB and various Node.js packages such as Nodemailer, Noty, Flash-connect, Passport Auths and more.

## 🔗 Live link

> ### Link [Web Application](http://18.206.163.33/)

## 📓Features

- **User Registration and Login:** Users can create an account and log in securely using Passport.js and JWT tokens.

- **Profile Management:** Users can update their profile details, including a profile picture, name, bio, and more.

- **Posts and Comments:** Users can create posts, view posts from friends, and leave comments on posts.

- **Likes:** Users can like and unlike posts and comments.

- **Friends:** Users can make friendship with other user on platform

- **Mails:** Users receive emails for resetting password links, for creating post, etc.

## ⚒️Upcomig Features

- **Chat Room:** User will able to chat with friends or can create chat rooms.

- **Better UI:** currenlty focued on backend infrastructure.

## 💻 Tech-Stack

- **EJS (Embedded JavaScript):** EJS is used for server-side rendering of dynamic web pages.

- **Node.js:** Node.js is the runtime environment used to build the backend server and handle HTTP requests.

- **MongoDB:** MongoDB is the database used to store user data, posts, comments, and other app-related information.

- **Passport.js:** Passport.js is used for user authentication, allowing users to log in securely.

- **JWT Tokens:** JWT (JSON Web Tokens) are used for secure authentication and user sessions.

- **Nodemailer:** Nodemailer is used to send emails for account verification and password reset.

- **Noty:** Noty is used to show user-friendly notifications to users.

- **Flash-connect:** Flash-connect is used to display flash messages for user interactions.

- **Multer:** Multer is used for handling file uploads, allowing users to upload profile pictures and post images.

- **Google OAuth:** Google OAuth is implemented for registration and login using Google accounts.

- **Redis:** Stored kue workers (for delayed jobs) in redis server in JSON format

- **Nginx:** Used Nginx for reverse proxy, load balancing, and caching.

- **AWS:** Used EC2 ubuntu machine to host the backend

## Getting Started

To run InstaBook locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/YashwinTapdiya/social-media.git
   cd social-media
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up MongoDB: Make sure you have MongoDB installed and running.

4. Configure Environment Variables: Set up environment variables for MongoDB connection, JWT secret, and other configurations.

5. Start the server:
   ```bash
   npm start
   ```

##  Follow Me:

> [LinkedIn](https://www.linkedin.com/in/yashwin-tapdiya/)
