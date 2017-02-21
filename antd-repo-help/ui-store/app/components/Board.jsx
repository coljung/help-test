import React from 'react';

// styles
import '../styles/board';

class Board extends React.Component {
    render() {
        let boardTitle = null;
        if (this.props.btnInTitle) {
            boardTitle = (
                <div className='clearfix titleWithButton'>
                    <h2>{this.props.title}</h2>
                    {this.props.btnInTitle}
                </div>
            );
        } else {
            boardTitle = (<h2>{this.props.title}</h2>);
        }
        return (
            <div className='board' id={this.props.id}>
                {boardTitle}
                {this.props.children}
            </div>
        );
    }
}

export default Board;
