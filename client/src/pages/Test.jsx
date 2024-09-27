import { useEffect } from "react";

const Test = () => {
	const getDocs = async () => {
		const req = await fetch("http://localhost:5005/docs");
		const res = await req.text();

		console.log(res);
	};
	useEffect(() => {
		getDocs();
	}, []);
	return <div>Test</div>;
};
export default Test;
