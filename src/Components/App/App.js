import React from 'react';
import './App.css';
import { InputBox } from "../InputBox/InputBox";
import { SelectBox } from "../SelectBox/SelectBox";
import { OutputBox } from "../OutputBox/OutputBox";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: "", 
                   outputText: "",
                   isCopied: false,
                   processingMethod: "",
                   remainingCharacters: 500
                }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //a call-back function that handles submittion when Select is changed 
  handleSubmit() {
    return document.getElementById("convertedText").innerHTML = this.state.outputText;
  }

  toLowerCase() {
    const text = this.state.inputText.toLowerCase();
    this.setState( { outputText: text, processingMethod: "lowercase" }, this.handleSubmit);  
  }

  toUpperCase() {
    const text = this.state.inputText.toUpperCase();
    this.setState( { outputText: text, processingMethod: "uppercase"  }, this.handleSubmit);
  }

  capitalizeEachWord() {
    const text = this.state.inputText.toLowerCase()
                                .split(" ")
                                .map(word => word.charAt(0).toUpperCase() + word.substring(1))
                                .join(" ");
    this.setState( { outputText: text, processingMethod: "capitalise" }, this.handleSubmit);
  }
 
  //clear state, the value of Select, the display content, and other styling
  clearText() {
    this.setState({ inputText: "",
                    outputText: "",
                    isCopied: false,
                    processingMethod: "",
                    remainingCharacters: 500 
                  });
    document.getElementById("inputText").value = "";
    document.getElementById("convertedText").innerHTML = "";
    document.getElementById("processingMethods").value = "default";
    document.getElementById("charCount").style = "";
  }

  //Update state when the input value in the textarea changes
  handleTextAreaChange(inputText) {
    this.setState({ inputText: inputText 
                   });
    if (this.state.isCopied) {
      this.setState({isCopied: false})
    };
    if (this.state.processingMethod === "lowercase") {
      const convertedText = inputText.toLowerCase();
      this.setState({ outputText: convertedText });
    } else if (this.state.processingMethod === "uppercase") {
      const convertedText = inputText.toUpperCase();
      this.setState({ outputText: convertedText });
    } else if (this.state.processingMethod === "capitalise") {
      const convertedText =  inputText.toLowerCase()
                                      .split(" ")
                                      .map(word => word.charAt(0).toUpperCase() + word.substring(1))
                                      .join(" ");
      this.setState({ outputText: convertedText });
    }
    document.getElementById("convertedText").innerHTML = this.state.outputText;
  }

  //handles changes of Select
  handleSelectChange(newInput) {
    if (this.state.inputText === "") {
      alert("The input box is empty");
      document.getElementById("processingMethods").value = "default";
    }
    if (this.state.inputText !== "" && document.getElementById("processingMethods").value === "default") {
      alert("Please choose a valid processing method");
    } 
    else {
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
      }      
    }   
  }

  copyText() {
    navigator.clipboard.writeText(this.state.outputText)
    .then( ()=> this.setState({ isCopied: true }) );
  }

  countRemainingChars(inputText) {
    const counter = inputText.length;
    const remainingCharacters = 500 - counter;
    this.setState( {remainingCharacters: remainingCharacters})
    if (remainingCharacters <= 20) {
      document.getElementById("charCount").style.color = "red";
    } else {
      document.getElementById("charCount").style = "";
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
                  countRemainingChars={this.countRemainingChars.bind(this)}
                  remainingCharacters={this.state.remainingCharacters}         
        />
        <br></br>
        <label htmlFor="processingMethods">Choose how to process the text:</label>
        <SelectBox updateSelect={this.handleSelectChange.bind(this)}/>
        <OutputBox  outputText={this.state.outputText} 
                    clearText={this.clearText.bind(this)}
                    copyText={this.copyText.bind(this)}
                    
        />
        {this.state.isCopied && <p id="copied">Text copied</p>}
       
      </div>
    );
  }
}
