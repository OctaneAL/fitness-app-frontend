# Energo Fit - Front End

Energo Fit is a web application for recording and tracking physical workouts. This platform allows users to easily create, edit, and view their workouts, monitor their progress, and use workout templates for convenience. The project features a large catalog with 2000+ exercises and offers various training features, such as user statistics, template usage, and favorite exercises management.

## Main Features

- **Authentication**: 
  - User registration and login using JWT tokens.
  
- **User Profile**:
  - Displays detailed user statistics with all workouts.
  - Ability to view and edit individual workouts.
  
- **Workouts**:
  - Record workouts with detailed information (exercise name, sets, weights, etc.).
  - Ability to view, create, and use workout templates.
  
- **Exercise Catalog**:
  - A catalog with over 2000 exercises where users can browse, add to favorites, and use exercises.
  - Search and filter exercises by different parameters (type, target muscles, equipment, etc.).

## Technologies

The project is developed using the following technologies:

- **React**: Main framework for UI development.
- **React Router**: For routing and navigation throughout the application.
- **Bootstrap**: For responsive and stylish layouts.
- **Favicons**: For icons used within the interface.

## Prerequisites

### Backend Dependency
- The Energo Fit frontend **requires** the [Energo Fit Backend](https://github.com/OctaneAL/fitness-app-backend) repository, which is written in **Rust** using the **Actix** framework. It handles all backend operations and must be running to provide the necessary API endpoints for the frontend.

### Database Setup
- The backend is designed to work with a PostgreSQL database, which you will need to set up yourself. You can use a Docker container to create this database instance, as was done in this project setup.

## Integration with Back End

- The project uses a REST API with over 20 endpoints to provide functionality for workouts, user profile statistics, and exercise management.
- Authentication is implemented using JWT tokens to protect user data and requests.

## Challenges

One of the main challenges was ensuring smooth interaction with a large dataset in the exercise catalog (2000+ items) and creating a user-friendly and efficient interface. Implementing complex functionality for Back End interaction through REST API with JWT authentication required special attention to security and optimization.

## Screenshots

- **Homepage**: Shows the general appearance of the application and the interface.
- **User Profile**: Displays workout statistics (planned to improve the design further).
- **Workout Template**: An example of a created workout template with added exercises.

## Getting Started

The project is already deployed and available for use at [Energo Fit - Live](http://ec2-51-20-193-148.eu-north-1.compute.amazonaws.com/).

However, if you'd like to run the project locally, you can use Docker:

- The Docker container is available under the name `octaneal/fitness-app-frontend`.
  
**Note**: The frontend requires the backend `octaneal/fitness-app-backend` container to be running, and the PostgreSQL database must be set up separately.

## Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/energo-fit-frontend.git
   cd energo-fit-frontend
   
## Running with Docker

Pull and start the frontend container:
   ```bash
   docker pull octaneal/fitness-app-frontend
   docker run -p 3000:3000 octaneal/fitness-app-frontend
