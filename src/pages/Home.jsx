// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '@mui/material';
import styled from '@emotion/styled';

// 스타일 정의
const CenteredContainer = styled(Container)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	text-align: center; // 텍스트 가운데 정렬
`;

const Circle = styled.div`
	background-color: wheat;
	width: 600px;
	height: 600px;
	border: 5px solid wheat;
	border-radius: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Contents = styled.div`
	font-size: 25px;
`;

const StyledButton = styled(Button)`
	width: 200px;
	height: 70px;
	font-size: 20px;
	border-radius: 20px;
`;

function Home() {
	return (
		<CenteredContainer maxWidth="sm">
			<Circle>
				<Contents>
					<h1>명조 틀린그림찾기</h1>
					<Link to="/name-input">
						<StyledButton variant="contained" color="primary" fullWidth>
							게임 시작
						</StyledButton>
					</Link>
				</Contents>
			</Circle>
		</CenteredContainer>
	);
}

export default Home;
