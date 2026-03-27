import { useEffect, useState } from "react";

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
		return <p className="text-center mt-20 text-4xl text-tomato">{error}</p>;
	}

	return (
		<div>
			{/* Advice #<!-- Advice ID goes here --> */}
			<p>{advice?.slip?.id}</p>
			{/* "<!-- Advice text goes here -->" */}
			<p>{advice?.slip?.advice}</p>
		</div>
	);
}
