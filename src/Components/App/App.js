import React from 'react';
import './App.css';
import { InputBox } from "../InputBox/InputBox";
import { SelectBox } from "../SelectBox/SelectBox";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: "", 
                   outputText: ""
                }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //a call-back function that handles submittion when Select is changed 
  handleSubmit() {
    return document.getElementById("convertedText").innerHTML = this.state.outputText;
  }

  toLowerCase() {
    const text = this.state.inputText.toLowerCase();
    this.setState( { outputText: text }, this.handleSubmit);  
  }

  toUpperCase() {
    const text = this.state.inputText.toUpperCase();
    this.setState( { outputText: text }, this.handleSubmit);
  }

  capitalizeEachWord() {
    const text = this.state.inputText.toLowerCase()
                                .split(" ")
                                .map(word => word.charAt(0).toUpperCase() + word.substring(1))
                                .join(" ");
    this.setState({ outputText: text });
    this.setState( { outputText: text }, this.handleSubmit);
  }
 
  //clear state, the value of Select, and the display content
  clearText() {
    this.setState({ inputText: "",
                    outputText: "" 
                  });
    document.getElementById("inputText").value = "";
    document.getElementById("convertedText").innerHTML = "";
    document.getElementById("processingMethods").value = "default";
  }

  //Update state when the input value in the textarea changes
  handleTextAreaChange(inputText) {
    this.setState({ inputText: inputText });
    document.getElementById("processingMethods").value = "default";
  }

  //handles changes of Select
  handleSelectChange(newInput) {
    if (this.state.inputText === "") {
      alert("The input box is empty")
    }
    if (document.getElementById("processingMethods").value === "default") {
      alert("Please choose a valid processing method");
    } else {
      switch(newInput) {
        case "lowercase":
          this.toLowerCase();
          break;
        case "uppercase":
          this.toUpperCase();
          break;
        case "capitalise": 
          this.capitalizeEachWord();
          break;
        default: alert("Please choose a valid processing method");
      }      
    }   
  }

  render() {
    return (
      <div className="App">
        <label htmlFor="inputText">Paste or type your text below:</label>
        <br></br>
        <InputBox inputText={this.state.inputText} 
                  clearText={this.clearText.bind(this)}
                  handleInputText={this.handleTextAreaChange.bind(this)}
        />
        <br></br>
        <label htmlFor="processingMethods">Choose how to process the text:</label>
        <SelectBox updateSelect={this.handleSelectChange.bind(this)}/>

        <form className="textBox">
          <p id="convertedText"></p>
          {this.state.outputText !== "" && <button onClick={this.clearText.bind(this)} 
                                                   className="clearTextBtn" 
                                            ><i className="fas fa-times"></i>
                                            </button>}
        </form>        
      </div>
    );
  }
}
