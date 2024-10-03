import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path-browserify'; 


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
});
