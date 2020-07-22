import React from "react";

class SuccessFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.state = {downloadFileName: props.downloadFileName};
  }
  
  handleLinkClick(event) {
    fetch('/qtifile/' + this.state.downloadFileName)
      .then(response => {
        //const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = this.state.downloadFileName;
          a.click();
        });
      })
  }

  render() {
    return (
      <div className="alert alert-success">

        <h4>
          Success
      </h4> <strong>Please download the generated QTI zip file from  | </strong>  <button type="button" onClick={this.handleLinkClick} aria-hidden="true" >
          Download QTI File
				</button>
      </div>
    )
  };
}

class InitFeedback extends React.Component {
  render() {
    return null;
  };
}

class ProcessingFeedback extends React.Component {
  render() {
    return (
      <div className="alert alert-secondary">
        <h4>
          Processing
      </h4>
      </div>
    )
  };
}

class ErrorFeedback extends React.Component {
  render() {
    return (
      <div className="alert alert-warning">

        <h4>
          Error
      </h4> <strong>There are errors when processing the markdown: </strong>  <br />
        <p>{this.props.feedbackErrMsg}</p>
      </div>
    )
  };
}

class FeedbackAlert extends React.Component {
  render() {
    const feedbackStatus = this.props.feedbackStatus;
    if (feedbackStatus === 'init') {
      return <InitFeedback />;
    } else if (feedbackStatus === 'success') {
      return <SuccessFeedback downloadFileName={this.props.downloadFileName}/>;
    } else if (feedbackStatus === 'processing') {
      return <ProcessingFeedback />;
    } else if (feedbackStatus === 'error') {
      return <ErrorFeedback 
      feedbackErrMsg={this.props.feedbackErrMsg}/>;
    }else {
      return <InitFeedback />;
    }
  }
}
export default FeedbackAlert;