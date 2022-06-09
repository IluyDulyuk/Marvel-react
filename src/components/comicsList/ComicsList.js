import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMassege from '../erorrMassege/ErrorMassege';

import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemsListLoading, setNewItemsListLoading] = useState(false);
    const [ended, setEnded] = useState(false);
    
    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {

        setNewItemsListLoading(true);

        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        
        if(newComicsList.length < 8) {
            setEnded(true);
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemsListLoading(false);
        setOffset(offset => offset + 8);
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i)=> {

            let imgStyles = {objectFit: 'cover'};

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyles = {'objectFit' : 'unset'};
            }

            return (
                <li key={item.id} className="comics__item">
                    <Link to={`${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" style={imgStyles}/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const spinner = loading ? <Spinner/> : null,
          errorMessage = error ? <ErrorMassege/> : null,
          content = !loading || !error ? items : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {content}
            <button
                style={{'display': ended ? 'none' : 'block'}} 
                disabled={newItemsListLoading} 
                onClick={() => onRequest(offset)}  
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;