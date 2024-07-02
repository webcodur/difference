/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { messageAtom } from '../store';
import { useAtom } from 'jotai';

const FullScreenContainer = styled.div`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
`;

const FixedContents = styled.div`
	position: fixed;
`;

const StyledContainer = styled.div`
	margin: 0px;
	padding: 0px;
	width: 96%;
	margin-left: 2%;
`;

const linkStyle = css`
	text-decoration: none;
	color: inherit;
`;

const fadeOut = keyframes`
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
`;

const FixedMessageContainer = styled.div`
	position: fixed;
	z-index: 10;
	top: 96%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 30px;
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
	animation: ${fadeOut} 3s forwards;

	& > * {
		margin: 0 5px;
	}
`;

function Layout({ children }) {
	const [message] = useAtom(messageAtom);
	const [showMessage, setShowMessage] = useState(false);

	useEffect(() => {
		if (message !== null) {
			setShowMessage(false);
			setTimeout(() => {
				setShowMessage(true);
			}, 10); // 약간의 지연을 주어 리렌더링 트리거
		}
	}, [message]);

	return (
		<FullScreenContainer>
			<FixedContents>
				<Link to="/" css={linkStyle}>
					<Button color="inherit" startIcon={<HomeIcon />} />
				</Link>

				{showMessage && (
					<FixedMessageContainer>
						<div>{message}</div>
					</FixedMessageContainer>
				)}
			</FixedContents>

			<StyledContainer>{children}</StyledContainer>
		</FullScreenContainer>
	);
}

export default Layout;
