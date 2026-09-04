import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BLOG_API = 'https://blogging-application-eight.vercel.app'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // The Blogify API sends no CORS headers, so the browser may not call it
    // cross-origin. Dev proxies it here; vercel.json rewrites it in production.
    proxy: {
      '/api/blog': {
        target: BLOG_API,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/blog/, '/api/posts'),
      },
      // Series keep their upstream path; only the origin changes.
      '/api/series': {
        target: BLOG_API,
        changeOrigin: true,
      },
    },
  },
})
