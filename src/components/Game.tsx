/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState} from "react";
import _ from "lodash";
import images from "../images/images";


export default function Game(){

    interface gameImage{
        id: string
        imgSrc: string;
        clicked: boolean
    }

    const [gameImages, setGameImages] = useState<gameImage[]>([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem('bestScore') || '0'));
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    const initializeGameImages = () =>{
        const subset = _.sampleSize(images, 9);
        const newGameImages = subset.map(img => {
            return {id: _.uniqueId(),
                    imgSrc: img,
                    clicked:false}
        });
        setGameImages(newGameImages);
        setGameOver(false);
        setScore(0);
        setWin(false);
        console.log(gameImages);
    }

    const getGameImageObject = (id: string) =>{
        return gameImages.find(image => image.id === id);
    }

    const isClicked = (id: string) =>{
        const imageObj = getGameImageObject(id);
        if(imageObj?.clicked)
            return true;
        return false;
    }

    const setClick = (id: string) =>{
        const imageObj = getGameImageObject(id) as gameImage;
        const imageObjIndex = gameImages.indexOf(imageObj);
        let gameImagesArray = gameImages;
        imageObj.clicked = true;
        gameImagesArray[imageObjIndex] = imageObj;

        setGameImages(_.shuffle(gameImagesArray));
    }

    const handleImgClick = (e: React.MouseEvent<HTMLElement>) =>{
        const id =  (e.target as HTMLElement).id;
        if(!isClicked(id)){
            setClick(id);
            let newScore = score + 1;
            setScore(newScore);
            if(score >= 9){
                setGameOver(true);
                setWin(true);
            }
        }else{
            if(score > bestScore)
                setBestScore(score);
            setGameOver(true);
        }
    }

    useEffect(()=>{
        localStorage.setItem('bestScore', JSON.stringify(bestScore));
    }, [bestScore])


    return (
        <div className="game-container">
            <div className="info-div">
                <button onClick={initializeGameImages}>New Game</button>
                <p>Score: {score}</p>
                <p>Best Score: {bestScore}</p>
            </div>
            <div className="image-div">
                {!gameOver ? 
                    gameImages.map((image) =>
                            <img src={image.imgSrc} alt={`picture`} id={image.id} onClick={(e) => handleImgClick(e)}/>
                    )
                : <h2>{win ? 'Good job!' : 'Game Over!'}</h2>
                }
                
            </div>
            
        </div>
    )
}