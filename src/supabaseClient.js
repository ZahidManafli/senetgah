import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://twejbgovjstctrpjexpi.supabase.co'; // Replace with your URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3ZWpiZ292anN0Y3RycGpleHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4OTg2NTAsImV4cCI6MjA2ODQ3NDY1MH0.HPJyuohUpJo0hlR9qUoxSnyM6FgbHgdUdLLASTBGbT8'; // Replace with your anon key


export const supabase = createClient(supabaseUrl, supabaseAnonKey)