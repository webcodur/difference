// src/components/RankingList.js
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { rankingAtom } from '../store';
import { Container } from '@mui/material';
import styled from '@emotion/styled';

const StyledContainer = styled(Container)`
	margin-top: 0px;
	text-align: center;
`;

const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	margin-top: 10px;

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
	}

	th {
		background-color: #f2f2f2;
		text-align: center;
	}

	tr:nth-of-type(even) {
		background-color: #f9f9f9;
	}

	tr:hover {
		background-color: #ddd;
	}

	td {
		text-align: center;
	}
`;

function RankingList() {
	const [ranking, setRanking] = useAtom(rankingAtom);

	useEffect(() => {
		const storedRanking = JSON.parse(localStorage.getItem('ranking')) || [];
		setRanking(storedRanking);
	}, [setRanking]);

	return (
		<StyledContainer>
			<h2>랭킹</h2>
			<StyledTable>
				<thead>
					<tr>
						<th>순위</th>
						<th>이름</th>
						<th>점수</th>
						<th>날짜</th>
					</tr>
				</thead>
				<tbody>
					{ranking
						.sort((a, b) => b.score - a.score)
						.map((entry, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{entry.name}</td>
								<td>{entry.score}</td>
								<td>{entry.date}</td>
							</tr>
						))}
				</tbody>
			</StyledTable>
		</StyledContainer>
	);
}

export default RankingList;
