import React from "react";
import "./OutputBox.css";

export class OutputBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<form className="textBox">
                <p id="convertedText"></p>
                {this.props.outputText !== "" && <button onClick={this.props.clearText} 
                                                         className="clearTextBtn" 
                                                ><i className="fas fa-times"></i>
                                                </button>}
                 </form>);
    }
}