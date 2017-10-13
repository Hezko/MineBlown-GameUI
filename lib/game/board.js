import React from 'react';
import Square from './square';
import Mousetrap from 'mousetrap';

class Board extends React.Component {
    constructor(props) {
        super();
        this.gameService = props.gameService;
        this.externalHandleClick = props.externalHandleClick;
        this.externalHandleRightClick = props.externalHandleRightClick;
        this.isFinished = props.isFinished;
        this.state = {
            board: props.board,
            highlightedSquareLocation: { y: 0, x: 0 },
        };

        for (let i = 0; i < props.height; i++) {
            for (let j = 0; j < props.width; j++) {
                props.board[i][j].isHighlighted = false;
            }
        }

        this.moveHighlightedSquareRight = this.moveHighlightedSquareRight.bind(this);
        this.moveHighlightedSquareLeft = this.moveHighlightedSquareLeft.bind(this);
        this.moveHighlightedSquareDown = this.moveHighlightedSquareDown.bind(this);
        this.moveHighlightedSquareUp = this.moveHighlightedSquareUp.bind(this);

        this.discoverHighlighted = this.discoverHighlighted.bind(this);
        this.flagHighlighted = this.flagHighlighted.bind(this);
    }

    componentDidMount() {
        Mousetrap.bind(['right', '6'], this.moveHighlightedSquareRight);
        Mousetrap.bind(['left', '4'], this.moveHighlightedSquareLeft);
        Mousetrap.bind(['down', '2'], this.moveHighlightedSquareDown);
        Mousetrap.bind(['up', '8'], this.moveHighlightedSquareUp);

        Mousetrap.bind(['space', '5'], this.discoverHighlighted);
        Mousetrap.bind(['shift', '0'], this.flagHighlighted);
    }

    componentWillUnmount() {
        Mousetrap.unbind(['right', '6'], this.moveHighlightedSquareRight);
        Mousetrap.unbind(['left', '4'], this.moveHighlightedSquareLeft);
        Mousetrap.unbind(['down', '2'], this.moveHighlightedSquareDown);
        Mousetrap.unbind(['up', '8'], this.moveHighlightedSquareUp);

        Mousetrap.unbind(['space', '5'], this.discoverHighlighted);
        Mousetrap.unbind(['shift', '0'], this.flagHighlighted);
    }

    moveHighlightedSquareRight() {
        this.moveHighlightedSquare(0, 1);
    }

    moveHighlightedSquareLeft() {
        this.moveHighlightedSquare(0, -1);
    }

    moveHighlightedSquareDown() {
        this.moveHighlightedSquare(1, 0);
    }

    moveHighlightedSquareUp() {
        this.moveHighlightedSquare(-1, 0);
    }

    moveHighlightedSquare(yDiff, xDiff) {
        const oldY = this.state.highlightedSquareLocation.y;
        const oldX = this.state.highlightedSquareLocation.x;
        const newY = this.state.highlightedSquareLocation.y + yDiff;
        const newX = this.state.highlightedSquareLocation.x + xDiff;
        if (newY < this.props.height && newY >= 0 && newX < this.props.width && newX >= 0) {
            let copy = this.props.board.map(function (row) {
                return row.slice();
            });
            copy[oldY][oldX].isHighlighted = false;
            copy[newY][newX].isHighlighted = true;
            this.setState({
                highlightedSquareLocation: { y: newY, x: newX },
                board: copy
            });
        }
    }

    discoverHighlighted() {
        const squareState = this.props.board[this.state.highlightedSquareLocation.y][this.state.highlightedSquareLocation.x];
        if (this.isSquareDisabled(squareState)) {
            return;
        }
        if (squareState.isDiscovered) {
            this.handleMultiDiscover(squareState, this.props.externalHandleClick);
        }
        else {
            this.handleClick(squareState, this.props.externalHandleClick);
        }
    }

    flagHighlighted() {
        const squareState = this.props.board[this.state.highlightedSquareLocation.y][this.state.highlightedSquareLocation.x];
        this.handleRightClick(squareState, this.props.externalHandleRightClick);
    }

    optRevealAllMines(updateBoardResult) {
        if (updateBoardResult.response.isLose === true) {
            return this.gameService.discoverAndGetAllMines(this.props.gameId)
                .then((response) => {
                    return Promise.resolve({ response: updateBoardResult.response, copy: this.revealAllMines(response.mines, updateBoardResult.copy) });
                });
        }
        else {
            return Promise.resolve({ response: updateBoardResult.response, copy: updateBoardResult.copy });
        }
    }

    revealAllMines(mines, board) {
        for (let i = 0; i < mines.length; i++) {
            let mine = mines[i];
            board[mine.y][mine.x] = mine;
            board[mine.y][mine.x].isHighlighted = false;
        }
        return board;
    }

    updateBoard(response) {
        let changedSquares = response.newlyDiscovered;
        changedSquares.push(response.clickedSquare);
        for (let i = 0; i < changedSquares.length; i++) {
            let newSquare = changedSquares[i];
            newSquare.isHighlighted = this.props.board[newSquare.y][newSquare.x].isHighlighted;
            this.props.board[newSquare.y][newSquare.x] = newSquare;
        }
        return { response, copy: this.props.board };
    }

