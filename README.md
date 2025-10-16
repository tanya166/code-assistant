# 🔍 CodeReview - AI-Powered Code Analysis Platform

An intelligent code review platform that automatically analyzes source code for readability, modularity, potential bugs, and best practices using Google's Gemini 2.5 Flash LLM.

## ✨ Features

- 📤 **Multi-Language Support**: JavaScript, TypeScript, Python, Java, C++, C, Go, Rust
- 🤖 **AI-Powered Analysis**: Google Gemini 2.5 Flash integration for intelligent code review
- 📊 **Comprehensive Scoring**: Overall, Readability, Modularity scores (1-10 scale)
- 🐛 **Bug Detection**: Identifies potential issues with severity levels (High/Medium/Low)
- 💡 **Smart Suggestions**: Line-specific fixes and actionable best practices
- 🚀 **Guest Reviews**: Try without signing up (results not saved)
- 📜 **Review History**: Authenticated users can track all previous reviews
- 🔐 **Secure Authentication**: JWT-based auth with bcrypt password hashing
- 📱 **Responsive Design**: Beautiful UI built with React & Tailwind CSS

## 🛠 Tech Stack

**Frontend**: 
- React 19.2, React Router 7.9, Tailwind CSS
- Lucide React icons, jwt-decode

**Backend**: 
- Node.js with Express 5.1
- PostgreSQL database
- Multer for file uploads
- Bcrypt for password hashing

**AI/LLM**: 
- Google Gemini 2.5 Flash API

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/code-assistant.git
cd code-assistant
```

### 2. Backend Setup
```bash
cd server
npm install

# Create .env file
cat > .env << EOF
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/code_review_db
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
GEMINI_API_KEY=your_gemini_api_key_here
EOF

# Create empty database (one-time setup)
psql -U postgres
CREATE DATABASE code_review_db;
\q

# Setup database tables and indexes
npm run setup

# Start development server
npm run dev
# or production
npm start
```

**Note:** The `npm run setup` command automatically creates all required tables and indexes. You only need to create an empty database named `code_review_db` first.

### 3. Frontend Setup
```bash
cd frontend
npm install

# Optional: Create .env file for custom API URL
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm start
```

Visit `http://localhost:3000` 🚀

## 🎯 How to Use

### For Everyone:
1. **Guest Review** → Click "Try Free" on landing page
2. **Upload Code** → Drag & drop or click to select file (max 5MB)
3. **Get Instant Analysis** → AI analyzes in ~3-5 seconds
4. **View Results** → See scores, bugs, and improvement suggestions

### For Registered Users:
1. **Sign Up/Login** → Create account or sign in
2. **Upload Code** → Same as guest, but results are saved
3. **Track History** → View all previous reviews in dashboard
4. **Compare Over Time** → Monitor code quality improvements
5. **Logout** → Secure session management

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
```http
POST /api/auth/register
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

POST /api/auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Review Routes (`/api/review`)

**Guest Upload (No Auth Required)**
```http
POST /api/review/guest-upload
Content-Type: multipart/form-data
- codeFile: <file>

Returns: { filename, language, analysis_result }
```

**Authenticated Routes (Require: `Authorization: Bearer <token>`)**
```http
POST /api/review/upload
Content-Type: multipart/form-data
- codeFile: <file>
Returns: { message, review }

GET /api/review/history
Returns: { reviews: [...] }

GET /api/review/:id
Returns: { review: {...} }
```

## 📁 Project Structure

```
code-review-assistant/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Landing.jsx           # Home page with CTA
│   │   │   ├── GetStarted.jsx        # Auth choice page
│   │   │   ├── Login.jsx             # Login form
│   │   │   ├── Register.jsx          # Registration form
│   │   │   ├── Dashboard.jsx         # File upload interface
│   │   │   ├── GuestReview.jsx       # Guest upload & results
│   │   │   ├── ReviewReport.jsx      # Detailed analysis view
│   │   │   ├── ReviewHistory.jsx     # All reviews list
│   │   │   └── Navbar.jsx            # Navigation component
│   │   ├── context/
│   │   │   └── AuthContext.js        # Auth state management
│   │   ├── services/
│   │   │   └── api.js                # Axios API client
│   │   ├── App.js                    # Main app & routing
│   │   └── index.css                 # Tailwind styles
│   └── package.json
│
├── server/
│   ├── controllers/
│   │   ├── authController.js         # Register & login logic
│   │   └── reviewController.js       # Code analysis logic
│   ├── llm/
│   │   └── llmservice.js             # Gemini API integration
│   ├── middleware/
│   │   └── auth.js                   # JWT verification
│   ├── routes/
│   │   ├── auth.js                   # Auth endpoints
│   │   └── review.js                 # Review endpoints & multer
│   ├── config/
│   │   └── db.js                     # PostgreSQL connection
│   ├── database_schema.sql           # DB tables & indexes
│   ├── setupDatabase.js              # DB initialization script
│   ├── index.js                      # Express server setup
│   └── package.json
│
└── README.md
```

## 🔑 Key Features Breakdown

### 🎨 Frontend Routes
- `/` → Landing page (public)
- `/get-started` → Choose Login/Register (public)
- `/login` → User login (public)
- `/register` → User registration (public)
- `/guest-review` → Try without signup (public)
- `/dashboard` → Upload interface (protected)
- `/review/:id` → View detailed report (protected)
- `/history` → All past reviews (protected)

### 🔐 Authentication Flow
1. User registers/logs in
2. Server returns JWT token (7-day expiration)
3. Token stored in browser localStorage
4. All protected requests include token in Authorization header
5. Middleware validates token on each request

### 🤖 Code Analysis Flow
1. User uploads code file
2. Server validates file type & size (max 5MB)
3. File content read and passed to Gemini API
4. Gemini analyzes code in structured JSON format
5. Results stored in database (if authenticated)
6. Results returned to frontend for display

## 📊 Supported File Types & Languages

| Extension | Language   |
|-----------|-----------|
| .js       | JavaScript |
| .jsx      | JavaScript |
| .ts       | TypeScript |
| .tsx      | TypeScript |
| .py       | Python    |
| .java     | Java      |
| .cpp      | C++       |
| .c        | C         |
| .go       | Go        |
| .rs       | Rust      |

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT authentication with 7-day expiration
- ✅ File type & size validation on frontend & backend
- ✅ SQL injection prevention with parameterized queries
- ✅ CORS protection with configured origins
- ✅ File cleanup after analysis (uploaded files deleted)
- ✅ Error handling without exposing sensitive info

## 🚀 Environment Variables

### Backend (.env)
```bash
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/code_review_db
JWT_SECRET=your_secret_key_here_minimum_32_characters
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env.local)
```bash
REACT_APP_API_URL=http://localhost:5000/api
```
## 🚀 Performance Optimizations
- ⚡ Gemini 2.5 Flash for fast analysis
- 🗄️ PostgreSQL indexes on frequently queried columns
- 📤 Multer disk storage for efficient file handling
- 💾 JSONB storage for flexible analysis results

## 📄 License

MIT License - Feel free to use for personal and commercial projects!

