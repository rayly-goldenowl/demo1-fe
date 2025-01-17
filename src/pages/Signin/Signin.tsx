import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { rules } from "../../utils/rules";
import Input from "../../components/Input/input";
import { useMutation } from "@tanstack/react-query";
import { signinAccount } from "../../services/auth";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
interface FormData {
	email: string;
	password: string;
}
export default function Signin() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormData>();

	const registerAccountMutaion = useMutation({
		mutationFn: (body: Omit<FormData, "">) => signinAccount(body),
	});

	const onSubmit = handleSubmit((body) => {
		registerAccountMutaion.mutate(body, {
			onSuccess: (data) => {
				const access_token = data.data.data?.access_token;
				console.log(access_token);
				localStorage.setItem("access_token", access_token || "");
				toast.success("Sign in successful!", {
					autoClose: 2000,
					onClose: () => navigate("/home"),
				});
			},
			onError: (error) => {
				if (error instanceof AxiosError) {
					setError("email", {
						message: error.response?.data.message,
					});
				}
			},
		});
	});

	const handleGoogleSuccess = (credentialResponse: any) => {
		const { credential } = credentialResponse;

		fetch(
			`http://localhost:3000/api/v1/auth/users/auth/google_oauth2/callback?code=${credential}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data: any) => {
				if (data.message === "Successfully signed in") {
					localStorage.setItem("access_token", data.user.access_token);
					toast.success("Sign in with Google successful!", {
						autoClose: 2000,
						onClose: () => navigate("/home"),
					});
				} else {
					toast.error("Failed to sign in with Google");
				}
			})
			.catch((error) => {
				console.error("Google sign-in error:", error);
				toast.error("An error occurred while signing in with Google.");
			});
	};

	return (
		<div>
			<div className="bg-[url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsX29mZmljZV80Nl9jbG9zZV91cF9zaG90X3Bob3RvX29mX2d5bV9lcXVpcG1lbnRfZm9yX3dvcl8zNzRlNTZiZi0yZWJlLTRjMDUtYWY3OS1iNzNhZWQxY2Y4YzBfMS5qcGc.jpg')] backdrop-blur-md bg-cover bg-center">
				<div className="max-w-7xl mx-auto px-4">
					<div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
						<div className="lg:col-span-2 lg:col-start-4">
							<form
								className="p-10 rounded bg-white shadown-sm"
								onSubmit={onSubmit}
								noValidate
							>
								<div className="text-2xl">Sign In</div>
								<Input
									className="mt-3"
									name="email"
									placeholder="Email"
									errorMessage={errors.email?.message}
									register={register}
									type="email"
									rules={rules.email}
								/>

								<Input
									className="mt-3"
									name="password"
									placeholder="Password"
									errorMessage={errors.password?.message}
									register={register}
									type="password"
									rules={rules.password}
								/>
								<div className="mt-3">
									<button
										type="submit"
										className="w-full text-center py-4 uppercase bg-red-500 text-white text-sm hover:bg-red-600"
									>
										Sign in
									</button>
								</div>

								<div className="mt-4 ">
									<div className="flex justify-center">
										<span className=" text-slate-500">
											You don't have an account?
										</span>
										<Link className="text-red-400" to="/register">
											Sign up
										</Link>
									</div>
								</div>

								<GoogleLogin
									onSuccess={(credentialRespone) => {
										handleGoogleSuccess(credentialRespone);
									}}
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
