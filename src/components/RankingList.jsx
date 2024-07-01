// src/components/RankingList.js
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { rankingAtom } from '../store';
import { Container } from '@mui/material';

function RankingList() {
	const [ranking, setRanking] = useAtom(rankingAtom);

	useEffect(() => {
		const storedRanking = JSON.parse(localStorage.getItem('ranking')) || [];
		setRanking(storedRanking);
	}, [setRanking]);

	return (
		<Container>
			<h2>랭킹</h2>
			<ul>
				{ranking
					.sort((a, b) => b.score - a.score)
					.map((entry, index) => (
						<li key={index}>
							{entry.name}: {entry.score}
						</li>
					))}
			</ul>
		</Container>
	);
}

export default RankingList;
