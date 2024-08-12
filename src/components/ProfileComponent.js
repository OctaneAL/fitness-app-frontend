import React from 'react';
import { Container } from 'react-bootstrap';
import UserStatistics from './UserStatistics';
import DifficultyStatistics from './DifficultyStatistics';
import MuscleGroupStatistics from './MuscleGroupStatistics';

const ProfileComponent = ({ totalWorkouts, totalSets, totalDuration, totalWeight, difficultyDistribution, muscleGroupExerciseDistribution, muscleGroupWeightDistribution }) => {
    return (
        <Container className="my-4">
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
        </Container>
    )
};
export default ProfileComponent;

