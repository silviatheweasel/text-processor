import React from 'react';
import './App.css';
import { InputBox } from "../InputBox/InputBox";
import { SelectBox } from "../SelectBox/SelectBox";
import { OutputBox } from "../OutputBox/OutputBox";

const optionBtns = document.getElementsByClassName("option");
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: "", 
                   outputText: "",
                   isCopied: false,
                   processingMethod: "",
                   remainingCharacters: 2000,
                   isDisplayed: false
                }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);  
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad);
  }

  handleLoad() {
    setTimeout(() => {
      document.getElementById("prompt-text-1").className = "notVisible";
      document.getElementById("prompt-text-2").className = "notVisible";
      document.getElementById("input-tooltip").className = "isVisible";
      document.getElementById("input-container").style.zIndex = "40";
    }, 3000);

    setTimeout(() => {
      document.getElementById("input-container").style = "";
      document.getElementById("select-tooltip").style.zIndex = "40";
      document.getElementById("select-container").style.zIndex = "40";
      document.getElementById("input-tooltip").className = "notVisible";
      document.getElementById("select-tooltip").className = "isVisible";
    }, 5000);

    setTimeout(() => {
      document.getElementById("select-tooltip").style = "";
      document.getElementById("select-tooltip").className = "notVisible";
      for (let i = 0; i < optionBtns.length; i++) {
        optionBtns[i].classList.remove("notVisible");
        optionBtns[i].classList.add("tutorial");
      }  
    }, 7000);

    setTimeout(() => {
      for (let i = 0; i < optionBtns.length; i++) {
        optionBtns[i].classList.remove("tutorial");
        optionBtns[i].classList.add("notVisible");
        document.getElementById("prompt").style.display = "none";
      }
    }, 10000);

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
                    remainingCharacters: 2000,
                    isDisplayed: false 
                  });
    document.getElementById("inputText").value = "";
    document.getElementById("convertedText").innerHTML = "";
    document.getElementById("charCount").style = "";
    document.getElementById("inputText").style = "";
    document.getElementById("input_clear_btn").classList.add("notVisible");
  }

  showDisplay() {    
    for (let i = 0; i < optionBtns.length; i++) {
      optionBtns[i].classList.remove("notVisible");
      optionBtns[i].classList.add("isVisible");
    }
  }

  hideDisplay() {
    for (let i = 0; i < optionBtns.length; i++) {
      optionBtns[i].classList.remove("isVisible");
      optionBtns[i].classList.add("notVisible");
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.isDisplayed !== prevState.isDisplayed) {
      this.state.isDisplayed ? this.showDisplay() : this.hideDisplay();
    }   
    if (this.state.outputText !== prevState.outputText) {
      if (this.state.outputText) {
          document.getElementById("output-clear-btn").classList.add("isVisible");
          document.getElementById("output-clear-btn").classList.remove("notVisible");
          document.getElementById("copyBtn").classList.add("isVisible");
          document.getElementById("copyBtn").classList.remove("notVisible");
      } else {
          document.getElementById("output-clear-btn").classList.remove("isVisible");
          document.getElementById("output-clear-btn").classList.add("notVisible");
          document.getElementById("copyBtn").classList.remove("isVisible");
          document.getElementById("copyBtn").classList.add("notVisible");
        }
      }      
  }

  toggleDisplay() {
    this.setState( { isDisplayed: !this.state.isDisplayed });
  }

  //Update state when the input value in the textarea changes
  handleTextAreaChange(inputText) {
    this.setState({ inputText: inputText });
    if (this.state.isCopied) {
      this.setState({ isCopied: false })
    };

    if (inputText) {
      this.setState({ isDisplayed : true });
      document.getElementById("input_clear_btn").classList.remove("notVisible");
      document.getElementById("input_clear_btn").classList.add("isVisible");
    } else {
      this.setState({ isDisplayed : false });
      document.getElementById("input_clear_btn").classList.remove("isVisible");
      document.getElementById("input_clear_btn").classList.add("notVisible");
    }

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
  handleSelectChange(methodName) {
    if (this.state.inputText === "") {
      document.getElementById("alert").className = "isVisible";
    } else {
      switch(methodName) {
        case "lowercase":
          this.toLowerCase();
          this.setState( { isDisplayed : false });
          break;
        case "uppercase":
          this.toUpperCase();
          this.setState( { isDisplayed : false });
          break;
        case "capitalise": 
          this.capitalizeEachWord();
          this.setState( { isDisplayed : false });
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
    const remainingCharacters = 2000 - counter;
    this.setState( {remainingCharacters: remainingCharacters})
    if (remainingCharacters <= 20) {
      document.getElementById("charCount").style.color = "red";
    } else {
      document.getElementById("charCount").style = "";
    }
  }

  // autoExpand(field) {
  //   field.style.height = 'inherit';
	//   const computed = window.getComputedStyle(field);
  //   let height = parseInt(computed.getPropertyValue('border-top-width'), 10)
  //               + parseInt(computed.getPropertyValue('padding-top'), 10)
  //               + field.scrollHeight
  //               + parseInt(computed.getPropertyValue('padding-bottom'), 10)
  //               + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
  //   field.style.height = height + 'px';
  // }

  render() {
    return (
      <div className="App">
        <div id="prompt">
          {/* <h1 
            id="prompt-text"
            >Hey, let's take a little tour!
            </h1> */}
            <div id="prompt-content">
              <span 
                id="prompt-text-1" 
                >Hey, let's take 
              </span>
              <span 
                id="prompt-text-2" 
                >a little tour!
              </span>
            </div>
        </div>
        <div 
          className="container" 
          id="input-container"
          >
          <label 
            htmlFor="inputText"
            id="input-tooltip"
            className="notVisible"
            >Paste or type your text    
            <i 
              id="arrow-down" 
              className="fas fa-long-arrow-alt-down"
              ></i>
          </label>
          <InputBox 
            inputText={this.state.inputText} 
            clearText={this.clearText.bind(this)}
            handleInputText={this.handleTextAreaChange.bind(this)}
            countRemainingChars={this.countRemainingChars.bind(this)}
            remainingCharacters={this.state.remainingCharacters}  
            // autoExpand={this.autoExpand.bind(this)}   
          />
        </div>

        <div 
            id="select-tooltip"
            className="notVisible"
            >
            Choose how you'd like to process your text
            <i 
              className="fas fa-long-arrow-alt-right"
              id="arrow-right"
              ></i>
          </div>

        <div 
          className="container" 
          id="select-container"
          >
          <SelectBox 
            updateSelect={this.handleSelectChange.bind(this)}
            toggleDisplay={this.toggleDisplay.bind(this)}
          />
        </div>

        <OutputBox  
          outputText={this.state.outputText} 
          clearText={this.clearText.bind(this)}
          copyText={this.copyText.bind(this)}                   
        />

        <div id="alert" className="notVisible">
          <p id="alert-text">Psss...Did you forget to leave something in the input box?</p>
          <button 
            id="dismiss-btn"
            onClick={() => document.getElementById("alert").className = "notVisible"}
            >Dissmiss</button>
        </div>

        {this.state.isCopied && 
        <p 
          id="copied"
          >
            Text copied
          </p>}      
      </div>
    );
  }
}
