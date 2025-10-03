# PocketPilot

PocketPilot is a full-stack personal finance management application designed to help users track their income and expenses effectively. It features a responsive user interface with data visualizations and a robust backend to manage financial data securely.

## Key Features

- **User Authentication**: Secure sign-up and login functionality using JWT (JSON Web Tokens).
- **Interactive Dashboard**: A central hub to view your total balance, total income, and total expenses at a glance.
- **Income & Expense Management**: Easily add, view, and delete income and expense records.
- **Data Visualization**:
    - Pie charts for a financial overview and breakdown of recent income sources.
    - Bar charts to visualize monthly income and expenses over the last 30 days.
    - Line charts to track expense trends over time.
- **Transaction History**: View lists of all income and expense transactions, with options to delete individual records.
- **Data Export**: Download your income and expense records as Excel (`.xlsx`) files.
- **Profile Customization**:
    - Update your name, email, and password.
    - Upload, change, or remove your profile picture.
    - Select your preferred currency from a list of options (e.g., USD, EUR, INR).
- **Responsive Design**: A user-friendly interface that works on both desktop and mobile devices.
- **Dark Mode**: Switch between light and dark themes for comfortable viewing.

## Tech Stack

### Frontend

- **Framework**: React.js with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context API
- **Charts**: Recharts
- **HTTP Client**: Axios
- **UI/UX**: `react-hot-toast` for notifications, `react-icons` for icons

### Backend

- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: `bcryptjs` for password hashing
- **File Handling**: `multer` for image uploads
- **Excel Generation**: `xlsx` for exporting data
- **Environment Management**: `dotenv`

## Project Structure

The repository is organized into two main directories:

-   `frontend/`: Contains the React client application, including components, pages, state management, and utility functions.
-   `backend/`: Contains the Node.js server, including API routes, controllers, database models, and middleware for authentication and file uploads.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm (or your preferred package manager)
-   MongoDB (running locally or a cloud instance)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create an environment file:**
    Create a `.env` file in the `backend` directory and add the following variables:
    ```env
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    PORT=8000
    CLIENT_URL=http://localhost:5173
    ```
4.  **Run the server:**
    For development with automatic reloading:
    ```bash
    npm run dev
    ```
    To start the server for production:
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## API Endpoints

The backend exposes the following RESTful API endpoints:

| Method | Endpoint                       | Description                                      | 
| :----- | :----------------------------- | :----------------------------------------------- | 
| `POST` | `/api/v1/auth/register`        | Register a new user.                             | 
| `POST` | `/api/v1/auth/login`           | Log in an existing user.                         | 
| `GET`  | `/api/v1/auth/getUser`         | Get current user's information.                  | 
| `PATCH`| `/api/v1/auth/update-profile`  | Update the current user's profile.               | 
| `PATCH`| `/api/v1/auth/update-currency` | Update the user's preferred currency.            | 
| `POST` | `/api/v1/auth/upload-image`    | Upload a profile image.                          | 
| `PATCH`| `/api/v1/auth/delete-image`    | Delete the user's profile image.                 | 
| `GET`  | `/api/v1/dashboard`            | Get aggregated data for the dashboard.           | 
| `POST` | `/api/v1/income/add`           | Add a new income record.                         | 
| `GET`  | `/api/v1/income/get`           | Get all income records for the user.             | 
| `DELETE`| `/api/v1/income/delete/:id`    | Delete an income record by its ID.               | 
| `GET`  | `/api/v1/income/downloadExcel` | Download all income records as an Excel file.    | 
| `POST` | `/api/v1/expense/add`          | Add a new expense record.                        | 
| `GET`  | `/api/v1/expense/get`          | Get all expense records for the user.            | 
| `DELETE`| `/api/v1/expense/:id`          | Delete an expense record by its ID.              | 
| `GET`  | `/api/v1/expense/downloadExcel`| Download all expense records as an Excel file.   |
