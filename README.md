# Street vendor project
# Small Business Web Portal

This project is a web portal developed to support small businesses in expanding their reach, especially in the aftermath of the COVID-19 pandemic, which had a significant impact on their operations. The platform provides a space where users can easily connect with local business owners based on factors such as reviews, proximity, operating hours, and delivery time. This helps improve visibility and accessibility for small businesses, allowing them to better serve their community.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User-Friendly Interface**: Built with ReactJS to provide a responsive and interactive user experience.
- **Real-Time Data**: Utilizes Firebase for real-time data management, ensuring that users have up-to-date information about business operations.
- **Business Discovery**: Users can search for businesses based on various criteria including reviews, proximity, operating hours, and delivery times.
- **Review System**: Enables users to leave and read reviews, helping businesses gain credibility and visibility.
- **Geolocation-Based Search**: Finds businesses near the user’s current location to promote local shopping.
- **Secure Authentication**: Uses Firebase Authentication to securely manage user login and registration.

## Tech Stack

- **Frontend**: ReactJS
- **Backend**: NodeJS, ExpressJS
- **Database and Authentication**: Firebase
- **Hosting**: Firebase Hosting

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/small-business-web-portal.git
   cd small-business-web-portal
2. **Install frontend dependencies:**
  cd client
  npm install
3. **Install backend dependencies:**
cd ../server
npm install
4. **Configure Firebase:**
- Create a Firebase project at Firebase Console.
- Obtain your Firebase configuration details and replace it in the repo code
5. **Run the application:**
**Start the frontend server:**
  cd client
  npm start
**Start the backend server:**
  cd server
  npm start
**Access the application:**
- Open your browser and go to http://localhost:3000 to see the application in action.

## Usage

- **Sign Up/Login**: Users can register and log in to access the platform.
- **Search for Businesses**: Use the search functionality to find businesses by various criteria.
- **Leave Reviews**: After visiting a business, users can leave a review to help others in the community.
- **View Business Details**: Click on a business listing to see detailed information including operating hours and delivery options.
