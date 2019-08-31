import React from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Container, Button, Typography } from '@material-ui/core';
import { Link } from "react-router-dom"
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            background: 'white',
            display: 'flex',
            'box-shadow': '0px 0px 15px rgba(0,0,0,0.15)',
            margin: '20px 100px 80px 100px',
            'border-radius': '5px',
            'min-width': '660px',
        },
        'menu-item': {
            'text-align': 'center',
            'width': '90px',
            'font-size': '12pt',
            'line-height': '60px',
            'text-decoration': 'none',
            'color': 'black',
            'padding': '0px 20px 0px 20px',
            'box-sizing': 'unset',
            '&:hover': {
                cursor: 'pointer',
                background: 'white',
                'box-shadow': 'inset 2px 1px 10px -2px #c7c7c7',
            },
        },
        auth: {
            float: 'right',
        },
        root: {
            'padding-top': '20px',
            'margin-bottom': '40px',
            flexGrow: 1,
            background: 'inherit',
        },
        menu: {
            padding: theme.spacing(2),
            textAlign: 'center',
            display: 'flex',
            color: theme.palette.text.secondary,
            '&:hover': {
                'text-decoration': 'none',
            }
        },
        icon: {
            'margin-right': '10px',
            'font-size': '1.3rem'
        },
        authMenu: {
            display: 'contents',
            padding: 0,
        },
        buttonLayout: {
            padding: 0,
        },
    })
);

export default function HeaderMenu(props) {
    const classes = useStyles()
    return (
        <Container className={classes.root}>
            <MainMenuItems />
        </Container>
    )
}

function MainMenuItems() {
    const classes = useStyles()
    return (
        <Container style={{ display: 'contents' }}>
            <Button className={classes.buttonLayout}>
                <Link className={classes.menu} to="/">
                    <ListIcon className={classes.icon} /><Typography variant="subtitle2">Книги</Typography>
                </Link>
            </Button>
        </Container>
    )
}
