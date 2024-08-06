import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
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
        </Container>
    )
};
  
export default ProfileComponent;

