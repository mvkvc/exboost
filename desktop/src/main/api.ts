import axios from "axios";

export const requestPresignedURL = async (
  URL: string,
  APIKey: string,
  key: string,
): Promise<string> => {
  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${APIKey}`,
      },
      params: {
        key,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
