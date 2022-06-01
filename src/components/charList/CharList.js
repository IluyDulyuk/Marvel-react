import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMassege from '../erorrMassege/ErrorMassege';

import MarvelService from '../../services/MarvelService';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        offset: 210,
        newItemsListLoading: false,
        ended: false,
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {

        this.setState({newItemsListLoading: true});

        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (newCharList) => {
        
        if(newCharList.length < 9) {
            this.setState({ended: true});
        }

        this.setState(({charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemsListLoading: false,
            offset: this.state.offset + 9
        }))
    }

    onError = () => {
        this.setState({error: true, loading: false});
    }

    itemsRefs = [];

    setRef = (ref) => {
        this.itemsRefs.push(ref);
    }

    onFocus = (id) => {
        this.itemsRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemsRefs[id].classList.add('char__item_selected');
    }

    renderItems = (arr) => {
        const items = arr.map((item, i)=> {

            let imgStyles = {objectFit: 'cover'};

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyles = {'objectFit' : 'unset'};
            }

            return (
                <li ref={this.setRef} 
                    key={item.id} className="char__item" 
                    onClick={() => {
                        this.props.onSelectedChar(item.id)
                        this.onFocus(i);
                    }}
                    >
                        <img src={item.thumbnail} style={imgStyles}alt={item.name}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {loading, error, charList, offset, newItemsListLoading, ended} = this.state;

        const items = this.renderItems(charList);

        const spinner = loading ? <Spinner/> : null,
              errorMessage = error ? <ErrorMassege/> : null,
              content = !loading || !error ? items : null;



        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button 
                    style={{'display': ended ? 'none' : 'block'}} 
                    disabled={newItemsListLoading} 
                    onClick={() => this.onRequest(offset)} 
                    className="button button__main button__long
                    ">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
}

export default CharList;