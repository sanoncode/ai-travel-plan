import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;


console.log(supabaseKey,'supakey')

export const supabase = createClient(supabaseUrl, supabaseKey);