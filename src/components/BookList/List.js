import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import HeaderMenu from '../HeaderMenu'
import { Books as Book } from './Book'
import { useSelector, useDispatch } from "react-redux"
import { Loading } from '../Loading'
import axios from 'axios'

const serverUrl = 'http://localhost:8080'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            background: '#f9f9f9',
        },
    })
);

function List() {
    const books = useSelector(state => state.bookList)
    const dispatch = useDispatch()
    const classes = useStyles();

    useEffect(() => {
        axios.get(serverUrl + '/api/books')
            .then(res => {
                if (JSON.stringify(books) !== JSON.stringify(res.data))
                    dispatch({ type: "SET_BOOKS", books: res.data })
            })
    }, [books, dispatch]);

    return (
        <div className={classes.background}>
            <HeaderMenu />
            {books.length ? <BookList books={books} /> : <Loading />}
        </div>
    )
}

function BookList(props) {
    const books = props.books
    return books.map(item => {
        return <Book bookData={item} key={item.id} />
    })
}

export default List