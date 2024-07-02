// Game.Style.js
import styled from '@emotion/styled';

export const GameContainer = styled.div`
	margin-top: 10vh;
	height: 80vh;
	background-color: wheat;
`;

export const GameTitle = styled.h1`
	text-align: center;
`;

export const GameInfoWrapper = styled.p`
	text-align: center;
	margin: 10px 0;
`;

export const ImageContainer = styled.div`
	position: relative;
	width: 48%;
`;

export const ImageMark = styled.div`
	position: absolute;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => (props.correct ? 'red' : 'transparent')};
	border: ${(props) => (props.correct ? 'none' : '2px solid red')};
	line-height: 20px;
	text-align: center;
	color: red;
	top: ${(props) => `${props.y}%`};
	left: ${(props) => `${props.x}%`};
	transform: translate(-50%, -50%);
`;
