import React, { Component } from 'react';

export class Button {
    text : string;
    href : string;
    constructor(text : string, href : string) {
        this.text = text;
        this.href = href;
    }

    static convertToHTML(buttons : Button[]) {
        let total : JSX.Element[] = [];
        let index = 0;
        for (const btn of buttons) {
            total.push(<NavigationButton button={btn} key={index} />);
            index++;
        }
        return total;
    }
}

interface NavigationButtonProps {
    button : Button;
}
interface NavigationButtonState {}

class NavigationButton extends Component<NavigationButtonProps, NavigationButtonState> {
    render() {
        return <div onClick={this.goToLink}>this.props.button.link</div>;
    }

    goToLink() : void {
        window.location.assign(this.props.button.href);
    }
}

interface NavigationBarProps {
    content : Array<Button>;
}
interface NavigationBarState {
    content : Array<JSX.Element>;
}

export default class NavigationBar extends Component<NavigationBarProps, NavigationBarState> {
    constructor(props : any) {
        super(props)

        this.setState({
            content : Button.convertToHTML(this.props.content)
        })
    }

    render() {
        return <div>{this.state.content}</div>
    }
}