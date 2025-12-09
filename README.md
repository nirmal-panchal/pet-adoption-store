# Pet Adoption Management System

A full-stack web application for managing pet adoptions, connecting shelters with potential adopters. Built with Next.js, Node.js, Express, and MongoDB.

## Features

### For Users
- **Browse Pets**: Search and filter available pets by species, breed, age, and status
- **Pet Details**: View comprehensive information about each pet
- **Apply for Adoption**: Submit adoption applications for available pets
- **Track Applications**: Monitor the status of submitted applications (pending, approved, rejected)
- **User Dashboard**: Manage all applications in one place

### For Admins
- **Pet Management**: Full CRUD operations for pet listings
- **Application Management**: Review and process adoption applications
- **Application Status Updates**: Approve or reject applications

### General Features
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Responsive Design**: Professional, clean UI that works on all devices
- **Real-time Updates**: Live status updates for applications
- **Search & Filtering**: Advanced filtering options for finding the perfect pet

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Project Structure

```
pet-store/
├── client/                 # Frontend Next.js application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # API clients, auth context, utilities
│   │   └── types/         # TypeScript type definitions
│   └── package.json
│
├── server/                # Backend Express API
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Auth & validation middleware
│   │   ├── scripts/       # Utility scripts (seed data, create admin)
│   │   └── index.ts       # Server entry point
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pet-store
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/pet-adoption
   JWT_SECRET=your-secret-key-here
   PORT=4000
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

   Create a `.env.local` file in the `client` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000/api
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:4000`

2. **Start the Frontend**
   ```bash
   cd client
   npm run dev
   ```
   Application will run on `http://localhost:3000`

### Seed Data

#### Create Admin User
```bash
cd server
npm run create-admin
```
Default admin credentials:
- Email: `admin@petadoption.com`
- Password: `admin123`

#### Seed Sample Pets
```bash
cd server
npm run seed
```
This will add 10 sample pets to the database.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Pets
- `GET /api/pets` - Get all pets (with filters)
- `GET /api/pets/:id` - Get pet by ID
- `POST /api/pets` - Create pet (Admin only)
- `PUT /api/pets/:id` - Update pet (Admin only)
- `DELETE /api/pets/:id` - Delete pet (Admin only)

### Applications
- `GET /api/applications/my` - Get user's applications
- `GET /api/applications` - Get all applications (Admin only)
- `POST /api/applications/:petId` - Apply for pet adoption
- `PUT /api/applications/:id/status` - Update application status (Admin only)

## Usage

### For Regular Users

1. **Create an Account**
   - Click "Create Account" on the homepage
   - Fill in username, email, and password
   - Submit the registration form

2. **Browse Pets**
   - Navigate to "Browse Pets"
   - Use search and filters to find pets
   - Click on a pet card to view details

3. **Apply for Adoption**
   - On the pet detail page, click "Apply to Adopt"
   - Your application will be submitted
   - Track status in your dashboard

4. **Check Application Status**
   - Go to "My Dashboard" from the user menu
   - View all your applications and their statuses

### For Admins

1. **Login with Admin Account**
   - Use admin credentials to login
   - Access "Admin Dashboard" from user menu

2. **Manage Pets**
   - Click "Manage Pets" in admin dashboard
   - Add new pets with the "Add New Pet" button
   - Edit or delete existing pets

3. **Review Applications**
   - Click "Manage Applications" in admin dashboard
   - View all pending applications
   - Approve or reject applications

## Environment Variables

### Backend (`server/.env`)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `PORT` - Server port (default: 4000)

### Frontend (`client/.env.local`)
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed sample pets
- `npm run create-admin` - Create admin user

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Design Philosophy

The application follows a clean, professional design approach:
- **Minimal & Clean**: No unnecessary animations or "AI-ish" elements
- **Professional UI**: Industry-standard components from shadcn/ui
- **Consistent Styling**: Gray color palette with professional typography
- **User-Friendly**: Intuitive navigation and clear feedback
- **Responsive**: Works seamlessly on desktop, tablet, and mobile

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with role-based access control
- Input validation with Zod schemas
- MongoDB injection prevention with Mongoose

## License

This project is created for educational purposes.

## Contributors

Built as an assignment project for demonstrating full-stack development skills.
