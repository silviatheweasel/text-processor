import React from "react";
import "./OutputBox.css";

export class OutputBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="textBox">
                    <p id="convertedText"></p>
                    <div>
                        {this.props.outputText !== "" && <button onClick={this.props.clearText} 
                                                                 className="clearTextBtn" 
                        ><i className="fas fa-times"></i>
                        </button>}
                        
                        {this.props.outputText !== "" && <button onClick={this.props.copyText}
                                                                 className="copyBtn"
                        ><i class="far fa-copy"></i>
                         </button>}
                    </div>                
                 </div>);
    }
}