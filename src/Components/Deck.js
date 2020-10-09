import React, { Component } from 'react';
import axios from 'axios';
import DeckCard from './DeckCard';
const API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

class Deck extends Component {

    state = {
        deck: null,
        remaining: null,
        deckCard: [],
    }

    async componentDidMount() {
        let response = await axios.get(API_URL);
        this.setState({
            deck: response.data,
            remaining: response.data.remaining
        })
    }


    getCard = () => {
        let getCard = `https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/`;
        axios.get(getCard).then(res => {
            let card = res.data.cards[0];
            this.setState({
                remaining: res.data.remaining,
                deckCard: [...this.state.deckCard, card.image]
            });
        }).catch(err => {
            console.log("err", err);
        });
    }


    render() {
        return (
            <div>
                <h1>Card Dealer</h1>
                {this.state.remaining <= 0 ? <h1>Sorry Card Is Ending !!!</h1> : <div>
                    <button onClick={this.getCard}>Get Card !!!</button>
                    {this.state.deckCard.map((deckCard, index) => {
                        return (
                            <div key={`${deckCard} ${index}`}>
                                <DeckCard cardUrl={deckCard} />
                            </div>
                        )
                    })}
                </div>}


            </div>
        );
    }
}

export default Deck;