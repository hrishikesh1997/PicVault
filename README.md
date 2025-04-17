# 📸 PicVault

PicVault is a photo management and search platform built with **Node.js**, **Express**, and **Sequelize**. It allows users to:
- Create user profiles
- Search and save photos
- Tag photos
- View tag-based and history-based search results

---

## 🚀 Project Structure


PicVault/ ├── config/ # Database configurations ├── controller/ # All controller logic (user, photo, tags, etc.) ├── lib/ # Utility/helper libraries (if any) ├── migrations/ # Sequelize migration files ├── models/ # Sequelize models (user, photo, tags, searchHistory) ├── node_modules/ # Node dependencies ├── seeders/ # Sequelize seed data (optional) ├── tests/ # Jest test cases ├── validations/ # Request validations (e.g., Joi, Yup) ├── .env # Environment variables ├── .gitignore # Files ignored by Git ├── app.js # Express app setup & routes ├── index.js # App entry point ├── package.json # Project metadata and scripts └── README.md # You're reading it 😄



---

## 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/hrishikesh1997/PicVault.git
cd PicVault

# Install dependencies
npm install

# Set up .env file
cp .env.example .env
# Fill in the required env variables like DB config, API keys, etc.
# Database Config
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=picvault_db
DB_PORT=5432
# Unsplash API
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
# Server
PORT=5000



🛠️ Available Scripts
npm start           # Start the server
npm run dev         # Start server in dev mode (with nodemon)
npm test            # Run Jest tests
npx sequelize-cli   # Sequelize CLI (for migrations/seeding)

📡 API Endpoints
Method | Endpoint | Description
POST | /api/users | Create a new user
GET | /search/photos | Search for photos (e.g., from Unsplash)
POST | /api/photos | Save a photo
POST | /api/photos/:photoID/tags | Add tags to a photo
GET | /api/photos/tag/search | Search photos by tags
GET | /api/search-history | Fetch user's search history

✅ Technologies Used
Node.js
Express.js
Sequelize ORM
PostgreSQL (via Supabase or local DB)
Jest for testing
Unsplash API (for photo search)


🧪 Testing
npm test

✨ Future Enhancements
User authentication (Google/GitHub OAuth)
Pagination & filtering for search results
Frontend integration (React, Next.js, etc.)
Photo preview & download

Made with ❤️ by Hrishikesh
GitHub Repo - https://github.com/hrishikesh1997/PicVault


