import axios from "axios";

export const fetchExchangeRates = async (): Promise<any> => {
  try {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;
    const response = await axios.get(apiKey);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch and save exchange rates:", error);
  }
};
