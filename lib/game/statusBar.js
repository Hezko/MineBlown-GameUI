import React from 'react';
import Stopwatch from './stopwatch';
import Face from './face';
import MinesCounter from './minesCounter';

class StatusBar extends React.Component {
    constructor(props) {
        super();
        this.stopwatch = null;
        this.startStopwatch = this.startStopwatch.bind(this);
        this.newGameGeneratorWrapper = this.newGameGeneratorWrapper.bind(this);
    }

    newGameGeneratorWrapper() {
        this.stopwatch.reset();
        return this.props.newGameGenerator();
    }

    render() {
        return (
            <div>
                <div className='status-bar'>
                    <div className='status-bar-element' style={{ float: 'left' }}>
                        <Stopwatch ref={(stopwatch) => { this.stopwatch = stopwatch; }}
                            initialTime={this.props.initialTime || 0}
                            runOnStart={this.props.isStarted && !this.props.isFinished} />
                    </div>
                    <div className='status-bar-element' >
                        <Face isWin={this.props.isWin} isLose={this.props.isLose} isFinished={this.props.isFinished}
                            newGameGenerator={this.newGameGeneratorWrapper} />
                    </div>
                    <div className='status-bar-element' style={{ float: 'right' }}>
                        <MinesCounter minesCount={this.props.minesCount} flagsCount={this.props.flagsCount} />
                    </div>
                </div>
            </div>
        )
    }

    startStopwatch() {
        this.stopwatch.startTimer();
    }

    stopStopwatch() {
        this.stopwatch.stopTimer();
    }
    reset() {
        this.stopwatch.reset();
    }

}

export default StatusBar;