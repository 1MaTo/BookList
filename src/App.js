import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from './components/BookList/List'
import SingleBook from './components/SingleBook'
import { createStore } from "redux"
import { Provider } from "react-redux"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global a': {
      color: 'inherit',
      textDecoration: 'none',
    },
    '@global body': {
      background: '#f9f9f9',
    }
  })
);

const initialState = {
  bookList: [],
  book: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        ...state,
        bookList: action.books
      }
    case "SET_BOOK":
      return {
        ...state,
        book: action.book
      }
    case "DELETE_BOOK":
      return {
        ...state,
        book: null
      }
    default:
      return state
  }
}

const store = createStore(reducer)

function App() {
  const classes = useStyles()
  return (
    <Provider store={store}>
      <Router className={`${classes.a} ${classes.root}`}>
        <Route path="/" exact component={List} />
        <Route path='/book/:id' component={SingleBook} />
      </Router>
    </Provider>
  );
}
export default App;