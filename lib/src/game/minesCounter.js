import React from 'react';

class MinesCounter extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        let minesCount = this.props.minesCount;
        let flagsCount = this.props.flagsCount;
        let remainingMines = minesCount - flagsCount;

        let left = remainingMines >= 0 ? Math.floor(remainingMines / 100) : '-dash';
        let center = Math.floor(Math.abs(remainingMines) / 10) % 10;
        let right = Math.abs(remainingMines) % 10;

        let leftImgSrc = '../../assets/images/counters/counter' + left + '.gif';
        let centerImgSrc = '../../assets/images/counters/counter' + center + '.gif';
        let rightImgSrc = '../../assets/images/counters/counter' + right + '.gif';

        return (
            <div>
                <span className={'counter'}>
                    <img src={leftImgSrc} />
                </span>
                <span className={'counter'}>
                    <img src={centerImgSrc} />
                </span>
                <span className={'counter'}>
                    <img src={rightImgSrc} />
                </span>
            </div>
        )
    }
}

export default MinesCounter;