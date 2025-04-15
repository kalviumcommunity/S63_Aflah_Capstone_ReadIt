   

   Readit(MERN Stack)
Problem Statement
In today's digital era, online communities play a significant role in social interaction and content sharing. Reddit is one of the most popular platforms where users can create, discuss, and vote on posts. However, there is a need for a custom Reddit-like platform where users can share text, links, and images, upvote/downvote posts, and engage in discussions with enhanced features such as better UI/UX, authentication, and post sorting.
Challenges:
Implementing user authentication (login/register) securely.
Building a scalable and efficient database structure.
Managing state efficiently using Redux.
Handling upvotes/downvotes with real-time updates.
Implementing image uploads for posts and avatars.
Ensuring responsive design across devices.
Implementing sorting and pagination for large amounts of posts.
 
Solution
Reddish is a full-stack web application that provides a platform where users can:
Register/Login securely using JWT-based authentication.
Create and manage posts (text, links, or images).
Comment on posts and engage in discussions.
Upvote/Downvote posts and comments.
Sort posts based on different algorithms (Hot, Top, New, Controversial).
Search posts using a full-text search feature.
Paginate posts for better performance.
Upload images (posts & profile avatars) using Cloudinary.
Enable dark mode toggle with local storage save.
Show toast notifications for user actions.
 
Key Features
✔ User Authentication (Register/Login with JWT).
 ✔ CRUD operations for posts and comments.
 ✔ Upvote/Downvote system for posts and comments.
 ✔ Sorting posts by Hot, Top, New, and Controversial.
 ✔ Full database search for posts.
 ✔ Pagination for handling large sets of posts.
 ✔ Responsive UI that works on desktop, tablet, and mobile.
 ✔ Image Uploading via Cloudinary for posts and avatars.
 ✔ Dark mode toggle with state persistence.
 ✔ Real-time UI updates on user actions using Redux.
 ✔ Toast notifications for better user feedback.
 
Tech Stack
Frontend
React.js – Frontend framework
Redux – State management
Redux Thunk – Handling asynchronous actions
React Router – Routing & navigation
Material-UI – UI components and styling
Backend
Node.js – JavaScript runtime for backend
Express.js – Fast and lightweight web framework
MongoDB – NoSQL database for storing posts, users, and comments
Mongoose – Object modeling for MongoDB
JWT (JSON Web Token) – Authentication & authorization
Bcrypt.js – Secure password hashing
Validator.js – Data validation
Mongoose Unique Validator – Better handling of unique fields
Other Tools
Cloudinary – Image uploading and storage
Dotenv – Environment variables management
GitHub – Version control
Netlify/Heroku – Deployment of frontend/backend
🗓️ Week 1: Setup, Design & Basic Backend
Day 1-2: Project Initialization & Planning
Create GitHub repo with README, Projects, and Issues
Add low-fidelity design (wireframes)
Set up GitHub Projects board (create tasks/milestones)
Day 3-4: Backend Setup
Setup Node.js + Express.js backend
Connect to MongoDB Atlas
Create .env with config using dotenv
Create Mongoose schemas for User, Post, Comment
Implement basic CRUD routes (GET, POST)
Day 5-6: Authentication System
Implement registration and login with bcrypt & JWT
Add middleware for auth protection
Validate input with validator.js
Test routes with Postman/Bruno
Day 7: Frontend Setup
Initialize React app
Setup routing with React Router
Setup Redux & Redux Thunk for async flows
Deploy backend to Heroku
🗓️ Week 2: Core Features (Posts & Comments)
Day 8-9: Post CRUD
Create post form (text, link, image)
Display posts (basic feed)
Create/Update/Delete post
Connect to backend
Day 10-11: Comment System
Add comment model, schema & routes
Implement nested comment structure
Create comment frontend components
Day 12: Image Upload with Cloudinary
Setup Cloudinary
Allow users to upload images for posts
Store image URLs in DB
Day 13-14: Voting System
Implement upvote/downvote on posts and comments
Prevent multiple votes per user
Real-time vote updates with Redux state
🗓️ Week 3: Advanced Features
Day 15-16: Sorting & Pagination
Sort posts by New, Top, Hot, Controversial
Implement backend sorting logic
Paginate posts on backend + frontend
Day 17: Full-Text Search
Enable MongoDB full-text index on posts
Implement search API
Add frontend search bar
Day 18: Profile & Avatar Upload
Allow users to upload avatar
Display avatars on posts/comments
Day 19-20: UI/UX Improvements
Add Material UI for styling
Create dark mode toggle using localStorage
Add toast notifications for user actions
🗓️ Week 4: Testing, Optimization & Extras
Day 21-22: Testing & Code Cleanup
Add at least 5 unit tests using Jest
Test backend routes and frontend components
Clean up code, structure, and folders
Day 23-24: Dockerize Application
Create Dockerfile for backend
Dockerize MongoDB + Express backend
Day 25-26: Final Touches
Finalize UI and responsive design
Deploy frontend to Netlify
Fix any remaining bugs
Day 27-30: Level 2 Goals & Documentation
Submit PRs to 3 open source projects (10+ lines each)
Get 3 incoming PRs (ask peers/friends to contribute)
Submit project for user testing (5, 10, 50 users)
Document all features in README
Submit GitHub project board with 10+ entries across 10 days

backend deploylink : https://s63-aflah-capstone-readit.onrender.com
