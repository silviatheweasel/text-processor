import React from "react";

export class SelectBox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        const methodName = event.target.id;
        this.props.updateSelect(methodName);
    }

    render() {      
      return (
        <div className="selectBox">
            <div 
                className="option" 
                id="capitalise"
                onClick={this.handleChange.bind(this)}
              >Abc
            </div>
            <div 
                className="option" 
                id="lowercase"
                onClick={this.handleChange.bind(this)}
              >abc
            </div>
            <div 
                className="option" 
                id="uppercase"
                onClick={this.handleChange.bind(this)}
            >ABC
            </div>
            <div 
                id="default"
                onClick={this.props.toggleDisplay}
              >Choose a method
            </div>
        </div>
      )
    }
}