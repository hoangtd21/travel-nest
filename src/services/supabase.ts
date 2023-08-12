import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://rqymqhhqkphfjopjsxoq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxeW1xaGhxa3BoZmpvcGpzeG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0MTkwODksImV4cCI6MjAwNjk5NTA4OX0.RdAfI2offReJh-qjMhR51jnKxp6MbfZO89KZ-JQbM0Y';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
