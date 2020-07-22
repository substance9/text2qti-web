import React from "react";

class MDForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
      this.props.onMdTextChange(event.target.value);
    }
  
    render() {
      return (
        <form >
          <label>
            <b>Input Quiz in Markdown Format:</b>
        </label><br></br>
            <textarea value={this.state.value} onChange={this.handleChange }  cols={80} rows={10}/>
        </form>
      );
    }
  }
export default MDForm;