/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState} from "react";
import _ from "lodash";
import images from "../images/images";
import { stringify } from "querystring";


export default function Game(){

    interface gameImage{
        imgSrc: string;
        clicked: boolean
    }

    const [gameImages, setGameImages] = useState<gameImage[]>([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(localStorage.getItem('bestScore') || 0);

    const initializeGameImages = () =>{
        const subset = _.sampleSize(images, 9);
        const newGameImages = subset.map(img => {
            return {imgSrc: img,
                    clicked:false}
        });
        setGameImages(newGameImages);
        console.log(gameImages);
    }


    return (
        <div className="game-container">
            <div className="info-div">
                <button onClick={initializeGameImages}>New Game</button>
                <p>Score: {score}</p>
                <p>Best Score: {bestScore}</p>
            </div>
            <div className="image-div">
                {gameImages.map((image, index) =>
                        <img src={image.imgSrc} alt={`picture`} id={index.toString()}/>
                )}
            </div>
            
        </div>
    )
}