import React from "react";
import "./SelectBox.css"

export class SelectBox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        const newInput = event.target.value;
        this.props.updateSelect(newInput);
    }

    render() {
        return (<form className="selectBox">
        <select name="processingMethods"
                id="processingMethods"
                onChange={this.handleChange.bind(this)}
        >
          <option value="default"> -- choose a processing method below --</option>
          <option value="capitalise">Capitalise the First Letter of Each Word</option>
          <option value="lowercase">convert the text to lower case</option>
          <option value="uppercase">CONVERT THE TEXT TO UPPER CASE</option>
        </select>
      </form>);
    }
}