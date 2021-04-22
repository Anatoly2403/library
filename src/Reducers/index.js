const initialState = {
    item: [],
    load: false,
    itemErr: null,
    book: null,
    bookLoad: false,
    bookErr: null
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'FETCH_ITEM_SUCCESS':
            return {
                ...state,
                item: payload,
                load: false
            }
        case 'FETCH_ITEM_REQUEST':
            return {
                ...state,
                load: true
            }
        case 'FETCH_ITEM_FEILURE':
            return {
                ...state,
                itemErr: payload,
                load: false
            }

        case 'CLEAR_ITEM':
            return {
                ...state,
                item: []
            }


        case 'FETCH_BOOK_SUCCESS':
            return {
                ...state,
                book: payload,
                bookLoad: false
            }
        case 'FETCH_BOOK_REQUEST':
            return {
                ...state,
                book: null,
                bookLoad: true
            }
        case 'FETCH_BOOK_FEILURE':
            return {
                ...state,
                bookLoad: false,
                bookErr: payload
            }

        default:
            return state
    }
}

export default reducer;