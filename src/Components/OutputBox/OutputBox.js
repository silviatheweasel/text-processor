import React from "react";
// import "./OutputBox.css";

export class OutputBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="container" id="output-container">
                    <div id="text-container">
                        <div id="inner-container">
                            <p id="convertedText"></p>
                        </div>                        
                    </div>
                    <div id="btn-container">
                        <button 
                            onClick={this.props.clearText} 
                            className="clearTextBtn"
                            id="output-clear-btn" 
                        ><i className="fas fa-times"></i>
                        </button>
                        
                        <button 
                            onClick={this.props.copyText}
                            id="copyBtn"
                        >
                            <i class="far fa-copy"></i>
                        </button>
                    </div>                
                 </div>);
    }
}