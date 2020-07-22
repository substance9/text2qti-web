import "./filestyle.css"

import React from "react";

class FileForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      let maxFileSize = 10 * 1024 * 1024; //10MB
      let  fileSize = event.target.files[0].size;
      if (fileSize < maxFileSize){
        this.props.onFileChange(event.target.files[0]);
      }else{
        event.target.value = null;
        alert("File is too large, Please select a file that is smaller than 10MB");
      }
    }
  
    render() {
      return (
        <form method="post" action="#" id="#">
              <div className="form-group files">
                <label><b>OR Upload Your Markdown File (only accept .txt or .md file) </b></label>
                <input type="file" className="form-control" multiple="" onChange={this.handleChange}/>
              </div>
          </form>
      );
    }
  }
export default FileForm;