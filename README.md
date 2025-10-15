# 🔍 Code Review Assistant

An AI-powered code review platform that automatically analyzes source code for readability, modularity, potential bugs, and best practices using Google's Gemini 2.5 Flash LLM.

## ✨ Features

- 📤 **Multi-Language Support**: JavaScript, TypeScript, Python, Java, C++, C, Go, Rust
- 🤖 **AI-Powered Analysis**: Google Gemini 2.5 Flash integration
- 📊 **Comprehensive Scoring**: Overall, Readability, Modularity scores (1-10)
- 🐛 **Bug Detection**: Identifies issues with severity levels (High/Medium/Low)
- 💡 **Smart Suggestions**: Line-specific fixes and best practices
- 📜 **Review History**: Track all previous code reviews
- 🔐 **Secure Auth**: JWT-based authentication

## 🛠 Tech Stack

**Frontend**: React, React Router, Tailwind CSS, Axios  
**Backend**: Node.js, Express, PostgreSQL, Multer  
**AI/LLM**: Google Gemini 2.5 Flash  

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/code-review-assistant.git
cd code-review-assistant
```

### 2. Backend Setup
```bash
cd server
npm install

# Create .env file
cat > .env << EOF
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/code_review_db
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
GEMINI_API_KEY=your_gemini_api_key_here
EOF

# Setup database
npm run setup

# Start server
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Optional: Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start app
npm start
```

Visit `http://localhost:3000` 🚀

## 🎯 Usage

1. **Register/Login** → Create account or sign in
2. **Upload Code** → Drag & drop your code file (max 5MB)
3. **Get Analysis** → AI reviews your code in ~3-5 seconds
4. **View Report** → See scores, bugs, and suggestions
5. **Track History** → Access all previous reviews

## 📡 API Endpoints

### Authentication
```http
POST /api/auth/register
POST /api/auth/login
```

### Reviews (Protected)
```http
POST   /api/review/upload      # Upload code file
GET    /api/review/history     # Get all reviews
GET    /api/review/:id         # Get specific review
```

All review endpoints require: `Authorization: Bearer <token>`

### Why Gemini 2.5 Flash?
- ⚡ **Fast**: Real-time code analysis in 3-5 seconds
- 💰 **Cost-effective**: Lower API costs
- 🎯 **Accurate**: Excellent code understanding across languages
- 📝 **Structured**: Native JSON output support

## 📁 Project Structure

```
code-review-assistant/
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Auth context
│   │   └── services/        # API client
│   └── package.json
│
├── server/
│   ├── controllers/         # Business logic
│   ├── llm/                 # Gemini integration
│   ├── middleware/          # JWT auth
│   ├── routes/              # API routes
│   └── database_schema.sql  # DB schema
│
└── README.md
```

## 🎥 Demo

### Key Features Showcase:

**1. File Upload Interface**
- Drag-and-drop support
- File type validation
- Real-time upload status

**2. AI Analysis Results**
- Overall quality score (1-10)
- Readability & Modularity scores
- Line-specific bug detection
- Severity classification (High/Medium/Low)
- Actionable fix suggestions

**3. Review History Dashboard**
- Chronological listing of all reviews
- Quick metrics overview
- One-click access to detailed reports

## 🔒 Security

- Password hashing with bcrypt
- JWT authentication (7-day expiration)
- File type & size validation
- SQL injection prevention
- CORS protection

## 🚀 Future Enhancements

- Multi-file analysis
- GitHub/GitLab integration
- Custom rule configuration
- Team workspaces
- PDF export
- Code comparison across versions

## 📄 License

MIT License - feel free to use for your projects!

---
