import React from "react";

export class InputBox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        const inputText = event.target.value;
        this.props.handleInputText(inputText);
    }

    render() {
        return (<form className="textBox">
                    <textarea   id="inputText"
                                name="inputText"
                                rows="5"
                                cols="60"
                                placeholder="type here..."
                                maxLength="5000"
                                onChange={this.handleChange.bind(this)}
                    >
                    </textarea>
                    {this.props.inputText !== "" && <button className="clearTextBtn" 
                                                            onClick={this.props.clearText}
                                                    ><i className="fas fa-times"></i>
                                                    </button>
                                                    }
                </form>)
    }

}