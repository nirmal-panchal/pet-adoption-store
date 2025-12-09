# Pet Adoption Management System - Backend

A RESTful API for a pet adoption management system built with Node.js, Express, TypeScript, and MongoDB.

## Features

### User Roles
- **Visitor**: Browse pets, view pet details
- **User**: Register/login, apply to adopt pets, view adoption status
- **Admin**: Manage pets (CRUD), view and approve/reject adoption applications, update pet status

### Functionality
- User authentication with JWT
- Role-based authorization (User, Admin)
- Pet management with CRUD operations
- Search pets by name or breed
- Filter pets by species, breed, age range, and status
- Pagination for pet listings
- Adoption application workflow
- Automatic pet status updates based on application decisions

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Password Hashing**: bcryptjs

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pet-store
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (use `.env.example` as template):
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/pet-adoption
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
```

5. Make sure MongoDB is running:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux with systemd
sudo systemctl start mongod

# Or run MongoDB manually
mongod --dbpath /path/to/data/directory
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The server will start on `http://localhost:3000` with hot-reloading enabled.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
  - Body: `{ username, email, password, role? }`
  - Returns: JWT token

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: JWT token

### Pets (Public)
- `GET /api/pets` - List all pets
  - Query params: `search`, `species`, `breed`, `minAge`, `maxAge`, `status`, `page`, `limit`
  - Returns: Paginated list of pets

- `GET /api/pets/:id` - Get single pet details

### Pets (Admin Only)
- `POST /api/pets` - Create a new pet
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ name, species, breed, age, description, imageUrl? }`

- `PUT /api/pets/:id` - Update a pet
  - Headers: `Authorization: Bearer <token>`
  - Body: Any pet fields to update

- `DELETE /api/pets/:id` - Delete a pet
  - Headers: `Authorization: Bearer <token>`

### Applications (User)
- `POST /api/applications` - Apply to adopt a pet
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ petId, message? }`

- `GET /api/applications/my` - Get user's own applications
  - Headers: `Authorization: Bearer <token>`

### Applications (Admin Only)
- `GET /api/applications` - Get all applications
  - Headers: `Authorization: Bearer <token>`
  - Query params: `status`, `page`, `limit`

- `GET /api/applications/:id` - Get single application details
  - Headers: `Authorization: Bearer <token>`

- `GET /api/applications/pet/:petId` - Get applications for specific pet
  - Headers: `Authorization: Bearer <token>`

- `PATCH /api/applications/:id/status` - Update application status
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ status: 'pending' | 'approved' | 'rejected' }`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

To get a token, register or login using the authentication endpoints.

## Example Usage

### 1. Register an admin user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### 2. Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### 3. Create a pet (use token from login):
```bash
curl -X POST http://localhost:3000/api/pets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "name": "Buddy",
    "species": "Dog",
    "breed": "Golden Retriever",
    "age": 3,
    "description": "Friendly and energetic dog",
    "imageUrl": "https://example.com/buddy.jpg"
  }'
```

### 4. List pets with filters:
```bash
curl "http://localhost:3000/api/pets?species=Dog&minAge=2&maxAge=5&page=1&limit=10"
```

### 5. Apply for adoption (as a regular user):
```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <user-token>" \
  -d '{
    "petId": "<pet-id>",
    "message": "I would love to adopt this pet!"
  }'
```

### 6. Approve application (as admin):
```bash
curl -X PATCH http://localhost:3000/api/applications/<application-id>/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "status": "approved"
  }'
```

## Project Structure

```
src/
├── controllers/          # Request handlers
│   ├── authController.ts
│   ├── petController.ts
│   └── applicationController.ts
├── models/              # Mongoose models
│   ├── User.ts
│   ├── Pet.ts
│   └── Application.ts
├── routes/              # Route definitions
│   ├── auth.ts
│   ├── pets.ts
│   └── applications.ts
├── middlewares/         # Custom middleware
│   ├── auth.ts          # JWT authentication & authorization
│   └── validate.ts      # Input validation
├── app.ts              # Express app configuration
└── index.ts            # Server entry point
```

## Database Models

### User
- username (unique)
- email (unique)
- password (hashed)
- role (user/admin)
- timestamps

### Pet
- name
- species
- breed
- age
- description
- status (available/adopted/pending)
- imageUrl (optional)
- timestamps

### Application
- user (ref to User)
- pet (ref to Pet)
- status (pending/approved/rejected)
- message (optional)
- timestamps
- Unique constraint on (user, pet) combination

## Business Logic

### Adoption Workflow
1. User applies for a pet (pet status → pending)
2. Admin reviews application
3. If approved:
   - Application status → approved
   - Pet status → adopted
   - All other pending applications for same pet → rejected
4. If rejected:
   - Application status → rejected
   - If no other pending applications exist, pet status → available

## Development

The project uses:
- `nodemon` for auto-reloading during development
- `ts-node` for running TypeScript directly
- TypeScript strict mode for type safety
- Express middleware for request validation and error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC
