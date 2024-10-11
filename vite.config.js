import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
  // Load the appropriate .env file based on the mode (development, production, etc.)
  dotenv.config({ path: `.env.${mode}` });

  return {
    plugins: [react()],
    define: {
      'process.env': process.env,
    },
  };
});
