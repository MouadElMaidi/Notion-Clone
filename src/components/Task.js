import React from "react";
import { useRef, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { AiOutlineFile } from "react-icons/ai";

const Task = (props) => {
  const { groupId, id, deleteTiteless } = props;
  const taskHTML = useRef("");
  const ceREF = useRef("");

  const handleChange = (e) => {
    taskHTML.current = e.target.value;
  };

  const handleFocus = () => {};

  const handleBlur = () => {
    const title = taskHTML.current;
    deleteTiteless(title, groupId, id);
  };

  useEffect(() => {
    ceREF.current.focus();
  }, []);

  return (
    <li draggable={true}>
      <div className="task">
        <AiOutlineFile className="file-icon" />
        <ContentEditable
          innerRef={ceREF}
          html={taskHTML.current}
          tagName="h5"
          onChange={handleChange}
          className="task__title editable"
          placeholder={"Untitled"}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </li>
  );
};

export default Task;
