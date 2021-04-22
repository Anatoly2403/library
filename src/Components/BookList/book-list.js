import React from 'react';
import './book-list.css';
import BookListItem from '../BookListItem';
import { withRouter } from "react-router"

const BookList = ({ books, setPageNum, history: { push }, numFound }) => {    
    return (
        <div className="book-list">
            <ul className='book-list__table'>
                {books.map(book => <BookListItem key={book.key} book={book} push={push} />)}
            </ul>
            {((numFound / 10 >= 1)
                && <div className='book-list__pagination'>
                    <button className='book-list__prev' onClick={setPageNum}>Prev</button>
                    <button className='book-list__next' onClick={setPageNum}>Next</button>
                </div>)}
        </div>
    )
}

export default withRouter(BookList);