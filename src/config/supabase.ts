import { createClient } from "@supabase/supabase-js";
// const projectUrl = import.meta.env.VITE_PROJECT_URL || '';
// const anon = import.meta.env.VITE_ANON || '';

const supabase = createClient("https://diucbryvjnusljxhxaaq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpdWNicnl2am51c2xqeGh4YWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDczMDgzMjEsImV4cCI6MjAyMjg4NDMyMX0.PHYRhIyiS-zK408CtQjzgxjfCa6USg2HgWr37sWkqU0");

export default supabase;