import React from 'react';
import './book-list-item.css';


const BookListItem = ({ book: { isbn, title, author_name, publish_date, key }, push }) => {
    return (
        <li className='book-list-item' onClick={() => push(isbn)}>
            <div className='book-list-item__img'>
                {(isbn) && <img src={`http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`} alt="title img" />}
            </div>
            <div className='book-list-item__descr'>
                <h4>{title}</h4>
                <span>{author_name}</span>
                <span>{`First published in ${publish_date}`}</span>
            </div>
        </li>
    )
}


export default BookListItem;
