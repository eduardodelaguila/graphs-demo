import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    Divider,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ShowChartIcon from "@material-ui/icons/ShowChart";

import "./Nav.scss";

const Nav = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const history = useHistory();

    const changeRoute = (route) => {
        history.push(route);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setDrawerIsOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {useLocation().pathname}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor={"left"}
                open={drawerIsOpen}
                onClose={() => setDrawerIsOpen(false)}
            >
                <p>Nivo</p>
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button onClick={() => changeRoute("/nivo/line")}>
                        <ShowChartIcon />
                        Line
                    </ListItem>
                </List>
                <Divider />
                <p>Apex Charts</p>
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button onClick={() => changeRoute("/apex/line")}>
                        <ShowChartIcon />
                        Line
                    </ListItem>
                </List>
                <Divider />
                <p>Charts JS</p>
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem
                        button
                        onClick={() => changeRoute("/chartjs/line")}
                    >
                        <ShowChartIcon />
                        Line
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default Nav;
