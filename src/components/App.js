import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  const [copied, setCopied] = useState(false);
  const [title, setTitle] = useState("");
  const [allText, setAllText] = useState("");

  const htmlStarter = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${css}</style>
    <title>${title}</title>
  </head>
  <body>
    ${html}
    <script>${js}</script>
  </body>
  </html>`;

  useEffect(() => {
    setAllText(`${htmlStarter}`);

    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js, htmlStarter]);

  const programmingLanguages = [
    {
      id: 1,
      language: "xml",
      displayName: "HTML",
      value: html,
      onChange: setHtml,
    },
    {
      id: 2,
      language: "css",
      displayName: "CSS",
      value: css,
      onChange: setCss,
    },
    {
      id: 3,
      language: "javascript",
      displayName: "JS",
      value: js,
      onChange: setJs,
    },
  ];

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      <div className="pane top-pane">
        {programmingLanguages.map((l) => (
          <Editor
            key={l.id}
            language={l.language}
            displayName={l.displayName}
            value={l.value}
            onChange={l.onChange}
          />
        ))}
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />

        {/* INSERT TEMPLATES */}
        <div className="settings">
          <input
            type="text"
            id="fname"
            name="title"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {copied ? (
            <span style={{ color: "red", visibility: "visible" }}>Copied.</span>
          ) : (
            <span style={{ color: "red", visibility: "hidden" }}>Copied.</span>
          )}

          <div className="copy-settings">
            <CopyToClipboard text={allText} onCopy={handleCopy}>
              <button className="btn setting-btn copy-btn">Copy All</button>
            </CopyToClipboard>
            <CopyToClipboard text={html} onCopy={handleCopy}>
              <button className="btn setting-btn copy-btn">Copy HTML</button>
            </CopyToClipboard>
            <CopyToClipboard text={css} onCopy={handleCopy}>
              <button className="btn setting-btn copy-btn">Copy CSS</button>
            </CopyToClipboard>
            <CopyToClipboard text={js} onCopy={handleCopy}>
              <button className="btn setting-btn copy-btn">Copy JS</button>
            </CopyToClipboard>
          </div>

          <div className="clear-settings">
            <button
              className="btn setting-btn clear-btn"
              onClick={() => setHtml("")}
            >
              Clear HTML
            </button>
            <button
              className="btn setting-btn clear-btn"
              onClick={() => setCss("")}
            >
              Clear CSS
            </button>
            <button
              className="btn setting-btn clear-btn"
              onClick={() => setJs("")}
            >
              Clear JS
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
