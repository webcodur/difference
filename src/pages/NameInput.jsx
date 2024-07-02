// src/pages/NameInput.js
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { Container, TextField, Button } from '@mui/material';
import { userNameAtom } from '../store';
import RankingList from '../components/RankingList';
import styled from '@emotion/styled';

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
	const [localName, setLocalName] = useState(''); // useState로 로컬 상태 관리

	const handleChange = (event) => {
		setLocalName(event.target.value);
	};

	const handleValueToGlobal = () => {
		setName(localName);
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
				<Link to="/game">
					<StyledButton
						variant="contained"
						color="primary"
						fullWidth
						onClick={handleValueToGlobal}>
						게임 시작
					</StyledButton>
				</Link>

				<RankingList />
			</StyledDiv>
		</StyledContainer>
	);
}

export default NameInput;
