// Game.Style.js
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const GameContainer = styled.div`
	max-width: lg;
	margin: 0 auto;
	padding: 20px;
`;

export const GameTitle = styled.h1`
	text-align: center;
`;

export const GameInfo = styled.p`
	text-align: center;
	margin: 10px 0;
`;

export const ImageContainer = styled(Grid)`
	position: relative;
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
