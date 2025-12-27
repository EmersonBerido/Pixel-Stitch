import { supabase } from "../../supabaseClient";


async function findUserByEmail(email: string){
  // Check if email already exists in database
  const { data , error } = await supabase
    .from('Users')
    .select('*')
    .eq('email', email);

  if (error) {
    console.error('Error checking existing email:', error);
    return true;
  }

  // Email exists
  if (data && data.length > 0) {
    return true;
  }

  return false; // Email does not exist
}

async function addUser(email: string, username: string, hashedPassword: string){
  // Add new user to database
  const { data: insertData, error: insertError } = await supabase
    .from('Users')
    .insert([
      { email, name : username, password: hashedPassword }
    ]);

  // Check for insertion error
  if (insertError) {
    console.error('Error inserting new user:', insertError);
    return false;
  }

  return true;
}

export { findUserByEmail, addUser };