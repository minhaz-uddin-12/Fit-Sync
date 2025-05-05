# FitSync

A comprehensive fitness management system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that helps users track workouts, book trainers, and maintain their fitness journey.

## Features

- **User Authentication**
  - Secure registration and login system
  - Role-based access (Member, Trainer, Admin)
  - Password encryption and JWT token authentication
  - Password reset functionality

- **Member Features**
  - Track workouts and exercises
  - View workout statistics and progress
  - Book training sessions with trainers
  - Calculate BMI and get recommendations
  - View available equipment and facilities
  - Access workout history and analytics

- **Trainer Features**
  - Manage client bookings and schedules
  - Track client progress
  - Create and assign workout plans
  - Update availability and profile

- **Admin Features**
  - Manage users (members and trainers)
  - Monitor system statistics
  - Handle equipment inventory
  - Manage facility information

- **Additional Features**
  - Responsive design for all devices
  - Real-time notifications
  - Secure API endpoints
  - Data visualization for progress tracking

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Axios
- React Router
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt
- Joi Validation

## Installation

1. Clone the repository
```bash
git clone https://github.com/minhaz-uddin-12/FitSync
```

2. Install dependencies for backend
```bash
cd server
npm install
```

3. Install dependencies for frontend
```bash
cd client
npm install
```

4. Set up environment variables
Create .env files in both client and server directories with necessary variables:

Server .env:
```
MONGODB_URI=my_mongodb_url
JWT_SECRET=my_jwt_secret
PORT=5000
```

5. Run the application
```bash
# Run backend server
cd server
npm run dev

# Run frontend
cd client
npm run dev
```

## Project Structure

```
FitSync/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # Reusable components
│       ├── contexts/      # React contexts
│       ├── pages/        # Page components
│       └── services/     # API services
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── utils/           # Utility functions
└── README.md            # Project documentation
```

## API Documentation

The API documentation can be found in the [FitSync API Documentation.pdf](./API%20Documentation.pdf) file.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from various fitness applications
- Icons from Font Awesome
- UI components from Tailwind CSS
- Animations from Framer Motion