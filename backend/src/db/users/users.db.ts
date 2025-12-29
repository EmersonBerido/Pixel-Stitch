import { supabase } from "../../supabaseClient";
import bcryptjs from "bcryptjs";


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

async function verifyUserCredentials(email: string, password: string){
  // Get all user with given email
  const {data, error} = await supabase
    .from("Users")
    .select("*")
    .eq("email", email);
  
  if (error) {
    console.error('Error fetching user by email:', error);
    return false;
  }

  if (!data || data.length === 0) return false;

  // Compare given password with stored hashed password using bcryptjs
  const hashedPassword = await bcryptjs.compare(password, data[0].password);
  return hashedPassword;
}

async function getIdByEmail(email: string){
  const {data, error} = await supabase
    .from("Users")
    .select("id")
    .eq("email", email);

  if (error) {
    console.error('Error fetching user ID by email:', error);
    return null;
  }

  return data && data.length > 0 ? data[0].id : null;
}

async function changePasswordByEmail(email: string, newHashedPassword: string) {
  // Get User to update
  const { data, error } = await supabase
    .from("Users")
    .update({ password: newHashedPassword })
    .eq("email", email)
    .select();
  
  if (error) return false;
  
  // If User doesn't exist
  if (data.length === 0) return false;
  
  return true;
}

export { findUserByEmail, addUser, verifyUserCredentials, getIdByEmail, changePasswordByEmail };