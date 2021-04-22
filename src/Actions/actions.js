
const itemSuccess = payload => ({ type: 'FETCH_ITEM_SUCCESS', payload });
const itemRequest = () => ({ type: 'FETCH_ITEM_REQUEST' });
const itemFeilure = payload => ({ type: 'FETCH_ITEM_FEILURE', payload });

export const searchBook = (apiServise) => (val, pageNum = 1) => (dispatch) => {
    if (val) {
        dispatch(itemRequest())
        apiServise.searchBook(val, pageNum)
            .then(data => dispatch(itemSuccess(data)))
            .catch(err => dispatch(itemFeilure(err)))
    }
}

export const clearItem = () => ({ type: 'CLEAR_ITEM' })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bookSuccess = payload => ({ type: 'FETCH_BOOK_SUCCESS', payload });
const bookRequest = () => ({ type: 'FETCH_BOOK_REQUEST' });
const bookFeilure = payload => ({ type: 'FETCH_BOOK_FEILURE', payload });

export const getBook = (apiServise) => (id) => {
    return (dispatch) => {
        dispatch(bookRequest())
        apiServise.getBook(id)
            .then(book => dispatch(bookSuccess(book)))
            .catch(err => dispatch(bookFeilure(err)))
    }
}