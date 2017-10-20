import React from 'react';

const line1 = ' __    __     __     __   __     ______           ______     __         ______     __     __     __   __   ';
const line2 = '/\\ \"-./  \\   /\\ \\   /\\ \"-.\\ \\   /\\  ___\\         /\\  == \\   /\\ \\       /\\  __ \\   /\\ \\  _ \\ \\   /\\ \"-.\\ \\  ';
const line3 = '\\ \\ \\-./\\ \\  \\ \\ \\  \\ \\ \\-.  \\  \\ \\  __\\         \\ \\  __<   \\ \\ \\____  \\ \\ \\/\\ \\  \\ \\ \\/ \".\\ \\  \\ \\ \\-.  \\ ';
const line4 = ' \\ \\_\\ \\ \\_\\  \\ \\_\\  \\ \\_\\\\\"\\_\\  \\ \\_____\\        \\ \\_____\\  \\ \\_____\\  \\ \\_____\\  \\ \\__/\".~\\_\\  \\ \\_\\\\\"\\_\\';
const line5 = '  \\/_/  \\/_/   \\/_/   \\/_/ \\/_/   \\/_____/         \\/_____/   \\/_____/   \\/_____/   \\/_/   \\/_/   \\/_/ \\/_/';

class Title extends React.Component {

    render() {
        if (this.props.isLink) {
            return (
                <a href={this.props.destination} className='header-button'>
                    <pre>
                        <p className='title-p'>{line1}</p>
                        <p className='title-p'>{line2}</p>
                        <p className='title-p'>{line3}</p>
                        <p className='title-p'>{line4}</p>
                        <p className='title-p'>{line5}</p>
                    </pre>
                </a >
            )
        }
        else {
            return (
                <div>
                    <pre>
                        <p className='title-p'>{line1}</p>
                        <p className='title-p'>{line2}</p>
                        <p className='title-p'>{line3}</p>
                        <p className='title-p'>{line4}</p>
                        <p className='title-p'>{line5}</p>
                    </pre>
                </div >
            );
        }
    }
}

export default Title;