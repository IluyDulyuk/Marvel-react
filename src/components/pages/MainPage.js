import { useState } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary"

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    
    const [selectedChar, setSelectedChar] = useState(null);

    const onSelectedChar = (id) => {
        setSelectedChar(id);
    }

    return (
        <>
           <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSelectedChar={onSelectedChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/> 
        </>
    )
}

export default MainPage;