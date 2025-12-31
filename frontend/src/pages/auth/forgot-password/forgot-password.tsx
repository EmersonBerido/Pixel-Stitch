import {useState} from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    console.log('Forgot Password form submitted for email:', email);
    
    // call forgot-password endpoint
    SendResetEmail(email);
    
    // Show message to check email
    setEmail(email);
    setEmailSent(true);
  }

  return (
    <main>
      <h1>Forgot Password Page</h1>

      {emailSent ? 
        <ShowMessage setEmailSent={setEmailSent} email={email} /> 
        :
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" required />
          <button type="submit">Send Reset Link</button>
        </form>
      }

    </main>
  )
}

// Helper component to show message
function ShowMessage(props : any) {
  // make this a react component that shows message to check email
  // Include a send email button to resend the email
  return (<div>
    <h2>Check your email</h2>
    <p>If an account with that email exists, a password reset link has been sent.</p>
    <button onClick={() => SendResetEmail(props.email)}>Resend Email</button>
    <button onClick={() => props.setEmailSent(false)}>Change Email</button>
  </div>)

}

function SendResetEmail(email : string) {
  fetch(`${import.meta.env.VITE_BACKEND_URL}auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
  });
}

export default ForgotPassword;