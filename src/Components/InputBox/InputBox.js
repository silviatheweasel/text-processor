import React from "react";
import "./InputBox.css"

export class InputBox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        const inputText = event.target.value;
        this.props.handleInputText(inputText);
    }

    handleKeyup(event) {
        const inputText = event.target.value;
        this.props.countRemainingChars(inputText);
    }

    render() {
        return (<form className="textBox">
                    <textarea   id="inputText"
                                name="inputText"
                                rows="5"
                                cols="60"
                                placeholder="type here..."
                                maxLength="500"
                                onChange={this.handleChange.bind(this)}
                                onKeyUp={this.handleKeyup.bind(this)}
                    >
                    </textarea>
                    <div id="charCount">{this.props.remainingCharacters}/500</div>
                    {this.props.inputText !== "" && <button className="clearTextBtn" 
                                                            onClick={this.props.clearText}
                                                    ><i className="fas fa-times"></i>
                                                    </button>
                                                    }
                </form>)
    }

}