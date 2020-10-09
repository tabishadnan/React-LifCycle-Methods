import React, { Component } from 'react';

class DeckCard extends Component {
    render() {
        return (
            <div className="deckcard">
                <img src={this.props.cardUrl} alt="card" />
            </div>
        );
    }
}

export default DeckCard;