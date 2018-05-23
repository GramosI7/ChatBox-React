import React from "react";
import Formulaire from "./Formulaire";
import Message from "./Message";
import base from '../base';
//css
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../animation.css";

class App extends React.Component {

    state = {
        messages: {}
    }

    componentWillMount() {
        this.ref = base.syncState("/", {
            context: this,
            state: "messages"
        });
    }

    addMessage = (message) => {
        // copier le state
        const messages = {...this.state.messages};
        //on ajoute le essage avec une clé timestamp
        const timeStamp = Date.now();
        messages[`message-${timeStamp}`] = message;
        // supprime si plus de 10 messages
        Object.keys(messages).slice(0,-10).map(key => messages[key] = null)
        //mettre a jour notre state
        this.setState({ messages });
    };

    render() {

        const messages = Object
        .keys(this.state.messages)
        .map(key => <Message key={key} details = {this.state.messages[key]}/>);
        console.log(messages)

        return (
            <div className="box">
                <div>
                    <div className="messages">
                    <ReactCSSTransitionGroup
                    component = "div"
                    className="message"
                    transition="message"
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={2000}>
                        {messages}
                    </ReactCSSTransitionGroup>
                    </div>
                    <Formulaire addMessage={this.addMessage} pseudo={this.props.params.pseudo} length="140"/>
                </div>
            </div>
        )
    }
}

export default App;