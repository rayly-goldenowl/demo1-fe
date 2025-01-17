import React from "react";
import RegisterHeader from "../../components/RegisterHeader/RegisterHeader";
import Footer from "../../components/Footer/Footer";
import { ToastContainer } from "react-toastify";
interface Props {
	children?: React.ReactNode;
}

export default function RegisterLayout({ children }: Props) {
	return (
		<div>
			<RegisterHeader />
			<ToastContainer />
			{children}
			<Footer />
		</div>
	);
}
