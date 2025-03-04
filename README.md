# Healthcare Backend API

## Overview
This project is a backend system for a healthcare application built using **Node.js**, **Express.js**, and **PostgreSQL**. It allows users to register, log in, and manage patient and doctor records securely with JWT authentication.

## Technologies Used
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Sequelize ORM**
- **JWT Authentication**
- **dotenv** for environment management

## Database Schema Explanation

### User Table
The **User** table stores user information, including their name, email, and password. Each user has a unique email and an automatically generated ID.

### Patient Table
The **Patient** table contains records of patients, including their name, age, and disease. Each patient is linked to a user, meaning only the user who created a patient can manage their records.

### Doctor Table
The **Doctor** table keeps details about doctors, including their name, age, and medical specialty.

### Patient-Doctor Mapping Table
The **Patient-Doctor Mapping** table establishes a many-to-many relationship between patients and doctors. It records which doctors are assigned to which patients, allowing multiple doctors to be linked to a single patient and vice versa.

## API Endpoints

### Authentication
- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Authenticate a user and return JWT

### Patient Management
- **POST /api/patients** - Add a new patient (Authenticated users only)
- **GET /api/patients** - Retrieve all patients created by the authenticated user
- **GET /api/patients/:id** - Get details of a specific patient
- **PUT /api/patients/:id** - Update patient details
- **DELETE /api/patients/:id** - Delete a patient record

### Doctor Management
- **POST /api/doctors** - Add a new doctor (Authenticated users only)
- **GET /api/doctors** - Retrieve all doctors
- **GET /api/doctors/:id** - Get details of a specific doctor
- **PUT /api/doctors/:id** - Update doctor details
- **DELETE /api/doctors/:id** - Delete a doctor record

### Patient-Doctor Mapping
- **POST /api/mappings** - Assign a doctor to a patient
- **GET /api/mappings** - Retrieve all patient-doctor mappings
- **GET /api/mappings/:patientId** - Get all doctors assigned to a specific patient
- **DELETE /api/mappings/:id** - Remove a doctor from a patient

---
Let me know if you need further modifications! 🚀

