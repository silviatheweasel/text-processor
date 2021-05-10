import React from "react";
// import "./InputBox.css"

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


    // handleInput(event) {
    //     const field = event.target;
    //     this.props.autoExpand(field);
    // }

    render() {
        return (<div id="textBox">
                    <textarea   id="inputText"
                                name="inputText"
                                rows="5"
                                cols="60"
                                placeholder="type here..."
                                maxLength="2000"
                                onChange={this.handleChange.bind(this)}
                                onKeyUp={this.handleKeyup.bind(this)}
                                // onInput={this.handleInput.bind(this)}
                    >
                    </textarea>
                    <div id="charCount">
                        {this.props.remainingCharacters}/2000
                    </div>
                        <button 
                            className="clearTextBtn" 
                            id="input_clear_btn"
                            onClick={this.props.clearText}
                        ><i className="fas fa-times"></i>
                        </button>
                </div>)
    }

}