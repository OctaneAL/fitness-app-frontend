// const BASE_URL = 'http://localhost:8000';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

async function apiRequest(endpoint, method, body = null) {
    const headers = {
        'Content-Type': 'application/json',
    };

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
        console.log(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}


// Get workouts
export async function getAllWorkouts() {
    return apiRequest('/workouts', 'GET');
}

export async function getAllUserWorkouts(user_id) {
    return apiRequest(`/workouts/${user_id}`, 'GET');
}


// Edit workouts
export async function updateWorkout(id, workout) {
    return apiRequest(`/workout/${id}`, 'PUT', workout);
};

export async function addWorkout(id, workout, user_id) {
    return apiRequest(
        `/workout/${id}`,
        'POST',
        {
            workout: workout,
            user_id: user_id,
        },
    );
};

export async function deleteWorkout(id) {
    return apiRequest(`/workout/${id}`, 'DELETE');
};


// Exercise catalog
export async function getExerciseCatalog() {
    return apiRequest('/exercise_catalog', 'GET');
};


// Statistics
export async function getTotalWorkouts(user_id) {
    return apiRequest(`/statistics/total-workouts/${user_id}`, 'GET');
}

export async function getTotalDuration(user_id) {
    return apiRequest(`/statistics/total-duration/${user_id}`, 'GET');
}

export async function getTotalSets(user_id) {
    return apiRequest(`/statistics/total-sets/${user_id}`, 'GET');
}

export async function getTotalWeight(user_id) {
    return apiRequest(`/statistics/total-weight/${user_id}`, 'GET');
}

export async function getDifficultyDistribution(user_id) {
    return apiRequest(`/statistics/difficulty-distribution/${user_id}`, 'GET');
}

export async function getMuscleGroupExerciseDistribution(user_id) {
    return apiRequest(`/statistics/muscle-group-exercise-distribution/${user_id}`, 'GET');
}

export async function getMuscleGroupWeightDistribution(user_id) {
    return apiRequest(`/statistics/muscle-group-weight-distribution/${user_id}`, 'GET');
}

export { apiRequest };
