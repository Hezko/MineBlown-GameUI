import React from 'react';
import Board from './board';
import StatusBar from './statusBar';
import Mousetrap from 'mousetrap';

class Game extends React.Component {
    constructor(props) {
        super();
        this.statusBar = null;
        this.gameService = props.gameService;
        this.game = props.game;
        this.gameId = props.gameId;

        this.state = {
            isStarted: props.isStarted,
            isFinished: props.isFinished,
            isWin: props.isWin,
            isLose: props.isLose,
            flagsCount: 0,
        };
    }

    componentDidMount() {
        Mousetrap.bind(['f2'], this.statusBar.newGameGeneratorWrapper);
    }

    componentWillUnmount() {
        Mousetrap.unbind(['f2'], this.statusBar.newGameGeneratorWrappe);
    }

    updateGame(response) {
        let newFlagsCount = this.state.flagsCount;
        if (response.clickedSquare.isFlagged) {
            newFlagsCount = newFlagsCount + 1;
        }
        else {
            newFlagsCount = newFlagsCount - 1;
        }
        this.setState({ flagsCount: newFlagsCount });
        return response;
    }

    handleClick(response) {
        this.optStartGame();

        let resp = response.response;
        if (resp.isFinished === true && this.state.isFinished === false) {
            this.statusBar.stopStopwatch();

            let newState = {
                isFinished: true,
                isWin: response.response.isWin,
                isLose: response.response.isLose,
            };
            this.setState(newState);
        }

        return { resopnse: resp, copy: response.copy };
    }

    optStartGame() {
        if (this.state.isStarted === false) {
            this.setState({ isStarted: true });
            this.statusBar.startStopwatch();
        }
    }

    newGameGenerator() {

        this.props.newGameGenerator(this.props.height, this.props.width, this.props.minesCount);
    }

    render() {
        for (let i = 0; i < this.props.height; i++) {
            for (let j = 0; j < this.props.width; j++) {
                this.props.board[i][j].isHighlighted = false;
            }
        }

        if (this.gameId !== this.props.gameId) {
            this.gameId = this.props.gameId;
            this.state.isStarted = false;
            this.state.isLose = false;
            this.state.isWin = false;
            this.state.isFinished = false;
            this.state.flagsCount = 0;
        }

        return (
            <div >
                <table className="game-table outer-border">
                    <tbody>
                        <tr>
                            <td className="status-bar-column">
                                <div className="game inner-border">
                                    <StatusBar ref={(statusBar) => { this.statusBar = statusBar; }}
                                        isStarted={this.state.isStarted || this.props.isStarted}
                                        isFinished={this.state.isFinished || this.props.isFinished}
                                        isWin={this.state.isWin || this.props.isWin}
                                        isLose={this.state.isLose || this.props.isLose}
                                        minesCount={this.props.minesCount}
                                        flagsCount={this.state.flagsCount + this.props.flagsCount}
                                        initialTime={this.props.initialTime}
                                        newGameGenerator={this.newGameGenerator.bind(this)} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="game-column">
                                <div className='inner-border'>
                                    <Board height={this.props.height} width={this.props.width} gameService={this.props.gameService} gameId={this.props.gameId}
                                        board={this.props.board}
                                        externalHandleClick={this.handleClick.bind(this)}
                                        externalHandleRightClick={this.updateGame.bind(this)}
                                        isFinished={this.state.isFinished} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Game;