import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, CardBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faClock, faRepeat, faWeightHanging } from '@fortawesome/free-solid-svg-icons';

const UserStatistics = ({ totalWorkouts, totalDuration, totalSets, totalWeight }) => {
  const convertMinsToHrs = (duration_minutes) => {
    let duration = "";
    let hours = ~~(duration_minutes / 60);
    let mins = duration_minutes % 60;

    if (hours > 0) duration += hours.toString() + " hrs ";
    if (mins > 0) duration += mins.toString() + " mins";
    if (duration === "") duration = "0 mins";

    return duration;
  }

  const stats = [
    {
      icon: faDumbbell,
      title: 'Total Workouts',
      value: totalWorkouts
    },
    {
      icon: faClock,
      title: 'Total Duration',
      value: convertMinsToHrs(totalDuration)
    },
    {
      icon: faRepeat,
      title: 'Total Sets',
      value: totalSets
    },
    {
      icon: faWeightHanging,
      title: 'Total Weight',
      value: totalWeight + ' kg'
    }
  ];

    return (
        <Row> {/* className="mb-4" */}
            {stats.map((stat, index) => (
                <Col xs={6} md={3} lg={3} className="mb-3" key={index}>
                    <Card className="text-center h-100">
                        <CardBody className="d-flex flex-column align-items-center">
                            <FontAwesomeIcon icon={stat.icon} size="2x" className="mb-2 text-primary" />
                            <Card.Title className="text-center">{stat.title}</Card.Title>
                            <Card.Text className="text-center">{stat.value}</Card.Text>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default UserStatistics;
