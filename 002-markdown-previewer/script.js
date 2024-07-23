import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import Prism from "https://esm.sh/prismjs";
import {marked} from "https://esm.sh/marked";

// Set Marked options
marked.setOptions({
  breaks: true,
  highlight: function(code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

// RENDERER
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

//FILLED CONTENT

const defaultMarkdown = `# Heading H1
## Sub-heading H2
[Link](https://www.example.com)
\`inline code\`
\`\`\`
code block
\`\`\`
- List item
> Blockquote
![Image](https://www.example.com/image.jpg)
**Bold text**`;

const Editor = ({ content, handleTextareaChange }) => ( <textarea id="editor" value={content} onChange={handleTextareaChange} /> );

const Previewer = ({ content }) => (
  <div id="preview" 
       dangerouslySetInnerHTML = {{ __html: marked(content, { renderer: renderer }) }} />
);

const App = () => {
  const [content, setContent] = React.useState(defaultMarkdown);
  
  const handleTextareaChange = (event) => {
    setContent(event.target.value)
  };
  
  return (
    <div className="main">
      <Editor content={content} handleTextareaChange={handleTextareaChange} />
      <Previewer content={content} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
