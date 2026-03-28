import { useEffect, useState } from "react";
import lineMob from "./assets/images/pattern-divider-mobile.svg";
import lineDesk from "./assets/images/pattern-divider-desktop.svg";
import barcode from "./assets/images/icon-dice.svg";

export default function App() {
	const [advice, setAdvice] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	function handleWidth(e) {
		console.log(e);
	}
	useEffect(() => {
		fetch("https://api.adviceslip.com/advice")
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed!");
				}
				return res.json();
			})
			.then((data) => {
				setAdvice(data);
			})
			.catch((e) => {
				setError(e.message);
			})
			.finally(() => setLoading(false));
	}, []);
	console.log(advice);

	if (loading) {
		return (
			<p className="text-center mt-20 text-4xl text-tomato/50">Loading ...</p>
		);
	}
	if (error) {
	}

	return (
		<main
			className="bg-Blue-950 min-h-dvh text-Blue-200 flex justify-center items-center p-5 min-w-[375px]"
			onChange={handleWidth}
		>
			{error ? (
				<p className="text-center mt-20 text-4xl text-tomato">{error}</p>
			) : loading ? (
				<p className="text-center mt-20 text-4xl text-tomato/50">Loading ...</p>
			) : (
				<div className="bg-Blue-900 p-7 sm:pb-10 sm:w-lg pb-12 rounded-2xl text-center relative w-sm sm:px-10">
					{/* Advice #<!-- Advice ID goes here --> */}
					<p className="text-Green-300 tracking-[4px] font-semibold text-sm mb-7 mt-5">
						ADVICE #{advice?.slip?.id}
					</p>
					{/* "<!-- Advice text goes here -->" */}
					<p className="text-[28px] font-extrabold">
						<span className="">&#8220;</span>
						{advice?.slip?.advice}&#8221;
					</p>
					<div>
						<picture>
							<source media="(min-width: 640px)" srcSet={lineDesk} />
							<source media="(max-width: 640px)" srcSet={lineMob} />
							<img className="my-5 sm:my-8 w-full" alt="Advice card" />
						</picture>
					</div>
					<div
						className="
					bg-Green-300 w-16 h-16 
						flex justify-center items-center 
						rounded-full absolute -bottom-7 left-6/12 -translate-x-6/12
						hover:shadow-[0px_0px_30px_4px] shadow-Green-300/60
						transition-all
						"
					>
						<img src={barcode} alt="bar code logo" />
					</div>
				</div>
			)}
		</main>
	);
}
