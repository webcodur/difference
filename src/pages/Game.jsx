import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { scoreAtom, userNameAtom, rankingAtom, messageAtom } from '../store';
import { coordinates } from '../assets/coordinates';
import RoundProgress from 'components/roundProgress/RoundProgress';
import {
	GameContainer,
	GameTitle,
	GameInfoWrapper,
	ImageContainer,
	ImageMark,
} from 'styles/GameStyle';

// import { playSingleAudio } from 'utils/playAudio';
import { playSingleAudio, preloadAudio } from 'utils/playAudio';
import RoundTime from 'components/RoundTime';

const roundTimeLimit = 90; // 라운드 당 시간 제한 (초)
const incorrectPenalty = 10; // 오답 시 차감 시간 (초)

function Game() {
	const [score, setScore] = useAtom(scoreAtom);
	const [userName] = useAtom(userNameAtom);
	const [ranking, setRanking] = useAtom(rankingAtom);
	const [message, setMessage] = useAtom(messageAtom);

	const [round, setRound] = useState(0);
	const [isGameOver, setIsGameOver] = useState(false);
	const [foundDifferences, setFoundDifferences] = useState([]);
	const [marks, setMarks] = useState([]);
	const [timeLeft, setTimeLeft] = useState(roundTimeLimit);
	const swiperRef = useRef(null);

	const navigate = useNavigate();
	const diffCoordinates = coordinates[round];

	useEffect(() => {
		preloadAudio('click-success.mp3');
		preloadAudio('click-fail.mp3');
		preloadAudio('game-over.mp3');
	}, []);

	const handleNext = useCallback(() => {
		// 다음 라운드
		if (round < coordinates.length - 1) {
			const newScore = score + timeLeft * 5;
			setScore(newScore);

			const msg = `${score} + ${timeLeft * 5} : ${newScore}`;
			setMessage(msg);

			setRound(round + 1);
			setFoundDifferences([]);

			setMarks([]);
			setTimeLeft(roundTimeLimit);
			swiperRef.current.slideNext();
		}

		// 게임 종료
		else {
			const newRanking = [
				...ranking,
				{
					name: userName || '익명',
					score,
					date: new Date().toLocaleString(),
				},
			].sort((a, b) => b.score - a.score);

			if (newRanking.length > 10) newRanking.splice(10);
			setRanking(newRanking);
			localStorage.setItem('ranking', JSON.stringify(newRanking));
			navigate('/ranking');
		}
	}, [
		navigate,
		ranking,
		round,
		score,
		setMessage,
		setRanking,
		setScore,
		timeLeft,
		userName,
	]);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime > 0) return prevTime - 1;
				else {
					handleNext();
					return 0;
				}
			});
		}, 1000);
		return () => clearInterval(timer);
	}, [handleNext, round]);

	const handleMessage = (newMessage) => {
		message === newMessage
			? setMessage(' ' + newMessage + ' ')
			: setMessage(newMessage);
	};

	const handleImageMouseDown = (event, diffCoordinates) => {
		if (isGameOver) return;

		const imgElement = event.target;
		const rect = imgElement.getBoundingClientRect();

		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const xRatio = imgElement.naturalWidth / rect.width;
		const yRatio = imgElement.naturalHeight / rect.height;

		const actualX = x * xRatio;
		const actualY = y * yRatio;

		const clickRadius = 60;

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
			id: new Date().getTime(), // 고유 ID 생성
		};

		if (isCorrect) {
			const alreadyFound = foundDifferences.some(
				(diff) =>
					Math.sqrt(
						Math.pow(diff.x - actualX, 2) + Math.pow(diff.y - actualY, 2)
					) < clickRadius
			);

			if (!alreadyFound) {
				playSingleAudio('click-success.mp3');
				// setMessage('정답입니다!');
				handleMessage('정답입니다!');
				setScore(score + 100); // 각 정답 100점
				setFoundDifferences([...foundDifferences, { x: actualX, y: actualY }]);
				setMarks([...marks, mark]);

				if (foundDifferences.length + 1 === diffCoordinates.length) {
					setTimeout(handleNext, 1000);
				}
			} else {
				handleMessage('이미 찾은 차이점입니다!');
			}
		} else {
			playSingleAudio('click-fail.mp3');
			handleMessage('틀렸습니다!');

			if (timeLeft - 15 <= 0) {
				playSingleAudio('game-over.mp3');
				handleMessage('game over... 3초 후 메인화면으로 이동');
				setIsGameOver(true);
				setTimeout(() => {
					navigate('/');
				}, [3000]);
				return;
			}

			setTimeLeft((prevTime) => Math.max(prevTime - incorrectPenalty, 0)); // 오답 시 시간 차감
			setMarks([...marks, mark]);

			setTimeout(() => {
				setMarks((prevMarks) => prevMarks.filter((m) => m.id !== mark.id));
			}, 1000); // 각 마크를 개별적으로 관리하여 일정 시간 후 사라지게 함
		}
	};

	const ImageWithMarks = ({ src, diffCoordinates }) => (
		<ImageContainer>
			<img
				src={`${process.env.PUBLIC_URL}${src}`}
				alt="이미지"
				width="100%"
				onMouseDown={(e) => handleImageMouseDown(e, diffCoordinates)}
				draggable="false" // 드래그 방지
				onDragStart={(e) => e.preventDefault()} // 드래그 방지
			/>
			{marks.map((mark, i) => (
				<ImageMark key={i} x={mark.x} y={mark.y} correct={mark.correct} />
			))}
		</ImageContainer>
	);

	return (
		<GameContainer>
			<RoundTime timeLeft={timeLeft} roundTimeLimit={roundTimeLimit} />
			<>
				<GameTitle>
					{round + 1} 라운드 ({round + 1}/{coordinates.length})
				</GameTitle>
				<GameInfoWrapper>
					<RoundProgress
						diffCoordinates={diffCoordinates}
						foundDifferences={foundDifferences}
					/>
					<p>점수: {score}점</p>
					<p>남은 시간: {timeLeft}초</p>
				</GameInfoWrapper>
				<Swiper
					spaceBetween={50}
					slidesPerView={1}
					navigation={false}
					pagination={{ clickable: true }}
					scrollbar={{ draggable: true }}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					allowTouchMove={false}>
					{coordinates.map((_, index) => (
						<SwiperSlide key={index}>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<ImageWithMarks
									src={`/images/img${index + 1}1.jpg`}
									diffCoordinates={diffCoordinates}
								/>
								<ImageWithMarks
									src={`/images/img${index + 1}2.jpg`}
									diffCoordinates={diffCoordinates}
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</>
		</GameContainer>
	);
}

export default Game;
