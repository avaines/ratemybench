// import axios from 'axios';

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

// const API_URL = 'https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/storage/kv/namespaces/YOUR_NAMESPACE_ID/values';

export const benchService = {
  async getBenches(): Promise<Bench[]> {
    // const response = await axios.get(`${API_URL}/benches`);
    // return response.data;
    return [];
  },

  async addBench(bench: Bench): Promise<void> {
    // dummy await that always resolves
    console.log(bench)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // await axios.put(`${API_URL}/benches`, bench);
  },
};
