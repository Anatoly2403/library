
export default class ApiServises {
    _apiBase = 'https://openlibrary.org/isbn';
    _searchBase = 'http://openlibrary.org/search.json?title=';



    getBook = async (key) => {
        const res = await fetch(this._apiBase + key + '.json')
        if (!res.ok) { throw new Error('ERROR') }
        return res.json();
    }

    searchBook = async (val, page = 1) => {
        const res = await fetch(this._searchBase + `${val}&limit=10&page=${page}`)
        if (!res.ok) { throw new Error('ERROR') }
        return await res.json()
            .then(data => this.bookTransform(data))
            .catch(err => new Error('Error'))
    }

    bookTransform = (val) => {
        const books = val.docs.map((doc) => ({
            title: doc.title,
            isbn: (doc.isbn) && doc.isbn[0],
            key: doc.key,
            author_name: doc.author_name,
            publish_date: (doc.publish_date) && doc.publish_date[0]
        }))

        return {
            numFound: val.numFound,
            books: [...books]
        }
    }


}