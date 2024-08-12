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

export async function getMuscleGroups() {
    return apiRequest('/muscle_groups', 'GET');
};

export async function filterExercises({
    targetMuscleGroupId,
    name,
    difficultyIds,
    equipmentIds,
    bodyRegionIds
}) {
    const params = new URLSearchParams();

    if (targetMuscleGroupId) params.append('target_muscle_group_id', targetMuscleGroupId);
    if (name) params.append('name', name);
    if (difficultyIds.length > 0) params.append('difficulty_ids', difficultyIds.join(','));
    if (equipmentIds.length > 0) params.append('equipment_ids', equipmentIds.join(','));
    if (bodyRegionIds.length > 0) params.append('body_region_ids', bodyRegionIds.join(','));

    return apiRequest(`/filter_exercises?${params.toString()}`, 'GET');
}

export async function getDifficulties() {
    return apiRequest('/difficulties', 'GET');
};

export async function getEquipment() {
    return apiRequest('/equipment', 'GET');
};

export async function getBodyRegions() {
    return apiRequest('/body_regions', 'GET');
};

export async function getBodyRegionsForMuscleGroup(muscle_group_id) {
    return apiRequest(`/body_regions/${muscle_group_id}`, 'GET');
};

export async function getMuscleGroupId(muscle_group_name) {
    return apiRequest(`/muscle_group_id/${muscle_group_name}`, 'GET');
};

export async function getFavoriteExercises(user_id) {
    return apiRequest(`/favorite_exercises/${user_id}`, 'GET');
};

export async function addFavoriteExercise(user_id, exercise_catalog_id) {
    return apiRequest(`/favorite_exercises/${user_id}`, 'POST', {exercise_catalog_id: parseInt(exercise_catalog_id)});
};

export async function deleteFavoriteExercise(user_id, exercise_catalog_id) {
    return apiRequest(`/favorite_exercises/${user_id}`, 'DELETE', {exercise_catalog_id: parseInt(exercise_catalog_id)});
};


// Statistics
export async function getTotalWorkouts(user_name) {
    return apiRequest(`/statistics/total-workouts/${user_name}`, 'GET');
}

export async function getTotalDuration(user_name) {
    return apiRequest(`/statistics/total-duration/${user_name}`, 'GET');
}

export async function getTotalSets(user_name) {
    return apiRequest(`/statistics/total-sets/${user_name}`, 'GET');
}

export async function getTotalWeight(user_name) {
    return apiRequest(`/statistics/total-weight/${user_name}`, 'GET');
}

export async function getDifficultyDistribution(user_name) {
    return apiRequest(`/statistics/difficulty-distribution/${user_name}`, 'GET');
}

export async function getMuscleGroupExerciseDistribution(user_name) {
    return apiRequest(`/statistics/muscle-group-exercise-distribution/${user_name}`, 'GET');
}

export async function getMuscleGroupWeightDistribution(user_name) {
    return apiRequest(`/statistics/muscle-group-weight-distribution/${user_name}`, 'GET');
}

export { apiRequest };
