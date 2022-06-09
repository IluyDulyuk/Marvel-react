import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMassege from '../erorrMassege/ErrorMassege';

import useMarvelService from '../../services/MarvelService';

import './singleComicPage.scss';

const SingleComicPage = () => {

    const [comic, setComic] = useState({});
    const {comicId} = useParams();

    const {loading, error, getComics, clearError} =  useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const onComicLoaded = (char) => {
        setComic(char);
    }

    const updateComic = () => {
        clearError();

        getComics(comicId)
            .then(onComicLoaded)
    }

    const errorMassege = error ? <ErrorMassege/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMassege}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {

    const {title, description, thumbnail, pageCount, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" href="#" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;