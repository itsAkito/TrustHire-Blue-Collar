# TrustHire Backend

Node.js/Express backend for the TrustHire blue-collar job platform.

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── constants.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   └── Review.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── workerController.js
│   │   ├── employerController.js
│   │   ├── jobController.js
│   │   └── applicationController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── workerRoutes.js
│   │   ├── employerRoutes.js
│   │   ├── jobRoutes.js
│   │   └── applicationRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── validators.js
│   │   └── uploadMiddleware.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── helpers.js
│   └── index.js
├── .env.example
├── package.json
└── README.md
```

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create `.env` file (copy from `.env.example`):
   ```
   cp .env.example .env
   ```

3. Configure PostgreSQL database settings in `.env`

4. Run migrations:
   ```
   npm run migrate
   ```

5. Start development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Worker Routes
- `GET /api/workers/jobs` - Get available jobs
- `POST /api/workers/apply/:jobId` - Apply for a job
- `GET /api/workers/profile` - Get worker profile
- `PUT /api/workers/profile` - Update worker profile

### Employer Routes
- `POST /api/employers/jobs` - Create a job
- `GET /api/employers/jobs` - Get employer's jobs
- `PUT /api/employers/jobs/:jobId` - Update a job
- `DELETE /api/employers/jobs/:jobId` - Delete a job
- `GET /api/employers/dashboard` - Get dashboard statistics

### Jobs
- `GET /api/jobs` - Get all jobs with filters
- `GET /api/jobs/:jobId` - Get job details

## Database Schema

### Users Table
- id (UUID)
- name
- email
- password
- phone
- role (worker/employer)
- profile_photo
- verified
- createdAt
- updatedAt

### Jobs Table
- id (UUID)
- employer_id (FK)
- title
- description
- location
- salary
- job_type
- requirements
- created_at
- updated_at

### Applications Table
- id (UUID)
- job_id (FK)
- worker_id (FK)
- status
- applied_at

### Reviews Table
- id (UUID)
- reviewer_id (FK)
- reviewee_id (FK)
- rating
- comment
- created_at

## Environment Variables

See `.env.example` for all required environment variables.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Validation**: Joi
- **File Upload**: Multer + Cloudinary
