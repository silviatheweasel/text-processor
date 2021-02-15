import React from 'react';
import './App.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" }
  }

  toLowerCase() {
    const text = this.state.text.toLowerCase();
    this.setState( { text: text });
  }

  toUpperCase() {
    const text = this.state.text.toUpperCase();
    this.setState({ text: text }); 
  }

  capitalizeEachWord() {
    const text = this.state.text.toLowerCase()
                                .split(" ")
                                .map(word => word.charAt(0).toUpperCase() + word.substring(1))
                                .join(" ");
    this.setState({ text: text });
  }

  handleTextAreaChange(event) {
    const text = event.target.value;
    this.setState({ text: text });
    document.getElementById("processingMethods").value = "default";
  }

  handleSelectChange(event) {
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
  
  handleClick() {
    if (this.state.text === "") {
      alert("The input box is empty")
    }
    if (document.getElementById("processingMethods").value === "default") {
      alert("Please choose a valid processing method");
      document.getElementById("convertedText").innerHTML = "";
    } else 
      {return document.getElementById("convertedText").innerHTML = this.state.text;}
  }

  render() {
    return (
      <div className="App">
        <label htmlFor="inputText">Paste or type your text below:</label>
        <br></br>
        <textarea id="inputText"
                  name="inputText"
                  rows="5"
                  cols="60"
                  placeholder="type here..."
                  onChange={this.handleTextAreaChange.bind(this)}
        >
        </textarea>
        <br></br>
        <label htmlFor="processingMethods">Choose how to process the text:</label>
        <select name="processingMethods"
                id="processingMethods"
                onChange={this.handleSelectChange.bind(this)}
        >
          <option value="default"> -- choose a processing method below --</option>
          <option value="capitalise">Capitalise the First Letter of Each Word</option>
          <option value="lowercase">convert the text to lower case</option>
          <option value="uppercase">CONVERT THE TEXT TO UPPER CASE</option>
        </select>
        <button onClick={this.handleClick.bind(this)}>Convert</button>
        <p id="convertedText"></p>
      </div>
    );
  }
}
