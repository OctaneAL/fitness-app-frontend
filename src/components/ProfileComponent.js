import React, { useState, useEffect } from 'react';
import { Card, Row, Col, ProgressBar, Badge, Container } from 'react-bootstrap';
import UserStatistics from './UserStatistics';
import DifficultyStatistics from './DifficultyStatistics';
import MuscleGroupStatistics from './MuscleGroupStatistics';
import {
    getTotalWorkouts, getTotalDuration, getTotalSets,
    getTotalWeight, getDifficultyDistribution, getMuscleGroupExerciseDistribution,
    getMuscleGroupWeightDistribution
} from '../services/api';

const ProfileComponent = ({ user_id }) => {
    const [totalWorkouts, setTotalWorkouts] = useState(0);
    const [totalSets, setTotalSets] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [difficultyDistribution, setDifficultyDistribution] = useState([]);
    const [muscleGroupExerciseDistribution, setMuscleGroupExerciseDistribution] = useState([]);
    const [muscleGroupWeightDistribution, setMuscleGroupWeightDistribution] = useState([]);

    useEffect(() => {
        getTotalWorkouts(user_id)
            .then(data => {
                setTotalWorkouts(data);
            })
            
        getTotalSets(user_id)
            .then(data => {
                setTotalSets(data);
            })
            
        getTotalDuration(user_id)
            .then(data => {
                setTotalDuration(data);
            })
            
        getTotalWeight(user_id)
            .then(data => {
                setTotalWeight(data);
            })
            
        getDifficultyDistribution(user_id)
            .then(data => {
                setDifficultyDistribution(data);
            })
            
        getMuscleGroupExerciseDistribution(user_id)
            .then(data => {
                setMuscleGroupExerciseDistribution(data);
            })
            
        getMuscleGroupWeightDistribution(user_id)
            .then(data => {
                setMuscleGroupWeightDistribution(data);
            })
    }, [user_id]);

    return (
        <Container className="my-4">
        {/* <h2>{user.username}'s Profile</h2> */}
        {/* <h2>octaneal's Profile</h2> */}

        <UserStatistics
            totalWorkouts={totalWorkouts}
            totalDuration={totalDuration}
            totalSets={totalSets}
            totalWeight={totalWeight}
        />

        <DifficultyStatistics
            difficultyData={difficultyDistribution}
        />

        <MuscleGroupStatistics
            dataExercises={muscleGroupExerciseDistribution}
            dataWeight={muscleGroupWeightDistribution}
        />
        
        <Row className="mb-4">
        <Col>
            <Card>
            <Card.Body>
                <Card.Title>General Statistics</Card.Title>
                {/* <Card.Text>Total Volume: {user.totalVolume} kg</Card.Text>
                <Card.Text>Total Workouts: {user.totalWorkouts}</Card.Text>
                <Card.Text>Total Duration: {user.totalDuration} hours</Card.Text> */}
                <Card.Text>Total Volume: 4298 kg</Card.Text>
                <Card.Text>Total Workouts: 51</Card.Text>
                <Card.Text>Total Duration: 25 hours</Card.Text>
            </Card.Body>
            </Card>
        </Col>
        <Col>
            <Card>
            <Card.Body>
                <Card.Title>Workout Frequency</Card.Title>
                {/* <Card.Text>Weekly Workouts: {user.weeklyWorkouts}</Card.Text>
                <Card.Text>Active Streak: {user.activeStreak} days</Card.Text>
                <Card.Text>Average Frequency: {user.averageFrequency} workouts/week</Card.Text> */}
                <Card.Text>Weekly Workouts: 2.666</Card.Text>
                <Card.Text>Active Streak: 1 days</Card.Text>
                <Card.Text>Average Frequency: 2.666 workouts/week</Card.Text>
            </Card.Body>
            </Card>
        </Col>
        </Row>
        <Row className="mb-4">
        <Col>
            <Card>
            <Card.Body>
                <Card.Title>Records & Achievements</Card.Title>
                {/* <Card.Text>Max Weight Lifted: {user.maxWeight} kg</Card.Text>
                <Card.Text>Max Reps: {user.maxReps}</Card.Text> */}
                <Card.Text>Max Weight Lifted: 175 kg</Card.Text>
                <Card.Text>Max Reps: 505</Card.Text>
                <Badge pill variant="success">10 Workouts</Badge>
                <Badge pill variant="warning">1 Month Streak</Badge>
            </Card.Body>
            </Card>
        </Col>
        <Col>
            <Card>
            <Card.Body>
                <Card.Title>Progress</Card.Title>
                {/* <ProgressBar now={user.progress} label={`${user.progress}%`} /> */}
                <ProgressBar now={88} label={`88%`} />
            </Card.Body>
            </Card>
        </Col>
        </Row>
        </Container>
    )
};
  
export default ProfileComponent;

