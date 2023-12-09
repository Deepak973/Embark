import React from "react";

const iframeStyle = {
  width: "100%",
  height: "100%",
  border: "none", // Remove border if you don't want any
};

const containerStyle = {
  width: "100%",
  height: "100vh", // Use viewport height for full height
  overflow: "hidden",
};

function Meet() {
  return (
    <div style={containerStyle}>
      <iframe
        title="Your Meet Iframe"
        style={iframeStyle}
        src="https://embark-huddle-implementation.vercel.app/" // replace this with your actual iframe source URL
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Meet;
