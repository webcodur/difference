import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
	currentPairIndexAtom,
	scoreAtom,
	userNameAtom,
	rankingAtom,
} from '../store';
import { coordinates } from '../assets/coordinates';
import { Container, Grid, Button } from '@mui/material';

function Game() {
	const [currentPairIndex, setCurrentPairIndex] = useAtom(currentPairIndexAtom);
	const [score, setScore] = useAtom(scoreAtom);
	const [userName] = useAtom(userNameAtom);
	const [ranking, setRanking] = useAtom(rankingAtom);

	const [message, setMessage] = useState('');
	const [foundDifferences, setFoundDifferences] = useState([]);
	const [marks, setMarks] = useState([]);
	const [incorrectAttempts, setIncorrectAttempts] = useState(0);
	const navigate = useNavigate();

	const handleImageClick = (event, differences) => {
		const imgElement = event.target;
		const rect = imgElement.getBoundingClientRect();

		const xRatio = (event.clientX - rect.left) / rect.width;
		const yRatio = (event.clientY - rect.top) / rect.height;

		const x = xRatio * 1110;
		const y = yRatio * 740;

		const isCorrect = differences.some(
			(diff) =>
				Math.sqrt(Math.pow(diff.x - x, 2) + Math.pow(diff.y - y, 2)) < 20
		);

		const mark = {
			x: xRatio * 100,
			y: yRatio * 100,
			correct: isCorrect,
		};

		if (isCorrect) {
			const alreadyFound = foundDifferences.some(
				(diff) =>
					Math.sqrt(Math.pow(diff.x - x, 2) + Math.pow(diff.y - y, 2)) < 20
			);

			if (!alreadyFound) {
				setMessage('정답입니다!');
				setScore(score + 1);
				setFoundDifferences([...foundDifferences, { x, y }]);
				setMarks([...marks, mark]);
			} else {
				setMessage('이미 찾은 차이점입니다!');
			}
		} else {
			const alreadyMarked = marks.some(
				(m) =>
					Math.sqrt(Math.pow(m.x - mark.x, 2) + Math.pow(m.y - mark.y, 2)) < 2
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
		if (foundDifferences.length >= differences.length) {
			if (currentPairIndex < coordinates.length - 1) {
				setCurrentPairIndex(currentPairIndex + 1);
				setFoundDifferences([]);
				setIncorrectAttempts(0);
				setMessage('');
			} else {
				const newRanking = [...ranking, { name: userName || '익명', score }];
				setRanking(newRanking);
				localStorage.setItem('ranking', JSON.stringify(newRanking));
				navigate('/ranking');
			}
		}
	};

	const handlePrevious = () => {
		if (currentPairIndex > 0) {
			setCurrentPairIndex(currentPairIndex - 1);
			setFoundDifferences([]);
			setIncorrectAttempts(0);
			setMessage('');
		}
	};

	const handleSlideChange = (swiper) => {
		if (swiper.activeIndex !== currentPairIndex) {
			swiper.slideTo(currentPairIndex);
		}
	};

	const rounds = coordinates;
	const differences = rounds[currentPairIndex];

	const ImageWithMarks = ({ src, differences }) => (
		<Grid item xs={6} style={{ position: 'relative' }}>
			<img
				src={src}
				alt="이미지"
				width="100%"
				onClick={(e) => handleImageClick(e, differences)}
			/>
			{marks.map((mark, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						top: `calc(${mark.y}% - 10px)`,
						left: `calc(${mark.x}% - 10px)`,
						width: '20px',
						height: '20px',
						borderRadius: '50%',
						backgroundColor: mark.correct ? 'red' : 'transparent',
						border: mark.correct ? 'none' : '2px solid red',
						lineHeight: '20px',
						textAlign: 'center',
						color: 'red',
					}}>
					{!mark.correct && 'X'}
				</div>
			))}
		</Grid>
	);

	return (
		<Container maxWidth="lg">
			<h1>게임 화면</h1>
			<p>
				현재 라운드: {currentPairIndex + 1} / {coordinates.length}
			</p>
			<p>
				찾아야 할 차이점: {foundDifferences.length} / {differences.length}
			</p>
			<p>현재 점수: {score}</p>
			<p>틀린 횟수: {incorrectAttempts}</p>
			<Button
				variant="contained"
				onClick={handlePrevious}
				disabled={currentPairIndex === 0}>
				이전
			</Button>
			<Button
				variant="contained"
				onClick={handleNext}
				disabled={foundDifferences.length < differences.length}>
				다음
			</Button>

			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				navigation={false}
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				onSlideChange={handleSlideChange}
				allowTouchMove={false}>
				{rounds.map((_, index) => (
					<SwiperSlide key={index}>
						<Grid container spacing={3}>
							<ImageWithMarks
								src={`/images/img${currentPairIndex + 1}1.jpg`}
								differences={differences}
							/>
							<ImageWithMarks
								src={`/images/img${currentPairIndex + 1}2.jpg`}
								differences={differences}
							/>
						</Grid>
					</SwiperSlide>
				))}
			</Swiper>
			<p>클릭 정보: {message}</p>
		</Container>
	);
}

export default Game;
