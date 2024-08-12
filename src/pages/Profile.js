import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProfileComponent from '../components/ProfileComponent'
import { useParams } from 'react-router-dom';

import Error404 from '../components/Error404';

import {
    getTotalWorkouts, getTotalDuration, getTotalSets,
    getTotalWeight, getDifficultyDistribution, getMuscleGroupExerciseDistribution,
    getMuscleGroupWeightDistribution
} from '../services/api';

function Profile() {
    let { user_name } = useParams();

    const [error, setError] = useState(null);

    const [totalWorkouts, setTotalWorkouts] = useState(0);
    const [totalSets, setTotalSets] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [difficultyDistribution, setDifficultyDistribution] = useState([]);
    const [muscleGroupExerciseDistribution, setMuscleGroupExerciseDistribution] = useState([]);
    const [muscleGroupWeightDistribution, setMuscleGroupWeightDistribution] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let workoutsData = await getTotalWorkouts(user_name);
                setTotalWorkouts(workoutsData);

                let setsData = await getTotalSets(user_name);
                setTotalSets(setsData);

                let durationData = await getTotalDuration(user_name);
                setTotalDuration(durationData);

                let weightData = await getTotalWeight(user_name);
                setTotalWeight(weightData);

                let difficultyDistributionData = await getDifficultyDistribution(user_name);
                setDifficultyDistribution(difficultyDistributionData);

                let muscleGroupExerciseDistributionData = await getMuscleGroupExerciseDistribution(user_name);
                setMuscleGroupExerciseDistribution(muscleGroupExerciseDistributionData);

                let muscleGroupWeightDistributionData = await getMuscleGroupWeightDistribution(user_name);
                setMuscleGroupWeightDistribution(muscleGroupWeightDistributionData);
            } catch (error) {
                if (error.message.includes('404')) {
                    setError('User not found.'); // Todo: implement other Error codes
                } else {
                    setError('An error occurred while fetching data.');
                } 
            }
        };

        fetchData();
    }, [user_name]);

    return (
        <Container className="user-profile d-flex flex-column h-100">
            {error ? (
                <Error404 />
            ) : (
                <ProfileComponent
                    totalWorkouts={totalWorkouts}
                    totalSets={totalSets}
                    totalDuration={totalDuration}
                    totalWeight={totalWeight}
                    difficultyDistribution={difficultyDistribution}
                    muscleGroupExerciseDistribution={muscleGroupExerciseDistribution}
                    muscleGroupWeightDistribution={muscleGroupWeightDistribution}
                />
            )}
        </Container>
    );
};


export default Profile;