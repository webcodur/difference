// Game.js
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { scoreAtom, userNameAtom, rankingAtom } from '../store';
import { coordinates } from '../assets/coordinates';
import {
	GameContainer,
	GameTitle,
	GameInfoWrapper,
	ImageContainer,
	ImageMark,
} from './Game.Style';

function Game() {
	const [score, setScore] = useAtom(scoreAtom);
	const [userName] = useAtom(userNameAtom);
	const [ranking, setRanking] = useAtom(rankingAtom);

	const [round, setRound] = useState(0);
	const [message, setMessage] = useState('');
	const [foundDifferences, setFoundDifferences] = useState([]);
	const [marks, setMarks] = useState([]);
	const [incorrectAttempts, setIncorrectAttempts] = useState(0);
	const navigate = useNavigate();
	const diffCoordinates = coordinates[round];

	const handleImageClick = (event, diffCoordinates) => {
		const imgElement = event.target;
		const rect = imgElement.getBoundingClientRect();

		// 클릭 좌표를 이미지 요소의 상대 좌표로 변환
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		// 이미지 요소의 비율을 고려하여 실제 좌표 계산
		const xRatio = imgElement.naturalWidth / rect.width;
		const yRatio = imgElement.naturalHeight / rect.height;

		const actualX = x * xRatio;
		const actualY = y * yRatio;

		const clickRadius = 20;

		const isCorrect = diffCoordinates.some(
			(diff) =>
				Math.sqrt(
					Math.pow(diff.x - actualX, 2) + Math.pow(diff.y - actualY, 2)
				) < clickRadius
		);

		const mark = {
			x: (x / rect.width) * 100,
			y: (y / rect.height) * 100,
			correct: isCorrect,
		};

		if (isCorrect) {
			const alreadyFound = foundDifferences.some(
				(diff) =>
					Math.sqrt(
						Math.pow(diff.x - actualX, 2) + Math.pow(diff.y - actualY, 2)
					) < clickRadius
			);

			if (!alreadyFound) {
				setMessage('정답입니다!');
				setScore(score + 1);
				setFoundDifferences([...foundDifferences, { x: actualX, y: actualY }]);
				setMarks([...marks, mark]);

				if (foundDifferences.length + 1 === diffCoordinates.length) {
					setTimeout(handleNext, 1000);
				}
			} else {
				setMessage('이미 찾은 차이점입니다!');
			}
		} else {
			const alreadyMarked = marks.some(
				(m) =>
					Math.sqrt(Math.pow(m.x - mark.x, 2) + Math.pow(m.y - mark.y, 2)) <
					clickRadius
			);

			if (!alreadyMarked) {
				setMessage('틀렸습니다!');
				setIncorrectAttempts(incorrectAttempts + 1);
				setMarks([...marks, mark]);

				setTimeout(() => {
					setMarks((prevMarks) => prevMarks.filter((m) => m !== mark));
				}, 1000);
			}
		}
	};

	const handleNext = () => {
		if (round < coordinates.length - 1) {
			setRound(round + 1);
			setFoundDifferences([]);
			setIncorrectAttempts(0);
			setMessage('');
			setMarks([]);
		} else {
			const newRanking = [
				...ranking,
				{
					name: userName || '익명',
					score,
					date: new Date().toLocaleString(), // 현재 날짜와 시간 추가
				},
			];
			setRanking(newRanking);
			localStorage.setItem('ranking', JSON.stringify(newRanking));
			navigate('/ranking');
		}
	};

	const handleSlideChange = (swiper) => {
		if (swiper.activeIndex !== round) {
			swiper.slideTo(round);
		}
	};

	const ImageWithMarks = ({ src, diffCoordinates }) => (
		<ImageContainer>
			<img
				src={src}
				alt="이미지"
				width="100%"
				onClick={(e) => handleImageClick(e, diffCoordinates)}
			/>
			{marks.map((mark, i) => (
				<ImageMark key={i} x={mark.x} y={mark.y} correct={mark.correct}>
					{!mark.correct && 'X'}
				</ImageMark>
			))}
		</ImageContainer>
	);

	return (
		<GameContainer>
			<>
				<GameTitle>
					{round + 1} 라운드 ({round + 1}/{coordinates.length})
				</GameTitle>
				<GameInfoWrapper>
					<p>
						현재 {diffCoordinates.length}중 {foundDifferences.length}개 찾음
					</p>
					<p>점수: {score}점</p>
					<p>오답: {incorrectAttempts}회</p>
				</GameInfoWrapper>
				<Swiper
					spaceBetween={50}
					slidesPerView={1}
					navigation={false}
					pagination={{ clickable: true }}
					scrollbar={{ draggable: true }}
					onSlideChange={handleSlideChange}
					allowTouchMove={false}>
					{coordinates.map((_, index) => (
						<SwiperSlide key={index}>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<ImageWithMarks
									src={`/images/img${round + 1}1.jpg`}
									diffCoordinates={diffCoordinates}
								/>
								<ImageWithMarks
									src={`/images/img${round + 1}2.jpg`}
									diffCoordinates={diffCoordinates}
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				{message && <div>{message}</div>}
			</>
		</GameContainer>
	);
}

export default Game;
