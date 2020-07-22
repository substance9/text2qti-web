import React from "react";
import MDForm from "./MDForm"
import FeedbackAlert from "./FeedbackAlert"
import FileForm from "./FileForm";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleMdFormChange = this.handleMdFormChange.bind(this);
    this.handleFileFormChange = this.handleFileFormChange.bind(this);
    this.handleConvertButtonClick = this.handleConvertButtonClick.bind(this);
    this.state = {
      mdText: null,
      selectedFile: null,
      downloadFileName: 'init',
      feedbackStatus: 'init',
      feedbackErrMsg: 'init'
    };
  }

  handleMdFormChange(mdText) {
    //console.log(mdText);
    this.setState({ mdText: mdText });
  }

  handleFileFormChange(file) {
    //console.log(file);
    this.setState({ selectedFile: file });
  }

  handleConvertButtonClick() {
    if (this.state.mdText === null && this.state.selectedFile === null) {
      return;
    }

    var requestStatus = false;

    this.setState({ feedbackStatus: 'processing' });

    if (this.state.selectedFile !== null) {//first check if the file is set to upload
      const fileFormData = new FormData();
      fileFormData.append('MDFile', this.state.selectedFile)
      let requestOptions = {
        method: 'POST',
        body: fileFormData
      };
      fetch('/api/mdfile', requestOptions)
        .then(response => {
          if (response.ok) {
            requestStatus = true;
          }
          else {
            requestStatus = false;
          }
          return response.json();
        })
        .then(data => {
          if (requestStatus===true){
            this.setState({ feedbackStatus: "success", downloadFileName: data.filename});
          } else {
            this.setState({ feedbackStatus: "error", feedbackErrMsg: data.err });
          }        
        })
    }
    else {//if there is no file, upload text instead
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mdtext: this.state.mdText })
      };
      fetch('/api/mdtext', requestOptions)
        .then(response => {
          if (response.ok) {
            requestStatus = true;
          }
          else {
            requestStatus = false;
          }
          return response.json();
        })
        .then(data => {
          if (requestStatus===true){
            this.setState({ feedbackStatus: "success", downloadFileName: data.filename});
          } else {
            this.setState({ feedbackStatus: "error", feedbackErrMsg: data.err });
          }
        })
    }
  }

  render() {
    return <main id="mainContent">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <MDForm
              onMdTextChange={this.handleMdFormChange} />
          </div>
          <div className="col-md-6">
            <FileForm
              onFileChange={this.handleFileFormChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" align='center'>
            <p>If both text and file are given, only the uploaded file will be used</p>
            <br />
            <button type="button" className="btn btn-success" onClick={this.handleConvertButtonClick}>
              Convert
			</button>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <FeedbackAlert
              feedbackStatus={this.state.feedbackStatus}
              downloadFileName={this.state.downloadFileName} 
              feedbackErrMsg={this.state.feedbackErrMsg}/>
          </div>
        </div>
      </div>
    </main>;
  }
}
export default Home;
