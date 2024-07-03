import { CheckCircleOutline, CircleOutlined } from '@mui/icons-material';
import React from 'react';

import { FoundIconContainer } from 'styles/GameStyle';

const RoundProgress = ({ diffCoordinates, foundDifferences }) => {
	return (
		<FoundIconContainer>
			{diffCoordinates.map((_, index) =>
				foundDifferences.length > index ? (
					<CheckCircleOutline key={index} color="primary" />
				) : (
					<CircleOutlined key={index} color="disabled" />
				)
			)}
		</FoundIconContainer>
	);
};

export default RoundProgress;
