
## ZeroTrust Access System

A secure full-stack authentication system built on the Zero Trust model.

Features:

* Email-based OTP authentication (1-minute expiry)
* JWT token issuance with role-based access control
* HTTPS communication with self-signed certificates
* React (Vite) frontend with Material UI
* Express.js backend with Sequelize and MySQL
* Planned: Secure video feed integration protected by token auth

---

Tech Stack:

* Frontend: React, Vite, Material UI
* Backend: Node.js, Express.js, Sequelize
* Database: MySQL
* Security: JWT, CORS, Helmet, Winston, HTTPS (mkcert or manual certs)
* Email: Nodemailer with Gmail SMTP

---

How to Run the Project:

1. Clone the repository:
   git clone [https://github.com/your-username/zero-trust-access-system.git](https://github.com/your-username/zero-trust-access-system.git)
   cd zero-trust-access-system

2. Backend setup:

   * Navigate to the backend folder:
     cd backend
   * Install dependencies:
     yarn install
   * Create a `.env` file with the following variables:
     JWT\_SECRET=your\_jwt\_secret
     EMAIL\_USER=[your\_email@gmail.com](mailto:your_email@gmail.com)
     EMAIL\_PASS=your\_app\_password
   * Add your self-signed HTTPS certs in a `cert/` folder:

     * cert.pem (public cert)
     * key.pem (private key)
   * Start the backend:
     yarn dev

3. Frontend setup:

   * Navigate to the frontend folder:
     cd ../frontend
   * Install dependencies:
     yarn install
   * Start the frontend:
     yarn dev

4. Open the app:
   [http://localhost:5173](http://localhost:5173)

---

Security Notes:

* CORS is locked to `localhost:5173`
* Tokens expire after 15–60 minutes by default
* All sensitive routes require a valid JWT
* OTPs are one-time use and removed from memory after verification

---
