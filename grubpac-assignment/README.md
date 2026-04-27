# Content Broadcasting System - Backend

A Node.js/Express backend for a Content Broadcasting System where teachers upload subject-based materials, and principals approve them for public broadcasting to students.

## Features
- **JWT Authentication**: Secure login and registration.
- **RBAC**: Different permissions for Teachers and Principals.
- **Content Management**: Upload images (JPG, PNG, GIF) with title, subject, and description.
- **Scheduling**: Define start and end times for content visibility.
- **Rotation Logic**: Continuous looping of content based on duration (Subject-based).
- **Public API**: Live broadcasting endpoint for students.
- **Professional Architecture**: Separation of concerns using Controllers, Services, and Models.
- **Standardized Responses**: Consistent success and error JSON formatting.

## Tech Stack
- **Node.js** (Express)
- **Sequelize ORM**
- **MySQL** (Local Development Database)
- **PostgreSQL / Supabase** (Production Database - Optional)
- **JWT** (Authentication & RBAC)
- **Bcryptjs** (Secure Password Hashing)
- **Multer** (File Validation & Processing)
- **Node-Cache** (Bonus: API Caching)
- **AWS SDK v3** (Bonus: S3 Storage Support)
- **Helmet & CORS** (Security Best Practices)

---

## Local Development Setup (MySQL)

### Prerequisites
- **Node.js** >= 18.0.0
- **MySQL** installed and running on port 3306
- **MySQL root password** set to `root`

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
The `.env` file is already configured for local MySQL development with the following settings:

```env
PORT=8080
NODE_ENV=development
DB_NAME=grubpac_db
DB_USER=root
DB_PASSWORD=root
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DIALECT=mysql
JWT_SECRET=grubpac_jwt_secret_key_change_in_production
UPLOAD_PATH=uploads/
MAX_FILE_SIZE=10485760
```

> **Note**: The application will automatically create the `grubpac_db` database if it doesn't exist.

### Step 3: Run the Application
```bash
npm run dev
```

The server will:
1. Auto-create the `grubpac_db` database if it doesn't exist
2. Connect to MySQL via Sequelize ORM
3. Sync all database models (User, Content, ContentSlot, ContentSchedule)
4. Start the server on `http://localhost:8080`

### Step 4: Verify the Setup
```bash
curl http://localhost:8080/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Production Deployment (Supabase/PostgreSQL)

For production deployment on platforms like Render, Vercel, or Railway:

1. Set the `DATABASE_URL` environment variable:
   ```env
   DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
   ```

2. The application will automatically detect `DATABASE_URL` and use PostgreSQL with SSL.

---

## Optional Features (100% Bonus Coverage)
1. **Redis/In-memory Caching**: Implemented in `broadcastService.js` to cache `/content/live` responses for 60 seconds, reducing database load.
2. **Rate Limiting**: Integrated `express-rate-limit` to protect public and auth APIs.
3. **S3 Cloud Upload**: Built a flexible `storageService.js` that supports both Local and S3 storage via environment configuration.
4. **Subject-wise Analytics**: Advanced analytics endpoint for principals to track subject activity and content usage.
5. **Pagination & Filters**: Full support for `page`, `limit`, `subject`, `teacher`, and `status` across all list endpoints.

## API Usage

### Auth Module
- `POST /api/auth/register`: Register a new user (role: 'teacher' or 'principal').
- `POST /api/auth/login`: Login and receive JWT.
- `GET /api/auth/me`: Get current user profile.

### Teacher Module
- `POST /api/content/upload`: Upload content (Requires JWT, role: 'teacher').
  - Body (form-data): `title`, `subject`, `description`, `startTime`, `endTime`, `rotationDuration`, `file`.
- `GET /api/content/my-content`: View uploaded content status with pagination and filters.
  - Query: `?page=1&limit=10&subject=Math&status=approved`

### Principal Module
- `GET /api/content/all`: View all content with pagination and filters.
  - Query: `?page=1&limit=10&teacherId=1&status=pending`
- `GET /api/content/pending`: View pending approvals.
- `PATCH /api/content/approve/:id`: Approve/Reject content.
  - Body: `{ "status": "approved" | "rejected", "rejectionReason": "string" }`
- `GET /api/analytics/subjects`: Get subject-wise analytics.

### Public Broadcasting
- `GET /content/live/:teacherId`: Get currently active content for a teacher.
  - Returns the active content for each subject handled by the teacher.

## Assumptions & Logic
- **Scheduling**: If a teacher uploads multiple contents for the same subject, they rotate continuously within the overlapping time window.
- **Rotation Duration**: Defaults to 5 minutes per content if not specified.
- **Time Windows**: Content is only considered for rotation if the current time is between `startTime` and `endTime`.
- **Database**: Uses MySQL for local development and PostgreSQL for production (via `DATABASE_URL`).
- **Uploads**: Files are stored locally in the `uploads/` directory (Cloud S3 ready architecture).

## Demo
- **Demo Video**: [Link to Video]
- **API Documentation**: [Link to Postman/Swagger]
- **Deployment**: [Link to Live App]

