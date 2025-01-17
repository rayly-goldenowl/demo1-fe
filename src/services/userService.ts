import { ApiClient } from "./apiClient";

class UserService {
	async userLogin(email: string, password: string) {
		return await ApiClient.post("/auth/sign_in", {
			user: {
				email,
				password,
			},
		});
	}

	async userLogout() {
		return await ApiClient.delete("/auth/sign_out");
	}

	async userSignup(
		email: string,
		password: string,
		first_name: string,
		last_name: string
	) {
		return await ApiClient.post("/auth/sign_up", {
			user: {
				first_name,
				last_name,
				email,
				password,
			},
		});
	}

	async userConfirm(token: string) {
		return await ApiClient.get(
			`/auth/confirmation?confirmation_token=${token}`
		);
	}
}

export default new UserService();
