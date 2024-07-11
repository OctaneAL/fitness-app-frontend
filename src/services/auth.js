export async function login(username, password) {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      return true;
    } else {
      return false;
    }
  }
  
  export async function register(username, password) {
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    return response.ok;
  }
  