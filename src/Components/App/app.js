import React, { Component } from 'react';
import './app.css';
import { bindActionCreators } from 'redux';
import Spinner from '../Spinner';
import BookSearch from '../BookSearch';
import BookList from '../BookList';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import withService from '../HOC';
import ErrorMessage from '../ErrorMessage';
import { searchBook, clearItem } from '../../Actions/actions';
import Book from '../Book';



class App extends Component {
  state = {
    searchValue: '',
    pageNum: 1,
    timer: null,
  }

  setValue = ({ target: { value } }) => this.setState({ searchValue: value });

  onSearchBooks = () => {
    this.props.searchBook(this.state.searchValue);
    if (window.location.href !== 'http://localhost:3000/') {      
      window.location.assign('http://localhost:3000/');
    }
  }

  setPageNum = ({ target: { textContent } }) => {
    const { numFound } = this.props.item;
    const { pageNum } = this.state;
    if (textContent === 'Next' && pageNum <= numFound / 10) {
      this.setState(({ pageNum }) => ({ pageNum: pageNum + 1 }));
    }
    if (textContent === 'Prev' && pageNum > 1) {
      this.setState(({ pageNum }) => ({ pageNum: pageNum - 1 }));
    }
  }

  onKeyPress = ({ keyCode, target: { value } }) => {
    if (keyCode === 13) {
      this.onSearchBooks()
    }
    if (keyCode === 8 && value < 1) {
      this.props.clearItem();
      localStorage.removeItem('searchVal')
    }
  }

  clearSearchValue = () => {
    this.setState({ searchValue: '' })
    this.props.clearItem();
    localStorage.removeItem('searchVal')
  }

  componentDidMount() {
    if (localStorage.getItem('searchVal')) {
      this.setState({ searchValue: JSON.parse(localStorage.getItem('searchVal')).val })
      this.setState({ pageNum: JSON.parse(localStorage.getItem('searchVal')).page })
      this.props.searchBook(
        JSON.parse(localStorage.getItem('searchVal')).val,
        JSON.parse(localStorage.getItem('searchVal')).page)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, pageNum, timer } = this.state;
    const localStorageVal = JSON.parse(localStorage.getItem('searchVal'))?.val;
    if (prevState.pageNum !== pageNum) {
      this.props.searchBook(searchValue, pageNum)
    }
    if ((prevState.searchValue !== searchValue) && (localStorageVal !== searchValue)) {
      if (timer) { clearTimeout(timer); }
      let timerId = setTimeout(this.onSearchBooks, 1000);
      this.setState({ timer: timerId });
    }
    if (this.props.item.numFound) {
      localStorage.setItem('searchVal', JSON.stringify({ val: searchValue, page: pageNum }))
    }
  }

  render() {
    const { item: { books, numFound }, load, itemErr } = this.props;
    
    return (
      <div className="App">
        <BookSearch
          searchValue={this.state.searchValue}
          clearSearchValue={this.clearSearchValue}
          onKeyPress={this.onKeyPress}
          onSearchBooks={this.onSearchBooks}
          setValue={this.setValue}
        />
        <Switch>
          <Route path='/' exact >
            {(load)
              ? <Spinner />
              : (itemErr)
                ? <ErrorMessage />
                : (!books) ? <div className='app__greeting'>Welcome <br/> to book searcher</div>
                  : (numFound)
                    ? <BookList
                      setPageNum={this.setPageNum}
                      numFound={numFound}
                      books={books} /> : <div className='app__greeting'>Not found</div>}
          </Route>
          <Route
            path='/:id'
            render={({ match }) =>
              <Book match={match} />} />
        </Switch>
      </div>
    )
  }
}



const mapStateToProps = ({ item, load, itemErr }) => ({ item, load, itemErr });
const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({ searchBook: searchBook(ownProps.apiServise), clearItem }, dispatch);
export default withService()(connect(mapStateToProps, mapDispatchToProps)(App));



