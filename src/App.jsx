import { useEffect, useState } from "react";
import line from "./assets/images/pattern-divider-mobile.svg";
import barcode from "./assets/images/icon-dice.svg";

export default function App() {
	const [advice, setAdvice] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
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
		<main className="bg-Blue-950 min-h-dvh text-Blue-200 flex justify-center items-center p-5">
			{error ? (
				<p className="text-center mt-20 text-4xl text-tomato">{error}</p>
			) : loading ? (
				<p className="text-center mt-20 text-4xl text-tomato/50">Loading ...</p>
			) : (
				<div className="bg-Blue-900 p-7 pb-12 rounded-2xl text-center relative">
					{/* Advice #<!-- Advice ID goes here --> */}
					<p className="text-Green-300 tracking-[4px] font-semibold text-sm mb-7 mt-5">
						ADVICE #{advice?.slip?.id}
					</p>
					{/* "<!-- Advice text goes here -->" */}
					<p className="text-[28px] font-extrabold">
						<span className="">&#8220;</span>
						{advice?.slip?.advice}&#8221;
					</p>
					<img className="my-5 w-full" src={line} alt="divider line" />
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
