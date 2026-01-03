function Login() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Handle login logic here

    const formData = new FormData(event.currentTarget);
    const body = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }
    console.log('Login form submitted:', body);

    await fetch(`${import.meta.env.VITE_BACKEND_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from backend:', data);
        
        // Handle successful login, e.g., store JWT token
        if (data.token) localStorage.setItem("token", data.token);
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  }

  return (
    <main>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" name="email" required />
        <input type="password" placeholder="Password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </main>
  )
  return <div>Login Page</div>;
}
export default Login;