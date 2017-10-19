import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super();
        this.onClick = props.onClick;
    }

    getSquareImgSrc() {
        if (this.props.isDiscovered === true) {
            if (this.props.isFlagged === true) {
                return this.getFlagImgSrc();
            }
            if (this.props.isMine === true) {
                return '../../assets/images/square/bombdeath.gif';
            }
            switch (this.props.nearbyMines) {
                case 0:
                    return '../../assets/images/square/open0.gif';
                case 1:
                    return '../../assets/images/square/open1.gif';
                case 2:
                    return '../../assets/images/square/open2.gif';
                case 3:
                    return '../../assets/images/square/open3.gif';
                case 4:
                    return '../../assets/images/square/open4.gif';
                case 5:
                    return '../../assets/images/square/open5.gif';
                case 6:
                    return '../../assets/images/square/open6.gif';
                case 7:
                    return '../../assets/images/square/open7.gif';
                case 8:
                    return '../../assets/images/square/open8.gif';
                default:
                    return '../../assets/images/square/blank.gif';
            }
        }
        else {
            if (this.props.isMine === true) {
                return '../../assets/images/square/bombrevealed.gif';
            }
            else if (this.props.isFlagged === true) {
                return this.getFlagImgSrc();
            }
            else {
                return '../../assets/images/square/blank.gif';
            }
        }
    }

    getFlagImgSrc() {
        if (this.props.isMine === true) {
            return '../../assets/images/square/flag.gif';
        }
        else if (this.props.isMine === false) {
            // in case that the user set a flag and yet there wasnt a mine underneath 
            return '../../assets/images/square/wrong-flag.gif';
        }
        else {
            return '../../assets/images/square/flag.gif';
        }
    }

    handleContextMenu(props, e, handler) {
        e.preventDefault();
        const isDisabled = this.props.isDisabled(props);
        if (isDisabled === false && props.isDiscovered === false) {
            handler(props);
        }
    }

    handleClick(props, handler) {
        const isDisabled = this.props.isDisabled(props);
        if (isDisabled === false && props.isFlagged === false) {
            handler(props);
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     var res = this.props.isMine || (this.props.isDiscovered === false && nextProps.isDiscovered) ||  //check if square is being highlighted/dehighlighted
    //         (this.props.isFlagged !== nextProps.isFlagged) || // check if square is being flagged
    //         (this.props.isHighlighted || nextProps.isHighlighted); //check ig sqaure is being discovered
    //     return res;
    // }

    render() {
        const squareImgSrc = this.props.assetsProvider.getAsset(this.getSquareImgSrc());
        const onClickHandler = this.props.isDiscovered === false ?
            this.props.discoverHandler : this.props.multiDiscoverHandler;
        const onContextMenuHandler = this.props.flagHandler;
        const imgClass = this.props.isHighlighted ? 'square-highlighted' : '';
        return (
            <button className='square' disabled={false} // fix this to only disable when there are no undiscovered neighbours
                onClick={() => this.handleClick(this.props, onClickHandler)}
                onContextMenu={(e) => this.handleContextMenu(this.props, e, onContextMenuHandler)}>
                <img className={imgClass} src={squareImgSrc} />
            </button>
        );
    }
}
export default Square;