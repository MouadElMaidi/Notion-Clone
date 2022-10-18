import React from "react";
import { useRef, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { AiOutlineFile } from "react-icons/ai";
import { useGlobalContext } from "./context";

const Task = (props) => {
  const { groupId, taskId, title } = props;
  const { handleTaskTitleChange, handleDragStart, handleDrop } =
    useGlobalContext();

  // const ceREF = useRef("");
  // const liREF = useRef();

  // useEffect(() => {
  //   ceREF.current.focus();
  // }, []);

  return (
    <li
      draggable={true}
      className="list-item"
      onDragStart={(e) => handleDragStart(e, groupId, taskId, title)}
      onDrop={(e) => handleDrop(e)}
      // ref={liREF}
    >
      <div className="task">
        <AiOutlineFile className="file-icon" />
        <ContentEditable
          // innerRef={ceREF}
          html={title}
          tagName="h5"
          onChange={(e) => handleTaskTitleChange(e, groupId, taskId)}
          className="task__title editable"
          placeholder="Untitled"
        />
      </div>
    </li>
  );
};

export default Task;
