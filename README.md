# End Result (SSE Demo)
https://github.com/user-attachments/assets/54b5e30a-a55d-4773-96bb-c8da44e52ad4

# Postman Request
https://github.com/user-attachments/assets/1e313c60-e7e6-46ce-a467-3817602ea862

# Project Setup Guide

This guide will help you set up and run both the frontend and backend servers for this project.

## Frontend Setup

The frontend is a React application located inside the `FE/my-react-app` folder. To install dependencies and start the development server, follow these steps:

1. Navigate to the frontend directory:
   ```sh
   cd FE/my-react-app
   ```
2. Install dependencies using npm:
   ```sh
   npm i
   ```
   - This command installs all required packages listed in `package.json`. These dependencies are essential for the project to function properly.
3. Start the development server:
   ```sh
   npm run dev
   ```
   - This starts the React development server, allowing you to preview your app in the browser.
   - By default, the server will run on `http://localhost:5173/`.

## Backend Setup

The backend is a Python-based web server located in the `WS/python` folder. To install dependencies and start the backend server, follow these steps:

1. Navigate to the backend directory:
   ```sh
   cd WS/python
   ```
2. Install required dependencies:
   ```sh
   pip install -r requirements.txt
   ```
   - This command reads the `requirements.txt` file and installs all necessary Python packages for the backend.
3. Start the backend server using Uvicorn:
   ```sh
   uvicorn app:app --reload
   ```
   - This command launches the FastAPI-based web server using Uvicorn.
   - The `--reload` flag enables automatic reloading of the server whenever changes are made to the code.

Once both servers are running, you can interact with the application through the frontend, which will communicate with the backend server.

Happy coding!

