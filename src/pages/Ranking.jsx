// src/pages/Ranking.js
import React, { useEffect } from 'react';
import RankingList from 'components/RankingList';
import styled from '@emotion/styled';
import { playSingleAudio } from 'utils/playAudio';

export const RankContainer = styled.div`
	margin-top: 3vh;
	height: 80vh;
	text-align: center;
`;

function Ranking() {
	useEffect(() => {
		playSingleAudio('applause.mp3', 'applause');
	}, []);

	return (
		<RankContainer maxWidth="sm">
			<h1>랭킹 화면</h1>
			<RankingList />
		</RankContainer>
	);
}

export default Ranking;
