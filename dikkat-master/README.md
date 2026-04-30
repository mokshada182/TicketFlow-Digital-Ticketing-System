# **Dikkat**

A secure school complaint management system

---

## Overview

**Dikkat** is a full-stack web application designed to streamline the submission, tracking, and review of school-related complaints.
The platform provides a secure and authenticated workflow for students to submit complaints and view their own records, while enabling administrators to access and review all submissions centrally.

Access is restricted through institutional email validation to ensure that only authorized users can use the system.

---

## Features

### Authentication and Authorization

* Email-based authentication using Clerk
* Access restricted to approved institutional email domains
* Automatic sign-out and redirection for unauthorized users

### Complaint Submission

* Pre-filled student information including name and admission number
* Structured complaint form with class and section selection
* Client-side validation to prevent incomplete submissions

### Complaint Logs

* Student view

  * Displays only complaints submitted by the logged-in student
  * Chronologically ordered with formatted timestamps
* Administrative view

  * Displays all submitted complaints
  * Reverse-ordered for latest-first inspection

### Backend API

* REST-style endpoints implemented using the Next.js App Router
* MongoDB persistence using Mongoose
* Stateless request handling for data fetch and submission

---

## Technology Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* DaisyUI

### Backend

* Next.js API routes
* MongoDB Atlas
* Mongoose

### Authentication

* Clerk

### Deployment

* Vercel

---

## Project Structure

```txt
app/
├── api/
│   └── complaints/        # Complaint GET and POST endpoints
├── lib/
│   ├── db.js              # MongoDB connection logic
│   └── model/
│       └── complaint.js   # Complaint schema
├── submit/                # Complaint submission page
├── log/                   # Student complaint logs
├── logs/                  # Administrative complaint logs
├── validation/            # Email domain validation
├── sign-in/               # Clerk sign-in
├── sign-up/               # Clerk sign-up
├── about/                 # About page
├── layout.js              # Root layout and providers
└── page.js                # Landing page
```

---

## Database Schema

```js
Complaint {
  admno: String,        // Admission number
  email: String,        // User email
  name: String,         // Student name
  stdClass: String,     // Class
  section: String,      // Section
  comp: String,         // Complaint content
  date: Date            // Auto-generated timestamp
}
```

---

## Application Flow

1. User signs in or signs up
2. Email domain validation is performed

   * Valid domain results in redirection to the complaint submission page
   * Invalid domain results in forced sign-out
3. Complaint is submitted and stored in the database
4. Complaint logs are displayed based on user access level

---

## Environment Variables

Create a `.env.local` file with the following entries:

```env
password=YOUR_MONGODB_PASSWORD
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_KEY
CLERK_SECRET_KEY=YOUR_CLERK_SECRET
```

---

## Running Locally

```bash
npm install
npm run dev
```

The application will be available at:

```txt
http://localhost:3000
```
