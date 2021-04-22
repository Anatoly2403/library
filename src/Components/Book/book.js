import React, { Component } from 'react';
import './book.css';
import { connect } from 'react-redux';
import withService from '../HOC';
import Spinner from '../Spinner';
import { bindActionCreators } from 'redux';
import { getBook } from '../../Actions/actions';
import ErrorMessage from '../ErrorMessage';
import { Link } from 'react-router-dom';




class Book extends Component {
    componentDidMount() {
        const { getBook, match: { url } } = this.props;
        getBook(url);
    }

    render() {
        const { bookLoad, book, bookErr } = this.props;
        return (bookLoad)
            ? <Spinner /> :
            (bookErr)
                ? <ErrorMessage />
                : (book) && (
                    <div className="book">
                        <div className='book__img'>
                            {(book.isbn_10)
                                ? <img src={`http://covers.openlibrary.org/b/isbn/${book.isbn_10[0]}-M.jpg`} alt="title img" />
                                : <div className='book__fake-icon'></div>}
                            <button className='book__btn' onClick={() => alert('We will assume that you are already reading the book')}>Read</button>
                        </div>
                        <div className='book__descr'>
                            <h4 className='book__title'>{book.title}</h4>
                            <span className='book__subtitle'>{book.subtitle}</span>
                            <span className='book__author'>{book.author_name}</span>
                            <span className='book__publish'>{`First published in ${book.publish_date}`}</span>
                        </div>
                        <div className="book__btn-back">
                            <Link className='back-btn' to='/'></Link>
                        </div>
                    </div>
                )
    }
}


const mapStateToProps = ({ book, bookLoad, bookErr }) => ({ book, bookLoad, bookErr });
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({ getBook: getBook(ownProps.apiServise) }, dispatch);
export default withService()(connect(mapStateToProps, mapDispatchToProps)(Book));