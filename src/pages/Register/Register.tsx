import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { rules } from "../../utils/rules";
import Input from "../../components/Input";
import { useMutation } from "@tanstack/react-query";
import { registerAccout } from "../../services/auth";
import omit from "lodash.omit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface FormData {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	confirm_password: string;
}

export default function Register() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		formState: { errors },
	} = useForm<FormData>();

	const registerAccountMutaion = useMutation({
		mutationFn: (body: Omit<FormData, "confirm_password">) =>
			registerAccout(body),
	});

	const onSubmit = handleSubmit((data) => {
		const body = omit(data, ["confirm_password"]);
		registerAccountMutaion.mutate(body, {
			onSuccess: (data) => {
				toast.success(
					"Sign up successful! Please verify your email and Sign in",
					{
						autoClose: 2000,
						onClose: () => navigate("/signin"),
					}
				);
			},
			onError: (error) => {
				if (error instanceof AxiosError) {
					const listError = error.response?.data.errors;
					console.log();

					Object.keys(listError).forEach((index) => {
						setError(listError[index].field, {
							message: listError[index].message,
						});
					});
				}
			},
		});
	});

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
								<div className="text-2xl">Sign Up</div>
								<div className="mt-6 flex-col gap-3">
									<div className="flex gap-3">
										<Input
											name="first_name"
											placeholder="First name"
											errorMessage={errors.first_name?.message}
											register={register}
											type="text"
											rules={rules.first_name}
										/>

										<Input
											name="last_name"
											placeholder="First name"
											errorMessage={errors.last_name?.message}
											register={register}
											type="text"
											rules={rules.first_name}
										/>
									</div>
								</div>

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
									<input
										type="password"
										className="p-3 w-full oneline-none border border-gray-300 rounded-sm"
										placeholder="Confirm Password"
										autoComplete="on"
										{...register("confirm_password", {
											...rules.confirm_password,
											validate: (value) =>
												value === getValues("password")
													? true
													: "Passwords must match",
										})}
									/>
									<div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">
										{errors.confirm_password?.message}
									</div>
								</div>

								<div className="mt-3">
									<button
										type="submit"
										className="w-full text-center py-4 uppercase bg-red-500 text-white text-sm hover:bg-red-600"
									>
										Sign up
									</button>
								</div>

								<div className="mt-4 ">
									<div className="flex justify-center">
										<span className=" text-slate-500">
											You have an account?
										</span>
										<Link className="text-red-400" to="/signin">
											Sign in
										</Link>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
