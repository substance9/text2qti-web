import React from "react";
import marked from "marked";

class Help extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };

    marked.setOptions({
      renderer: new marked.Renderer(),
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
  }

  componentDidMount() {
    const readmePath = require("./Help.md");
  
    fetch(readmePath)
      .then(response => {
        return response.text()
      })
      .then(text => {
        this.setState({
          markdown: marked(text)
        })
      })
  }

  render() {
    const { markdown } = this.state;

    return <main id="mainContent">
    <div className="container">
    <section>
    <article dangerouslySetInnerHTML={{__html: markdown}}></article>
  </section>
    </div>
  </main>;
  }
}
export default Help;

