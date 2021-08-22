import React, {Component, RefObject} from 'react';
import styles from './navigation.module.css';

let buttonWidth : number = (window.innerWidth / 5) - 2.7

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
            if (index === buttons.length - 1) {
                total.push(<NavigationButton button={btn} startingWidth={startingWidth} key={index} lastButton={true}/>)
                continue;
            }
            total.push(<NavigationButton button={btn} startingWidth={startingWidth} key={index} lastButton={false}/>);
            index++;
        }
        return total;
    }
}

interface NavigationButtonProps {
    button : Button;
    startingWidth : number;
    lastButton : boolean
}
interface NavigationButtonState {
    width : number;
}

class NavigationButton extends Component<NavigationButtonProps, NavigationButtonState> {
    style : Object;
    constructor(props : any) {
        super(props);

        this.state = {
            width : this.props.startingWidth - 1.5
        }

        this.style = {
            "width" : this.state.width + "px",
            "borderRight" : this.props.lastButton ? "none" : "1px solid #61dafb"
        }
    }

    updateButtonWidth = () => {
        this.setState({
            width: buttonWidth - 2.7
        });
        this.style = {
            "width" : this.state.width + "px",
            "borderRight" : this.props.lastButton ? "none" : "1px solid #61dafb"
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
    content : Array<JSX.Element>;
    bar : RefObject<HTMLDivElement>;
    constructor(props : any) {
        super(props)

        this.content = Button.convertToHTML(this.props.content, buttonWidth)

        this.bar = React.createRef();

    }

    updateButtonWidth = () => {
        buttonWidth = this.bar.current !== null ? this.bar.current.offsetWidth / this.props.content.length : buttonWidth
    }

    componentDidMount() {
        this.updateButtonWidth();
        window.addEventListener("resize", this.updateButtonWidth)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateButtonWidth)
    }

    render() {
        return <div className={styles.navigationBar} ref={this.bar}>{this.content}</div>
    }
}