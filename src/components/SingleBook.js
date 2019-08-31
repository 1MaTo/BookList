import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import HeaderMenu from './HeaderMenu'
import { Grid } from '@material-ui/core';
import { GetTags } from './BookList/Book'
import Divider from '@material-ui/core/Divider';
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'
import { Loading } from './Loading'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: '70%',
            minWidth: 340,
            margin: 'auto',
            display: 'flex'
        },
        background: {
            background: '#f9f9f9',
        },
        image: {
            height: 450,
            width: 320,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
            height: 'fit-content',

        },
        imgPaper: {
            padding: theme.spacing(0.5),
            marginRight: '20px',
            height: 'fit-content',
            width: 'min-content',
        },
        infoPaper: {
            padding: theme.spacing(1.5),
            width: 'inherit',
            cursor: 'default',
            height: 'fit-content'
        },
        date: {
            float: 'right',
        },
        tips: {
            color: '#939393'
        },
        chip: {
            margin: theme.spacing(0.7)
        },
        button: {
            width: 320,
            marginTop: 4,
        },
        progressBar: {
            width: 40,
            marginLeft: -44,
        },
        bookFooter: {
            height: 20,
        },
        adminPanel: {
            color: '#5b5b5b',
            padding: 5,
            position: 'absolute',
            right: 0,
            top: 10,
        },
        adminButton: {
            marginLeft: 10,
            borderRadius: 20,
            padding: 6,
        },
        '@media (max-width: 900px)': {
            root: {
                flexWrap: 'wrap',
            },
            imgPaper: {
                margin: 'auto',
                marginBottom: 20,
            },
            infoPaper: {
                margin: 'auto',
            },
            button: {
                width: 320
            },
        },
        '@media (max-width: 600px)': {
            date: {
                float: 'unset',
            },
        },
    })
);

const serverUrl = 'http://localhost:8080'

function BookInfo({ id }) {

    const classes = useStyles()

    const book = useSelector(state => state.book)
    const dispatch = useDispatch()

    useEffect(() => {
        axios
            .get(`${serverUrl}/api/book/${id}`)
            .then(res => {
                if (JSON.stringify(book) !== JSON.stringify(res.data[0]))
                dispatch({ type: "SET_BOOK", book: res.data[0] })
            })
    }, [book, dispatch, id]);

    return (
        (book) ?
        <div className={classes.root}>
            <Paper className={classes.imgPaper}>
                <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={book.img} />
                </ButtonBase>
                <Button
                    disabled={book.currentInUsing === book.totalAmount ? true : false}
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    size="large"
                >
                    Взять книгу
                </Button>
            </Paper>
            <Paper className={classes.infoPaper}>
                <Grid container spacing={3}>
                    <Grid item container xs={12}>
                        <Typography variant="h6">{book.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Typography variant="subtitle2"><span className={classes.tips}>{'Автор: '}</span>{book.author}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Typography className={classes.date} variant="subtitle2"><span className={classes.tips}>{'Год издания: '}</span>{new Date(book.date).getFullYear() + ' г.'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography><span className={classes.tips}>{'О книге: '}</span>{book.about}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography><span className={classes.tips}>{'Теги: '}</span><GetTags tags={book.tags} /></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography><span className={classes.tips}>{'Книг свободно: '}</span>{(book.totalAmount - book.currentInUsing) + ' из ' + book.totalAmount}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{ position: "relative" }}>
                        <Divider />
                        <Typography variant="caption" className={classes.bookFooter}><span className={classes.tips}>{`Обновлено ${ConvertDate(new Date(book.lastUpdate))}`}</span></Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
        : <Loading/>
    )
}

function ConvertDate(props) {
    const date = props
    const month = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря'
    ]
    return (`${date.getDate()} 
    ${month[date.getMonth()]} 
    ${date.getFullYear()} г. 
    в ${date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()}:${date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()}`)
}

export default function SingleBook({ match }) {
    const classes = useStyles()

    return (
        <div className={classes.background}>
            <HeaderMenu />
            <BookInfo id={match.params.id}/>
        </div>
    )
}