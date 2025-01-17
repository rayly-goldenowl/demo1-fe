import axios from "axios";

const token = localStorage.getItem("access_token");

const ApiClient = axios.create({
	baseURL: "http://127.0.0.1:3000/api/v1/",

	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

ApiClient.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export { ApiClient };
