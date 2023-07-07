import { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function SwipeableTemporaryDrawer() {
    const [isDrawerOpen, setisDrawerOpen] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setisDrawerOpen(open);
    };

    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {
                    // ["Home", "My Blogs", "Write New Blog","profile","logout","Contact us"]
                    [{ value: "HOME", link: '/' }, { value: "NEW BLOG", link: '/newblog' }, { value: "MY BLOGS", link: '/myblogs' }]
                        .map(({ value, link }) => (
                            <ListItem key={value} disablePadding >
                                <Link to={link} > <ListItemButton>
                                    <ListItemIcon>
                                        {2 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText sx={{ textDecorationLine: 'none' }} primary={value} />
                                </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div>
            <IconButton
                size="large"
                aria-label="Drawer"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <SwipeableDrawer
                anchor={"left"}
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list}
            </SwipeableDrawer>
        </div>
    );
}
