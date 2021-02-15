import React from 'react';
import './App.css';
import { InputBox } from "../InputBox/InputBox";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: "", 
                   outputText: ""
                }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  clearText() {
    this.setState({ inputText: "",
                    outputText: "" 
                  });
    document.getElementById("inputText").value = "";
    document.getElementById("convertedText").innerHTML = "";
  }

  handleTextAreaChange(inputText) {
    this.setState({ inputText: inputText });
    document.getElementById("processingMethods").value = "default";
  }

  handleSelectChange(event) {
    if (this.state.inputText === "") {
      alert("The input box is empty")
    }
    if (document.getElementById("processingMethods").value === "default") {
      alert("Please choose a valid processing method");
    } else {
      switch(event.target.value) {
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
        <div className="selectBox">
          <select name="processingMethods"
                  id="processingMethods"
                  onChange={this.handleSelectChange.bind(this)}
          >
            <option value="default"> -- choose a processing method below --</option>
            <option value="capitalise">Capitalise the First Letter of Each Word</option>
            <option value="lowercase">convert the text to lower case</option>
            <option value="uppercase">CONVERT THE TEXT TO UPPER CASE</option>
          </select>
        </div>
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
