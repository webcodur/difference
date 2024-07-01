// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function Header() {
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="home"
					component={Link}
					to="/">
					<HomeIcon />
				</IconButton>
				<Typography variant="h6">틀린그림찾기 게임</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
