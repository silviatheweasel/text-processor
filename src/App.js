import React from 'react';
import './App.css';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "Hello world" }
  }

  toLowerCase() {
    const text = this.state.text.toLowerCase();
    this.setState( { text: text });
  }

  toUpperCase() {
    const text = this.state.text.toUpperCase();
    this.setState({ text: text }); 
  }

  handleTextAreaChange(event) {
    const text = event.target.value;
    this.setState({ text: text });
  }

  handleSelectChange(event) {
    if (event.target.value === "lowercase") {
      this.toLowerCase();
    } else if (event.target.value === "uppercase") {
      this.toUpperCase();
    }
  }
  
  handleClick() {
    return document.getElementById("convertedText").innerHTML = this.state.text;
  }

  render() {
    return (
      <div className="App">
        <label htmlFor="inputText">Paste or type your text below:</label>
        <br></br>
        <textarea id="inputText"
                  name="inputText"
                  rows="5"
                  cols="50"
                  // value={this.state.text}
                  onChange={this.handleTextAreaChange.bind(this)}
        >
        </textarea>
        <br></br>
        <label htmlFor="processingMethods">Choose how to process the text:</label>
        <select name="processingMethods"
                id="processingMethods"
                onChange={this.handleSelectChange.bind(this)}
        >
          {/* <option value="capitalise">Capitalise the First Letter of Each Word</option> */}
          <option value="lowercase">convert the text to lower case</option>
          <option value="uppercase">CONVERT THE TEXT TO UPPER CASE</option>
        </select>
        <button onClick={this.handleClick.bind(this)}>Convert</button>
        <p id="convertedText"></p>
      </div>
    );
  }
}

