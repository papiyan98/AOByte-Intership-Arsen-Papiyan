export const registerUser = async (userData) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (response.ok) {
    return { 
      title: 'Registration successfull', 
      message: 'You will be automatically redirected to the login page after closing modal window.',
      isSuccessfull: true
    };
  } else {
    const json = await response.json();
    return {
      title: 'Registration failed',
      message: `${json.error}`,
      isSuccessfull: false
    }
  };
}

export const loginUser = async (userData) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  return response;
}