import React from 'react';
import Game from './game';
import Face from './face';

class GamePage extends React.Component {
    constructor(props) {
        super();
        const state = this.state = {
            gameId: props.gameId
        };
        const gameService = props.gameService;
    }

    getGame(gameId, gameService) {
        let result = gameService.getGame(gameId)
            .then((game) => {
                this.setState({
                    game: game,
                    gameId: gameId,
                });
            });

        return result;
    }

    newGameGenerator() {
        let promise = this.props.gameService.createGame(this.state.game.settings.height, this.state.game.settings.width, this.state.game.settings.minesCount)
            .then((gameId) => {
                this.props.history.push(gameId);
                return gameId;
            });
    }

    //true if the right game is being shown
    isGameSynced() {
        return this.state.gameId === this.props.gameId;
    }

    render() {
        let view;
        if (this.state.game === undefined || !this.isGameSynced()) {
            view = (
                <Face isWin={false} isLose={false} isFinished={false} />
            );
            this.getGame(this.props.gameId, this.props.gameService);
        }
        else {
            view = (
                <Game gameId={this.props.gameId}
                    board={this.state.game.board}
                    gameService={this.props.gameService}
                    width={this.state.game.settings.width}
                    height={this.state.game.settings.height}
                    minesCount={this.state.game.settings.minesCount}
                    flagsCount={this.state.game.stats.flagsCount}
                    initialTime={this.state.game.stats.seconds || 0}
                    isStarted={this.state.game.stats.isStarted}
                    isFinished={this.state.game.stats.isFinished}
                    isWin={this.state.game.stats.isWin}
                    isLose={this.state.game.stats.isLose}
                    newGameGenerator={this.newGameGenerator.bind(this)} />
            )
        }
        return (
            <div>
                {view}
            </div>
        )
    }
}

export default GamePage;