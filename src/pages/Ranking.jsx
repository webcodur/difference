// src/pages/Ranking.js
import React, { useEffect } from 'react';
import RankingList from 'components/RankingList';
import styled from '@emotion/styled';
import { playSingleAudio, stopAudio } from 'utils/playAudio';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export const RankContainer = styled.div`
	margin-top: 3vh;
	height: 80vh;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ButtonDiv = styled.div`
	margin-top: 40px;
	display: flex;
	gap: 10px;
`;

const StyledButton = styled(Button)`
	padding: 10px;
	font-family: jua;
	font-size: 20px;
	border-radius: 20px;
	background-color: #4caf50;
	color: white;
	&:hover {
		background-color: #45a049;
	}
`;

const StyledButton2 = styled(Button)`
	padding: 10px;
	font-family: jua;
	font-size: 20px;
	border-radius: 20px;
	background-color: #00bfff;
	color: white;
	&:hover {
		background-color: #007fff;
	}
`;

function Ranking() {
	const navigate = useNavigate();
	useEffect(() => {
		playSingleAudio('applause.mp3', 'applause');
	}, []);

	const handleStopAudio = () => {
		stopAudio('applause');
	};

	return (
		<RankContainer maxWidth="sm">
			<h1>모든 라운드 통과!</h1>
			<RankingList />
			<ButtonDiv>
				<StyledButton onClick={handleStopAudio}>오디오 중단</StyledButton>
				<StyledButton2
					onClick={() => {
						navigate('/');
					}}>
					홈으로 이동
				</StyledButton2>
			</ButtonDiv>
		</RankContainer>
	);
}

export default Ranking;