    updateBoardForMultiDiscover(response) {
        let changedSquares = [];
        if (response.isLose) {
            changedSquares = response.newlyDiscoveredNeighbours;
        }
        else {
            changedSquares = response.newlyDiscovered;
        }
        changedSquares.push(response.clickedSquare);
        for (let i = 0; i < changedSquares.length; i++) {
            let newSquare = changedSquares[i];
            newSquare.isHighlighted = this.props.board[newSquare.y][newSquare.x].isHighlighted;
            this.props.board[newSquare.y][newSquare.x] = newSquare;
        }
        return { response, copy: this.props.board };
    }

    updateBoardFlag(response) {
        response.clickedSquare.isHighlighted = this.props.board[response.clickedSquare.y][response.clickedSquare.x].isHighlighted;
        this.props.board[response.clickedSquare.y][response.clickedSquare.x] = response.clickedSquare;

        for (let neighbour of response.neighbours) {
            neighbour.isHighlighted = this.props.board[neighbour.y][neighbour.x].isHighlighted;
            this.props.board[neighbour.y][neighbour.x] = neighbour;
        }

        return this.props.board;
    }

    handleRightClick(state, externalHandler) {
        if (state.isDiscovered === true) {
            return false;
        }
        else {
            let result = this.gameService.toggleFlag(this.props.gameId, state.y, state.x)
                .then((response) => externalHandler(response))
                .then((response) => this.updateBoardFlag(response))
                .then((response) => Promise.resolve(this.setState({ board: response })));
        }

        return false; // disables context menu
    }

    handleClick(state, externalHandler) {
        let result = this.gameService.discover(this.props.gameId, state.y, state.x)
            .then((response) => this.updateBoard(response))
            .then((response) => this.optRevealAllMines(response))
            .then((response) => externalHandler(response))
            .then((response) => Promise.resolve(this.setState({ board: response.copy })));
        return result;
    }

    handleMultiDiscover(state, externalHandler) {
        const result = this.gameService.multiDiscover(this.props.gameId, state.y, state.x)
            .then((response) => this.updateBoardForMultiDiscover(response))
            .then((response) => this.optRevealAllMines(response))
            .then((response) => externalHandler(response))
            .then((response) => Promise.resolve(this.setState({ board: response.copy })));
        return result;
    }

    isSquareDisabled(squareState) {
        const y = squareState.y;
        const x = squareState.x;

        if (squareState.isDiscovered === false) {
            return false;
        }

        const isSatisfied = squareState.nearbyFlags === squareState.nearbyMines;
        const areAllNeighborsDiscovered = this.areAllNeighborsDiscoveredOrFlagged(y, x);
        if (areAllNeighborsDiscovered === false && isSatisfied) {
            return false;
        }
        return true;
    }

    areAllNeighborsDiscoveredOrFlagged(y, x) {
        const indices = this.getNeighboursIndices(y, x);
        const neighbours = indices.map((loc) => this.props.board[loc.y][loc.x]);
        const result = neighbours.length > 0 && neighbours.every((neighbour) => neighbour.isDiscovered || neighbour.isFlagged);
        return result;
    }

    getNeighboursIndices(y, x) {
        const indices = [];
        this.optAddNeighbor(indices, y - 1, x - 1);
        this.optAddNeighbor(indices, y - 1, x);
        this.optAddNeighbor(indices, y - 1, x + 1);
        this.optAddNeighbor(indices, y, x + 1);
        this.optAddNeighbor(indices, y + 1, x + 1);
        this.optAddNeighbor(indices, y + 1, x);
        this.optAddNeighbor(indices, y + 1, x - 1);
        this.optAddNeighbor(indices, y, x - 1);
        return indices;
    }

    optAddNeighbor(neighbours, y, x) {
        if (this.isValidIndices(y, x)) {
            neighbours.push(this.props.board[y][x]);
        }
    }

    isValidIndices(y, x) {
        return y >= 0 && y < this.props.height && x >= 0 && x < this.props.width;
    }

    renderSquare(squareState, props) {
        let result = (
            <Square key={'square:y:' + squareState.y + ',x:' + squareState.x}
                state={squareState}
                isDiscovered={squareState.isDiscovered}
                isHighlighted={squareState.isHighlighted}
                isFlagged={squareState.isFlagged}
                isMine={squareState.isMine}
                nearbyMines={squareState.nearbyMines}
                nearbyFlags={squareState.nearbyFlags}
                y={squareState.y}
                x={squareState.x}
                discoverHandler={(state) => { this.handleClick(state, props.externalHandleClick) }}
                multiDiscoverHandler={(state) => { this.handleMultiDiscover(state, props.externalHandleClick) }}
                flagHandler={(state) => { this.handleRightClick(state, props.externalHandleRightClick) }}
                isDisabled={(state) => this.isSquareDisabled(state)} />
        );
        return result;
    }

    render() {
        let b = this.props.board.map((row, index) => {
            let jsxRow = row.map((squareState) => {
                let square = this.renderSquare(squareState, this.props);
                return square;
            }) // maybe should be done once in ctor only?

            return (
                <div key={'row:' + index} className='game-row'>
                    {jsxRow}
                </div>
            );

        });

        return (
            <div>
                {b}
            </div>
        )
    }
}
export default Board;