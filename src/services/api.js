const BASE_URL = 'http://localhost:8000';

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

export async function getAllWorkouts() {
    return apiRequest('/workouts', 'GET');
}

export async function updateWorkout(id, workout) {
    return apiRequest(`/workout/${id}`, 'PUT', workout);
};

export async function addWorkout(id, workout) {
    return apiRequest(`/workout/${id}`, 'POST', workout);
};

export async function deleteWorkout(id) {
    return apiRequest(`/workout/${id}`, 'DELETE');
};

export async function getExerciseCatalog() {
    return apiRequest('/exercise_catalog', 'GET');
};

export { apiRequest };
