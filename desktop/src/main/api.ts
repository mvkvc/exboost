import axios from "axios";

export async function requestPresignedURL(
  URL: string,
  APIKey: string,
  key: string
): Promise<string> {
  axios.defaults.headers.common["authorization"] = "Bearer " + APIKey;
  return axios
    .request({
      url: URL,
      method: "GET",
      data: {
        key,
      },
    })
    .then((response) => {
      return response.data;
    });
}
