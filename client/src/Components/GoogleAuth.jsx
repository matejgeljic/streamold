import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../Actions'

class GoogleAuth extends React.Component {
    
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '917605571797-no9ooq74l06dmgon5sfontui3iniot3u.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();

                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }

    onAuthChange = isSignedIn => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignIn = () => {
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.onSignOut} >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui red google button" onClick={this.onSignIn} >
                    <i className="google icon" />
                    Sign In with Google
                </button> 
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);  