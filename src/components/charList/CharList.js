import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMassege from '../erorrMassege/ErrorMassege';

import useMarvelService from '../../services/MarvelService';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemsListLoading, setNewItemsListLoading] = useState(false);
    const [ended, setEnded] = useState(false);
    
    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {

        setNewItemsListLoading(true);

        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        
        if(newCharList.length < 9) {
            setEnded(true);
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemsListLoading(false);
        setOffset(offset => offset + 9);
    }
    
    const itemsRefs = useRef([]);

    const onFocus = (id) => {
        itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRefs.current[id].classList.add('char__item_selected');
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i)=> {

            let imgStyles = {objectFit: 'cover'};

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyles = {'objectFit' : 'unset'};
            }

            return (
                <li ref={(el) => itemsRefs.current[i] = el} 
                    key={item.id} className="char__item" 
                    onClick={() => {
                        props.onSelectedChar(item.id)
                        onFocus(i);
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

    const items = renderItems(charList);

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
                onClick={() => onRequest(offset)} 
                className="button button__main button__long
                ">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
}

export default CharList;