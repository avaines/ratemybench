import axios from 'axios';

const API_URL = import.meta.env.VITE_RATEMYBENCH_WORKER_URL;
const AUTH_TOKEN = import.meta.env.VITE_RATEMYBENCH_WORKER_API_KEY;

export interface Bench {
  id: string;
  image: string; // Base64 encoded string
  description: string;
  rating: number; // Rating out of 5
  location: {
    latitude: number;
    longitude: number;
  };
}

export const benchService = {
  async getBenches(): Promise<Bench[]> {
    const response = await axios.get(`${API_URL}/`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
    const data = response.data;
    return Array.isArray(data) ? data.map(item => JSON.parse(item)) : [];
  },

  async addBench(bench: Bench): Promise<void> {
    await axios.post(`${API_URL}/`, bench, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
  },

  async getBenchById(id: string): Promise<Bench> {
    const response = await axios.get(`${API_URL}/benches/${id}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
    return response.data;
  },

  async updateBench(id: string, bench: Bench): Promise<void> {
    await axios.put(`${API_URL}/benches/${id}`, bench, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
  },

  async deleteBench(id: string): Promise<void> {
    await axios.delete(`${API_URL}/benches/${id}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
  },
};
