// src/pages/NameInput.js
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Container, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userNameAtom } from '../store';
import RankingList from '../components/RankingList';
import styled from '@emotion/styled';
import { playSingleAudio } from 'utils/playAudio';

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
	const navigate = useNavigate();

	const handleChange = (event) => {
		setLocalName(event.target.value);
	};

	const handleGameStart = () => {
		setName(localName);
		playSingleAudio('countdown.wav');
		setTimeout(() => {
			navigate('/game');
		}, 3000); // 1초 후 페이지 이동
	};

	return (
		<StyledContainer maxWidth="sm">
			<StyledDiv>
				<h1>이름을 입력하세요</h1>
				<TextField
					label="이름"
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
					onClick={handleGameStart}>
					게임 시작
				</StyledButton>

				<RankingList />
			</StyledDiv>
		</StyledContainer>
	);
}

export default NameInput;
