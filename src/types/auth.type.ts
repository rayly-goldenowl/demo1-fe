import { User } from "./user.type";
import { ResponseApi } from "./utils.type";

export type AuthReponse = ResponseApi<{
	access_token: string;
	user: User;
}>;
