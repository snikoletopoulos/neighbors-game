import React from "react";

export default function ProgressBar({ progress }) {
	return (
		<section id="progress">
			<div style={{ width: progress + "%" }} id="current-progress"></div>
		</section>
	);
}
