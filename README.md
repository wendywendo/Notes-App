# Notes App

A simple and intuitive notes application built with modern web technologies. This app allows users to create, view, edit, and delete notes, ensuring seamless organization and productivity.

## Features

- **Create Notes**: Add new notes with ease.
- **Edit Notes**: Update existing notes to keep them up to date.
- **Delete Notes**: Remove notes no longer needed.
- **User-Friendly Interface**: A clean and responsive design for better user experience.
- **Authentication**: Secure login and signup using JWT tokens.

## Technologies Used

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Vercel

## Demo

Check out the live application: [Notes App](https://notes-app-59at.vercel.app/)

## Installation

Follow the steps below to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/wendywendo/Notes-App.git
   ```

2. Navigate to the project directory:
   ```bash
   cd client
   ```

   ```bash
   cd server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-secret-key
     ```

5. Start the development server (In both client and server):
   ```bash
   npm run dev
   ```

6. Open your browser and go to `http://localhost:5173`.


## License

This project is licensed under the [MIT License](LICENSE).
