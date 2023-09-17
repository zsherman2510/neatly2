type RegisterUserType = {
  username: string;
  password: string;
};


export const registerUser = async (user: RegisterUserType) => {
   const { username, password } = user;
   
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    return data.user;
  } catch (error: any) {
    console.error('Error registering user:', error.toString());
    throw error;  // If you want the error to be propagated to the caller
  }
}


  