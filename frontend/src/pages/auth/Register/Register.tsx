import type {User} from "../../../../../shared/types/user";
function Register() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Register form submitted');

    // Get form data
    const formData = new FormData(event.currentTarget);
    const user: User = {
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string
    };
    console.log(user);

    // Send to backend
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.text();
    console.log('Response from backend:', data);


  }

  return (
    <main>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name="username" required />
        <input type="email" placeholder="Email" name="email" required />
        <input type="password" placeholder="Password" name="password" required />
        <button type="submit">Register</button>
      </form>
    </main>
  )
}

export default Register;