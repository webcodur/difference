import styled from '@emotion/styled';
import { Container } from '@mui/material';

// 스타일 정의
export const CenteredContainer = styled(Container)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	text-align: center;
	cursor: pointer;
`;

export const Circle = styled.div`
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

export const Contents = styled.div`
	font-size: 25px;
`;
