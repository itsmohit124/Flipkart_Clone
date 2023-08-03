import { useState } from 'react';

import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, styled } from '@mui/material';
import { Menu } from '@mui/icons-material';
//component
import Search from './Search';
import CustomButtons from './CustomButtons';
import { Link } from  'react-router-dom';


const StyledHeader = styled(AppBar)`
    background: #2874f0;
    shadow: none;
    height: 55px;
`
const Component = styled(Link)`
    margin-left: 12%;
    line-height:0;
    text-decoration: none;
    color: inherit;
`
const SubHeading = styled(Typography)`
    font-size:10px;
    font-style:italic;
`


const PlusImage = styled('img')({
    width: 10,
    height: 10,
    marginLeft: 4
});

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const CustomButtonsWrapper = styled('span')(({ theme }) => ({ 
    margin: '0 5% 0 auto', 
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

const  Header = () => {
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const list = () => (
        <Box style={{ width: 250 }} onClick={handleClose}>
            <List>
                <listItem button>
                    <CustomButtons />
                </listItem>
            </List>
        </Box>
    );

    return (
        <StyledHeader>
            <Toolbar style={{minHeight:55}}>
            <MenuButton
                    color="inherit"
                    onClick={handleOpen}
                >
                    <Menu />
                </MenuButton>
                <Drawer open={open} onClose={handleClose}>
                    {list()}
                </Drawer>
                <Component to='/' >
                    <img src={logoURL} alt='logo' style={{ width: '75px'}}/>
                    <Box style={{display:'flex'}}>
                        <SubHeading>Explore&nbsp;
                            <Box component="span" style={{color: '#FFF500'}}>Plus</Box>
                        </SubHeading>
                        <PlusImage src={subURL} alt='sub-logo'/>
                    </Box>
                </Component>
                <Search/>
                <CustomButtonsWrapper>
                    <CustomButtons/>
                </CustomButtonsWrapper>
            </Toolbar>
        </StyledHeader>
    );
}

export default Header;