import React from "react";
import { useState, useRef } from "react";
// import sanitize from "sanitize-html";
import ContentEditable from "react-contenteditable";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { nanoid } from "nanoid";

import Task from "./Task";

const Editor = () => {
  const [page, setPage] = useState([
    {
      groupId: nanoid(),
      title: "To Do",
      tasks: [
        {
          taskId: nanoid(),
          element: <Task />,
        },
      ],
    },
    {
      groupId: nanoid(),
      title: "Doing",
      tasks: [
        {
          taskId: nanoid(),
          element: <Task />,
        },
      ],
    },
    {
      groupId: nanoid(),
      title: "Done",
      tasks: [
        {
          taskId: nanoid(),
          element: <Task />,
        },
      ],
    },
  ]);

  const titleHTML = useRef("Task List");
  const descriptionHTML = useRef(
    "Use this template to track your personal tasks.<br/> Click + New to create a new task directly on this board.<br/> Click an existing task to add additional context or subtasks."
  );

  const handleClick = (groupId) => {
    setPage((prev) =>
      prev.map((group) =>
        group.groupId === groupId
          ? {
              ...group,
              tasks: [...group.tasks, { taskId: nanoid(), element: <Task /> }],
            }
          : group
      )
    );
  };

  console.log("sanity check");

  const handleChange = (e, type) => {
    if (type === "title") {
      titleHTML.current = e.target.value;
    } else if (type === "description") {
      descriptionHTML.current = e.target.value;
    }
  };

  const handleBlur = () => {
    // console.log(titleHTML.current);
    // console.log(descriptionHTML.current);
  };

  function deleteTiteless(title, groupId, id) {
    // if (!title) {
    //   setPage(
    //     page.map((group) =>
    //       group.groupId === groupId
    //         ? {
    //             ...group,
    //             tasks: group.tasks.filter((task) => task.taskId !== id),
    //           }
    //         : group
    //     )
    //   );
    // }
  }

  return (
    <main>
      <section className="editor">
        <header className="page__header">
          <div className="page__title">
            <BsCheckLg className="title__icon" />
            <ContentEditable
              className="title__text editable"
              html={titleHTML.current}
              tagName="h3"
              placeholder="Untitled"
              onChange={(e, type) => handleChange(e, "title")}
              onBlur={handleBlur}
            />
          </div>
          <ContentEditable
            className="page__description editable"
            html={descriptionHTML.current}
            onChange={(e, type) => handleChange(e, "description")}
            onBlur={handleBlur}
            tagName="p"
            placeholder="Add a description..."
          />
        </header>
        <hr className="hr" />
        <div className="board">
          {page.map((group) => {
            return (
              <article className="board__group" key={group.groupId}>
                <header className="group__title">
                  <h5>{group.title}</h5>
                  <p>{group.tasks.length}</p>
                </header>
                <ul>
                  {group.tasks.map((task) => {
                    return (
                      <Task
                        key={task.taskId}
                        groupId={group.groupId}
                        id={task.taskId}
                        deleteTiteless={deleteTiteless}
                      />
                    );
                  })}
                </ul>
                <button
                  className="btn btn--new"
                  onClick={() => handleClick(group.groupId)}
                >
                  <AiOutlinePlus className="new-icon" />
                  New
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Editor;
