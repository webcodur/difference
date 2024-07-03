// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { playSingleAudio, preloadAudio } from 'utils/playAudio';
import { CenteredContainer, Circle, Contents } from 'styles/HomeStyle';

import { useAtom } from 'jotai';
import { scoreAtom } from '../store';

function Home() {
	const navigate = useNavigate();
	const [animate, setAnimate] = useState(false); // 애니메이션 상태 추가
	const [, setScore] = useAtom(scoreAtom);

	useEffect(() => {
		setScore(0);
		preloadAudio('anchor.mp3'); // 오디오 파일 미리 로드
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
					<h1>틀린 그림 찾기</h1>
				</Contents>
			</Circle>
		</CenteredContainer>
	);
}

export default Home;
