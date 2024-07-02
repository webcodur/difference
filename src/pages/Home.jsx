// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 가져온다.
import { Container } from '@mui/material';
import styled from '@emotion/styled';

// 스타일 정의
const CenteredContainer = styled(Container)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	text-align: center;
	cursor: pointer; // 클릭 가능하도록 커서 추가
`;

const Circle = styled.div`
	background: radial-gradient(circle, wheat 0%, white 100%);
	width: 600px;
	height: 600px;
	border-radius: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: background 1s; // 배경색 전환 애니메이션 추가

	&:hover {
		background: radial-gradient(
			circle,
			lightblue 0%,
			white 100%
		); // hover 시 배경색 변경
	}
`;

const Contents = styled.div`
	font-size: 25px;
`;

function Home() {
	const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 생성

	const handleCircleClick = () => {
		navigate('/name-input'); // 클릭 시 /name-input 경로로 이동
	};

	return (
		<CenteredContainer maxWidth="sm" onClick={handleCircleClick}>
			<Circle>
				<Contents>
					<h1>명조 틀린그림찾기</h1>
				</Contents>
			</Circle>
		</CenteredContainer>
	);
}

export default Home;
