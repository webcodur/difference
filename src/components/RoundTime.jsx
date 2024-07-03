import React from 'react';
import { ProgressContainer, ProgressBar } from 'styles/GameStyle';

const RoundTime = ({ timeLeft, roundTimeLimit }) => {
	const progressBarColor = () => {
		const percentage = (timeLeft / roundTimeLimit) * 100;
		if (percentage > 50) return 'green';
		else if (percentage > 25) return 'yellow';
		else return 'red';
	};

	return (
		<ProgressContainer>
			<ProgressBar
				style={{
					height: `${(timeLeft / roundTimeLimit) * 100}%`,
					backgroundColor: progressBarColor(),
				}}>
				<div style={{ height: '100%', backgroundColor: 'transparent' }} />
			</ProgressBar>
		</ProgressContainer>
	);
};

export default RoundTime;
