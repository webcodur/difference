import styled from '@emotion/styled';

export const GameContainer = styled.div`
	margin-top: 10vh;
	height: 80vh;
`;

export const GameTitle = styled.h1`
	text-align: center;
`;

export const GameInfoWrapper = styled.div`
	text-align: center;
	margin: 10px 0;
`;

export const ImageContainer = styled.div`
	position: relative;
	width: 48%;
`;

export const ImageMark = styled.div`
	position: absolute;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	background-color: ${(props) => (props.correct ? 'red' : 'transparent')};
	border: ${(props) => (props.correct ? 'none' : '2px solid red')};
	line-height: 30px;
	text-align: center;
	color: red;
	top: ${(props) => `${props.y}%`};
	left: ${(props) => `${props.x}%`};
	transform: translate(-50%, -50%);
`;

export const ProgressContainer = styled.div`
	position: fixed;
	left: 0;
	top: 10vh; /* GameContainer의 margin-top과 맞추기 위해 조정 */
	bottom: 10vh; /* GameContainer의 height와 맞추기 위해 조정 */
	width: 10px;
	background-color: lightgray;
`;

export const ProgressBar = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column-reverse;
`;

export const FoundIconContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
	& > * {
		margin: 0 5px;
	}
`;
