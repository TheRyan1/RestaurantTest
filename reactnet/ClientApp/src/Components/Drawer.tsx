import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AppRoutes from '../Routes/AppRoutes';
import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import {doLogout} from '../API/Auth';

const getRole = () => {

    return JSON.parse(localStorage.getItem("user") || "{}")?.role

}
const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,

    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const navigate = useNavigate()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex', margin: 0}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Skills Test Restaurant Application
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Button sx={{marginRight: 5}} variant='contained' color="error"
                            onClick={() => {
                                doLogout()
                            }}
                    >Logout</Button>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>

                </DrawerHeader>

                {/** List items for the Drawer */}

                <List>

                    {[{title: 'Restaurants', route: "Restaurants", icon: <StorefrontIcon/>}, {
                        title: 'Reservations',
                        route: "Reservations/0",
                        icon: <MailIcon/>
                    },

                        {title: 'Meals', route: "Meals/0", icon: <FastfoodIcon/>}

                    ].map((menuitem, index) => (
                        <ListItem key={menuitem.title} disablePadding>
                            <ListItemButton onClick={() => {
                                navigate(`/${menuitem.route}`)
                            }}>
                                <ListItemIcon>
                                    {menuitem.icon}
                                </ListItemIcon>
                                {/**Split the text to manage the default root for getting all the data */}
                                <ListItemText primary={menuitem.title}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    {getRole() === "Admin" && <ListItem key={"Users"} disablePadding>
                        <ListItemButton onClick={() => {
                            navigate("/Users")
                        }}>
                            <ListItemIcon>
                                <PeopleAltIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Users"}/>
                        </ListItemButton>
                    </ListItem>}
                </List>


            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
                {/**Content goes here */}
                <AppRoutes/>
            </Main>
        </Box>
    );
}
