import { useRoutes } from "react-router-dom";
import Signin from "../pages/Signin";
import Register from "../pages/Register";
import RegisterLayout from "../layouts/RegisterLayout";
import Confirm from "../pages/ConfirmEmail";
export default function userRouteElements() {
	const routeElements = useRoutes([
		{
			path: "/signin",
			element: (
				<RegisterLayout>
					<Signin />
				</RegisterLayout>
			),
		},
		{
			path: "/register",
			element: (
				<RegisterLayout>
					<Register />
				</RegisterLayout>
			),
		},
		{
			path: "/confirm",
			element: (
				<RegisterLayout>
					<Confirm />
				</RegisterLayout>
			),
		},
	]);

	return routeElements;
}
