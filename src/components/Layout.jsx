/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

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

function Layout({ children }) {
	return (
		<FullScreenContainer>
			<FixedContents>
				<Link to="/" css={linkStyle}>
					<Button color="inherit" startIcon={<HomeIcon />} />
				</Link>
			</FixedContents>
			<StyledContainer>{children}</StyledContainer>
		</FullScreenContainer>
	);
}

export default Layout;
