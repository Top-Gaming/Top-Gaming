import React, { Component } from 'react';
import styles from './navigation.module.css';

let buttonWidth : number = window.innerWidth / 5 - 2;

export class Button {
    text : string;
    href : string;
    constructor(text : string, href : string) {
        this.text = text;
        this.href = href;
    }

    static convertToHTML(buttons : Button[], startingWidth : number) {
        let total : JSX.Element[] = [];
        let index = 0;
        for (const btn of buttons) {
            total.push(<NavigationButton button={btn} startingWidth={startingWidth} key={index} />);
            index++;
        }
        return total;
    }
}

interface NavigationButtonProps {
    button : Button;
    startingWidth : number
}
interface NavigationButtonState {
    width : number;
}

class NavigationButton extends Component<NavigationButtonProps, NavigationButtonState> {
    style : Object;
    constructor(props : any) {
        super(props);

        this.state = {
            width : this.props.startingWidth
        }

        this.style = {
            "width" : this.props.startingWidth + "px"
        }
    }

    updateButtonWidth = () => {
        this.setState({
            width: buttonWidth
        });
        this.style = {
            "width" : this.state.width
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateButtonWidth)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateButtonWidth)
    }

    render() {
        return <div onClick={this.goToLink} style={this.style} className={styles.navigationButton}>{this.props.button.text}</div>;
    }

    goToLink = () => {
        window.location.assign(this.props.button.href);
    }
}

interface NavigationBarProps {
    content : Array<Button>;
}
interface NavigationBarState {}


export default class NavigationBar extends Component<NavigationBarProps, NavigationBarState> {
    content : Array<JSX.Element>
    constructor(props : any) {
        super(props)

        this.content = Button.convertToHTML(this.props.content, window.innerWidth / this.props.content.length - 2)
    }

    updateButtonWidth = () => {
        buttonWidth = window.innerWidth / this.props.content.length - 2
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateButtonWidth)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateButtonWidth)
    }

    render() {
        return <div className={styles.navigationBar}>{this.content}</div>
    }
}