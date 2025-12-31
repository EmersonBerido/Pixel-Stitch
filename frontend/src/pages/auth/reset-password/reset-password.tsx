// First check if token is valid, then allow user to reset password
// If not, just navigate to error page or show error message
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.currentTarget);
    const password = formData.get('password') as string;

    // First get token from URL params
    await fetch(`${import.meta.env.VITE_BACKEND_URL}auth/reset-password/${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ password })
    })
      .then(response => response.text())
      .then(data => console.log('Response from backend:', data));
  }

  return (
    <main>
      <h1>Reset Password Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="New Password" name="password" required />
        <button type="submit">Reset Password</button>
      </form>
    </main>
  )
}
export default ResetPassword;