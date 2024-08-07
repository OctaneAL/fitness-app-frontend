import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import statisticsImage from '../assets/images/statistics.jfif';
import gymBroImage from '../assets/images/gym-bro-reading-at-the-gym.jpg';
import databaseImage from '../assets/images/database.webp';
import { useAuth } from '../services/auth';

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="homepage">
      <header className="hero-section d-flex align-items-center justify-content-center text-center text-white">
        <Container>
          <h1 className="display-3">Transform Your Fitness Journey with EnergoFit</h1>
          <p className="lead mt-3">
            Discover a smarter way to track your workouts and reach your fitness goals. From personalized workout plans to comprehensive exercise databases, we have everything you need to stay motivated and achieve more.
          </p>
          {!isAuthenticated && (
              <Button as={Link} to="/register" variant="primary" size="lg" className="mt-4">
              Join Us Today
            </Button>
          )}
        </Container>
      </header>

      <Container className="mt-5">
        <Row className="text-center mb-5">
          <Col xs={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-lg border-0 card-animation" style={{ borderRadius: "1rem" }}>
              <Card.Img
                variant="top"
                // src="https://via.placeholder.com/300x200.png?text=Workout+Logging"
                src={gymBroImage}
                alt="Workout Logging"
              />
              <Card.Body>
                <Card.Title>Effortless Workout Logging</Card.Title>
                <Card.Text>
                  Keep track of your workouts with ease. Our intuitive interface lets you log and manage your sessions efficiently.
                </Card.Text>
                <Button as={Link} to="/workout" variant="outline-dark">
                  Log Workouts
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-lg border-0 card-animation" style={{ borderRadius: "1rem" }}>
              <Card.Img
                variant="top"
                // src="https://via.placeholder.com/300x200.png?text=Statistics+Analysis"
                src={statisticsImage}
                alt="Statistics & Analysis"
              />
              <Card.Body>
                <Card.Title>In-depth Statistics</Card.Title>
                <Card.Text>
                  Visualize your progress with detailed statistics and insights. Unlock the power of data to push your limits.
                </Card.Text>
                <Button as={Link} to="/profile" variant="outline-dark">
                  View Stats
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={12} lg={4} className="mb-4">
            <Card className="shadow-lg border-0 card-animation" style={{ borderRadius: "1rem" }}>
              <Card.Img
                variant="top"
                // src="https://via.placeholder.com/300x200.png?text=Exercise+Database"
                src={databaseImage}
                alt="Exercise Database"
              />
              <Card.Body>
                <Card.Title>Comprehensive Exercise Database</Card.Title>
                <Card.Text>
                  Explore new exercises with detailed descriptions and tutorials. Perfect your form and expand your routine.
                </Card.Text>
                <Button as={Link} to="/exercises" variant="outline-dark">
                  Explore Exercises
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <h3 className="mb-4">Our Vision for the Future</h3>
            <p>
              At EnergoFit, we believe in continuous innovation. Our future updates will bring new features like customizable workout templates, personalized training suggestions, and enhanced community interactions.
            </p>
            <ul className="list-unstyled mt-3">
              <li>🌟 Custom workout templates</li>
              <li>🌟 Favorite exercises</li>
              <li>🌟 Advanced progress tracking</li>
              <li>🌟 Community challenges</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
