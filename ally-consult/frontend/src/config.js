// API configuration for different environments
const getApiUrl = () => {
  // Production - Use environment variable
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://your-backend.vercel.app'
  }
  
  // Development - Codespaces
  if (window.location.hostname.includes('app.github.dev')) {
    const currentUrl = window.location.origin
    return currentUrl.replace(/-\d+\.app\.github\.dev/, '-5000.app.github.dev')
  }
  
  // Development - Local
  return 'http://localhost:5000'
}

export const API_URL = getApiUrl()

console.log('🔗 API URL:', API_URL)

export default API_URL