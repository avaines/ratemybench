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
    if (typeof BENCHES_KV === "undefined") {
      console.error("KV Namespace not available.");
      return [];
    }

    // List all stored keys in the KV namespace
    const list = await BENCHES_KV.list();
    const benches: Bench[] = [];

    for (const { name } of list.keys) {
      const benchData = await BENCHES_KV.get(name, "json");
      if (benchData) {
        benches.push(benchData);
      }
    }

    return benches;
  },

  async addBench(bench: Bench): Promise<void> {
    if (typeof BENCHES_KV === "undefined") {
      console.error("KV Namespace not available.");
      return;
    }

    await BENCHES_KV.put(bench.id, JSON.stringify(bench));
  },
};
