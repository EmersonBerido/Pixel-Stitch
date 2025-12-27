import {createClient} from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.DB_CONNECTION_STRING as string;
const supabaseKey = process.env.DB_API_KEY as string;


export const supabase = createClient(supabaseUrl, supabaseKey) 