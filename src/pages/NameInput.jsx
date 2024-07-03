// src/pages/NameInput.js
import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { Container, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userNameAtom } from '../store';
import RankingList from '../components/RankingList';
import styled from '@emotion/styled';
import { playSingleAudio, preloadAudio } from 'utils/playAudio';

const StyledContainer = styled(Container)`
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 600px;
`;

const StyledButton = styled(Button)`
	margin-top: 20px;
	width: 200px;
	font-family: jua;
	font-size: 20px;
	border-radius: 20px;
	background-color: #4caf50; /* 버튼 배경색 */
	color: white; /* 버튼 텍스트 색상 */
	&:hover {
		background-color: #45a049; /* 호버 시 버튼 배경색 */
	}
`;

function NameInput() {
	const [, setName] = useAtom(userNameAtom);
	const [localName, setLocalName] = useState('');
	const [labelName, setLabelName] = useState('이름');
	const [gameStartText, setGameStartText] = useState('게임 시작');
	const [isStarting, setIsStarting] = useState(false);
	const navigate = useNavigate();

	const handleChange = (event) => {
		setLocalName(event.target.value);
	};

	const handleGameStart = () => {
		if (isStarting) return;
		setIsStarting(true);
		setName(localName);
		setGameStartText('3초 후 시작');
		if (localName === '') setLabelName('익명');
		playSingleAudio('countdown.wav');

		const countdown = [3, 2, 1];
		countdown.forEach((time, index) => {
			setTimeout(() => {
				setGameStartText(`${time}초 후 시작`);
			}, index * 1000);
		});

		setTimeout(() => {
			navigate('/game');
			if (localName === '') setName('익명');
		}, 3000); // 3초 후 페이지 이동
	};

	useEffect(() => {
		preloadAudio('countdown.wav');
	}, []);

	return (
		<StyledContainer maxWidth="sm">
			<StyledDiv>
				<h1>이름을 입력하세요</h1>
				<TextField
					label={labelName}
					variant="outlined"
					fullWidth
					value={localName}
					onChange={handleChange}
					margin="normal"
					autoComplete="off"
				/>
				<StyledButton
					variant="contained"
					color="primary"
					fullWidth
					onClick={handleGameStart}
					disabled={isStarting} // 시작 중일 때 버튼 비활성화
				>
					{gameStartText}
				</StyledButton>

				<RankingList />
			</StyledDiv>
		</StyledContainer>
	);
}

export default NameInput;
