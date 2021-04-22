import React from 'react';
import './book-search.css';



const BookSearch = ({ onSearchBooks, searchValue, setValue, onKeyPress, clearSearchValue }) => {
    return (
        <div className="serach">
            <input
                type="text"
                className='serach__input'
                value={searchValue}
                onChange={setValue}
                onKeyUp={onKeyPress}
            />
            {(searchValue) && (
                <div className='serach__clear-btn' onClick={clearSearchValue}>
                    <div className='serach__clear-inner'></div>
                </div>
            )}
            <input
                type='submit'
                className='serach__btn'
                value='Go'
                onClick={onSearchBooks}
            />
        </div >
    )
}



export default BookSearch;