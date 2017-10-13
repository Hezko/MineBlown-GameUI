import React from 'react';

class Face extends React.Component {
    constructor(props) {
        super();

        this.isFinished = props.isFinished;
        this.isWin = props.isWin;
        this.isLose = props.isLose;
    }

    getFaceImgSrc(isWin, isLose) {
        if (isWin === true) {
            return '../../assets/images/face/facewin.gif';
        }
        else if (isLose === true) {
            return '../../assets/images/face/facelose.gif';
        }
        else {
            return '../../assets/images/face/face.gif';
        }
    }

    render() {
        const faceImgSrc = this.getFaceImgSrc(this.props.isWin, this.props.isLose);

        return (
            <div className={"status-bar-face"} >
                <img src={faceImgSrc} onClick={(e) => this.props.newGameGenerator()} />
            </div>
        )
    }
}

export default Face;