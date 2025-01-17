import http from "../utils/http";
import { AuthReponse } from "../types/auth.type";

export const registerAccout = (body: {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
}) =>
	http.post<AuthReponse>("/auth/sign_up", {
		user: body,
	});

export const signinAccount = (body: { email: string; password: string }) =>
	http.post<AuthReponse>("/auth/sign_in", {
		user: body,
	});

export const confirmAccount = (token: string) => {
	http.get(`/confirmation?confirmation_token=${token}`);
};
