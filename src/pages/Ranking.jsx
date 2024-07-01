// src/pages/Ranking.js
import React from 'react';
import { Container } from '@mui/material';
import RankingList from '../components/RankingList';

function Ranking() {
	return (
		<Container maxWidth="sm">
			<h1>랭킹 화면</h1>
			<RankingList />
		</Container>
	);
}

export default Ranking;
