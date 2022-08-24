import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
        <button className='square' onClick={props.onJellow}>
            {/* {TODO} */}
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square value={this.props.squares[i]} onJellow={() => this.props.onClick(i)} />;
    }

    render() {
        return (
            <div>
                <div className='status'></div>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                { squares: Array(9).fill(null) },
            ],
            stepNumber: 0,
            nextPlayer: 'X',
        }
    }

    jumpTo(step) {

        console.log(step)
        const newHistory = this.state.history.slice

        this.setState({
            stepNumber: step,
            nextPlayer: (step % 2) === 0 ? 'X' : 'O',
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice();

        console.log(history.concat([{ squares: squares, }]));

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.nextPlayer;

        this.setState({
            history: history.concat([{ squares: squares, }]),
            stepNumber: history.length,
            nextPlayer: this.state.nextPlayer === 'X' ? 'O' : 'X',
        });
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)

        const moves = history.map((step, move) => {
            const desc = move ? 'Got to move #' + move : move === 0 ? 'Go to game start' : 'Play again';

            return (
                <li>
                    <button key={move} onClick={() => this.jumpTo(move) }>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner : ' + winner;
        }

        else {
            status = 'Next Player: ' + this.state.nextPlayer
        }

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board squares={current.squares} onClick={(i) => { this.handleClick(i) }} />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                    <div>
                        <button onClick={() => this.state.stepNumber ? this.jumpTo(this.state.stepNumber - 1) : null }>Previous</button>
                        <button onClick={() => this.state.stepNumber ? this.jumpTo(this.state.stepNumber + 1) : null }>Forward</button>
                    </div>
                </div>
            </div>
        );
    }
}

// =========================================

const copy = ReactDOM.createRoot(document.getElementById("copy"));
copy.render(<Game />);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
