if (!process.env.SUPABASE_URL) {
    console.log('constants.ts', 'Make sure you have a `.env` file to populate your variables.')
  }
  
  export const SUPABASE_URL = process.env.REACT_NATIVE_SUPABASE_URL || 'https://vifatiernozgvfvehmxq.supabase.co'
  export const SUPABASE_ANON_KEY = process.env.REACT_NATIVE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZmF0aWVybm96Z3ZmdmVobXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ4NTExNzQsImV4cCI6MTk3MDQyNzE3NH0.pCBb4wpT0I1UDWLsE0jpJVEN0JKzZkAR6m9UphhwiGg'
  
  export const Styles = {
    fontNormal: 20,
    fontMedium: 28,
    fontLarge: 34,
    fontExtraLarge: 40,
    colorPrimary: 'black',
    spacing: 12,
  }
  