import axios from 'axios';
import { reports } from '../mocks/reports';

const apiClient = axios.create({
  baseURL: '/api',
});

// Mock API Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = new URL(error.config.url, 'http://localhost');
    const type = url.searchParams.get('type');

    if (url.pathname === '/v1/reports/heatmap' && type) {
      const data = reports[type as keyof typeof reports] || [];
      console.log(`[Mock API] Faking call for heatmap type: ${type}, found ${data.length} points.`);
      return Promise.resolve({ 
        data: { data_points: data }, 
        status: 200 
      });
    }

    if (error.config.url === '/v1/reports' && error.config.method === 'post') {
      console.log('[Mock API] Faking report submission:', error.config.data);
      return Promise.resolve({ data: { message: 'Report submitted successfully (mocked)' }, status: 201 });
    }

    return Promise.reject(error);
  }
);

export default apiClient;