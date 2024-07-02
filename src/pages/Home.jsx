// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import styled from '@emotion/styled';
import { playSingleAudio } from 'utils/playAudio';

import { useAtom } from 'jotai';
import { scoreAtom } from '../store';

// 스타일 정의
const CenteredContainer = styled(Container)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	text-align: center;
	cursor: pointer;
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
	transition: background 1s, transform 1s;

	&:hover {
		background: radial-gradient(circle, lightblue 0%, white 100%);
	}

	&.animate {
		transform: scale(1.1); // 클릭 시 확대되는 애니메이션 추가
	}
`;

const Contents = styled.div`
	font-size: 25px;
`;

function Home() {
	const navigate = useNavigate();
	const [animate, setAnimate] = useState(false); // 애니메이션 상태 추가
	const [, setScore] = useAtom(scoreAtom);

	useEffect(() => {
		setScore(0);
	}, [setScore]);

	const handleCircleClick = () => {
		playSingleAudio('anchor.mp3');
		setAnimate(true); // 애니메이션 트리거 설정
		setTimeout(() => {
			navigate('/name-input');
		}, 1000); // 1초 후 페이지 이동
	};

	return (
		<CenteredContainer maxWidth="sm" onClick={handleCircleClick}>
			<Circle className={animate ? 'animate' : ''}>
				<Contents>
					<h1>명조 틀린그림찾기</h1>
				</Contents>
			</Circle>
		</CenteredContainer>
	);
}

export default Home;
