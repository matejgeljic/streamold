import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../Actions';

class StreamShow extends React.Component {

    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    } 

    componentDidMount() {
        const id = this.props.match.params.id;

        this.props.fetchStream(id);
        this.buildPlayer()
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }

        const id = this.props.match.params.id;

        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv` 
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
        this.player.play();
    }
    

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h1>{this.props.stream.title}</h1>
                <h5>{this.props.stream.description}</h5>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);