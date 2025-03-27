# Ceramic Marketplace

## Overview
Ceramic Marketplace is a full-stack web application for browsing, reserving, and managing ceramic products. It features a React frontend for a dynamic user interface and an Express backend for a scalable API, with MongoDB as the database. The project is containerized using Docker and orchestrated with Docker Compose, with GitHub Actions for CI/CD to ensure code quality and automated workflows.

## Features
- **Frontend**:
  - Dynamic UI with React for a responsive, component-based experience.
  - Client-side routing with `react-router-dom` for pages like admin, auth, user, vendor, and product.
  - API integration using `axios` to communicate with the backend.
  - Toast notifications with `react-toastify`.
  - Icons from `lucide-react`, `react-icons`, and `@fortawesome/fontawesome-free`.
  - JWT-based authentication with `jwt-decode`.
  - Testing with React Testing Library and Jest.
- **Backend**:
  - RESTful API built with Express for efficient request handling.
  - MongoDB integration with `mongoose` for flexible data storage.
  - Authentication using `jsonwebtoken` and password hashing with `bcrypt`.
  - File uploads with `multer` and storage via `minio`.
  - Cross-origin support with `cors`.
  - Testing with Jest, `supertest`, and `@shelf/jest-mongodb` for MongoDB mocking.
- **DevOps**:
  - Docker for containerization and Docker Compose for multi-container management.
  - GitHub Actions for CI/CD, including linting and testing.

## Project Structure
- **Frontend** (`frontend/`):
  - `src/`: Contains React components (`components/`), pages (`pages/`), and styles (`styles/`).
  - `public/`: Static assets and `index.html`.
- **Backend** (`ceramic-marketplace/backend/`):
  - `controllers/`: Business logic for API endpoints.
  - `models/`: MongoDB schemas using Mongoose.
  - `routes/`: API route definitions.
  - `tests/`: Jest test files.
  - `uploads/`: Directory for file uploads.
  - `server.js`: Entry point for the Express server.
- **Root**:
  - `docker-compose.yml`: Defines services (`frontend`, `backend`, `mongo`).
  - `backend.yml`: GitHub Actions workflow for CI/CD.

## Technologies Used
- **Frontend**:
  - React (`react`, `react-dom` v19.0.0): For building the UI.
  - React Router (`react-router-dom` v7.2.0): For navigation.
  - Axios (`axios` v1.7.9): For API requests.
  - React Toastify (`react-toastify` v11.0.5): For notifications.
  - JWT Decode (`jwt-decode` v4.0.0): For handling JWT tokens.
  - Icons: `lucide-react` (v0.477.0), `react-icons` (v5.5.0), `@fortawesome/fontawesome-free` (v6.7.2).
  - Testing: `@testing-library/react` (v16.2.0), `@testing-library/jest-dom` (v6.6.3), `@testing-library/user-event` (v13.5.0), `@testing-library/dom` (v10.4.0).
  - React Scripts (`react-scripts` v5.0.1): For build and test scripts.
  - ESLint (`eslint` v8.57.1): For linting.
  - Web Vitals (`web-vitals` v2.1.4): For performance monitoring.
- **Backend**:
  - Express (`express` v4.21.2): For the API server.
  - MongoDB with Mongoose (`mongoose` v8.10.1): For data storage.
  - JWT (`jsonwebtoken` v9.0.2) and Bcrypt (`bcrypt` v5.1.1): For authentication.
  - Multer (`multer` v1.4.5-lts.1) and MinIO (`minio` v8.0.5): For file uploads and storage.
  - CORS (`cors` v2.8.5): For cross-origin requests.
  - Dotenv (`dotenv` v16.4.7): For environment variables.
  - Babel (`@babel/*`): For transpiling modern JavaScript.
  - Testing: Jest (`jest` v29.7.0), Supertest (`supertest` v7.1.0), `@shelf/jest-mongodb` (v4.3.2).
  - ESLint (`eslint` v9.23.0, `eslint-plugin-react` v7.37.4): For linting.
- **DevOps**:
  - Docker: For containerization.
  - Docker Compose: For managing services.
  - GitHub Actions: For CI/CD (linting, testing).

## Prerequisites
- **Node.js**: Version 20 (as specified in the `Dockerfile`).
- **Docker** and **Docker Compose**: For containerized setup.
- **MongoDB**: For the database (handled by Docker Compose).

## Installation
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd ceramic-marketplace
