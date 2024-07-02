// src/pages/Ranking.js
import React from 'react';
import { Container } from '@mui/material';
import RankingList from 'components/RankingList';
import styled from '@emotion/styled';

export const RankContainer = styled.div`
	margin-top: 3vh;
	height: 80vh;
  text-align: center;
`;

function Ranking() {
	return (
		<RankContainer maxWidth="sm">
			<h1 >랭킹 화면</h1>
			<RankingList />
		</RankContainer>
	);
}

export default Ranking;
