import axios from 'axios';
import { Bench } from '../types/bench';

const API_URL = import.meta.env.VITE_RATEMYBENCH_WORKER_URL;
const AUTH_TOKEN = import.meta.env.VITE_RATEMYBENCH_WORKER_API_KEY;

export const benchService = {
  async getBenches(): Promise<Bench[]> {
    try {
      const response = await axios.get(`${API_URL}/`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`
        }
      });
      const data = response.data;
      return Array.isArray(data) ? data.map(item => JSON.parse(item)) : [];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 404 && error.response.data.message === "No approved benches found") {
        return [];
      }
      throw error;
    }
  },

  async addBench(bench: Bench): Promise<void> {
    await axios.post(`${API_URL}/`, bench, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
  },

  async getBenchById(id: string): Promise<Bench> {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      }
    });
    return response.data;
  },

  async updateBench(id: string, bench: Bench): Promise<void> {
    await axios.put(`${API_URL}/${id}`, bench, {
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
