import { Link } from "react-router-dom";

export default function RegisterHeader() {
	return (
		<header className="py-5">
			<div className="max-w-7xl mx-auto px-4">
				<nav className="flex justify-between">
					<Link to="/">
						<h2 className="">
							Gym<span>Track</span>
						</h2>
					</Link>

					<div className="flex justify-between lg:gap-20 md:gap-8 sm:gap-8 ">
						<h2>HOME</h2>
						<h2>ABOUT</h2>
						<h2>PRICING</h2>
					</div>

					<Link to="/">Join Us</Link>
				</nav>
			</div>
		</header>
	);
}
