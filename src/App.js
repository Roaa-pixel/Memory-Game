import { useEffect, useState } from "react";
import "./App.css";

import CardComponent from "./components/CardComponent";

const cardimgs = [
    { src: "/assets/images/anime1.png", matched: false },
    { src: "/assets/images/anime2.png", matched: false },
    { src: "/assets/images/anime3.png", matched: false },
    { src: "/assets/images/anime4.png", matched: false },
    { src: "/assets/images/anime5.png", matched: false },
    { src: "/assets/images/anime6.png", matched: false },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceone, setChoiceOne] = useState(null);
    const [choicetwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [flipped, setFlipped] = useState(false);

    const shuffleCards = () => {
        const shuffled = [...cardimgs, ...cardimgs]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }));
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffled);
        setTurns(0);
    };
    const handleChoice = (card) => {
        choiceone ? setChoiceTwo(card) : setChoiceOne(card);
    };

    useEffect(() => {
        if (choiceone && choicetwo) {
            setDisabled(true);
            if (choiceone.src === choicetwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceone.src) {
                            return {...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurns();
            } else {
                setTimeout(() => resetTurns(), 1000);
            }
        }
    }, [choiceone, choicetwo]);
    console.log(cards);
    const resetTurns = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
        setDisabled(false);
    };

    useEffect(() => {
        shuffleCards();
    }, []);
    return ( <
        div className = "App" >
        <
        h1 > Memory Game < /h1> <button onClick={shuffleCards}> New Game </button > { " " } <
        div className = "card-grid" > { " " } {
            cards.map((card) => ( <
                CardComponent key = { card.id }
                card = { card }
                handleChoice = { handleChoice }
                flipped = { card === choiceone || card === choicetwo || card.matched }
                disabled = { disabled }
                />
            ))
        } { " " } <
        /div>{" "} <
        p > Turns: { turns } < /p>{" "} <
        /div>
    );
}

export default App;