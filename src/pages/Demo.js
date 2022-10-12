import React from "react";
import Split from "react-split";

const Demo = () => {
  return (
    <main>
      <Split sizes={[30, 70]} direction="horizontal" className="split">
        <div style={{ background: "yellow" }}>hello</div>
        <div style={{ background: "blue" }}>there</div>
      </Split>
    </main>
  );
};

export default Demo;
