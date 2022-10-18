import React from "react";
import { useState, useRef } from "react";
// import sanitize from "sanitize-html";
import ContentEditable from "react-contenteditable";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { nanoid } from "nanoid";

import Task from "./Task";
import { useGlobalContext } from "./context";

const Editor = () => {
  const {
    page,
    handleIntroChange,
    handleAddTask,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
  } = useGlobalContext();

  console.log("sanity check");

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
              html={page.title}
              tagName="h3"
              placeholder="Untitled"
              onChange={(e, type) => handleIntroChange(e, "title")}
            />
          </div>
          <ContentEditable
            className="page__description editable"
            html={page.description}
            onChange={(e, type) => handleIntroChange(e, "description")}
            tagName="p"
            placeholder="Add a description..."
          />
        </header>
        <hr className="hr" />
        <div className="board">
          {page.groups.map((group) => {
            return (
              <>
                <article
                  className="board__group"
                  key={group.groupId}
                  onDragOver={handleDragOver}
                  onDragEnter={() => handleDragEnter(group.groupId)}
                  onDragLeave={handleDragLeave}
                >
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
                          taskId={task.taskId}
                          title={task.title}
                          // deleteTiteless={deleteTiteless}
                        />
                      );
                    })}
                  </ul>
                  <button
                    className="btn btn--new"
                    onClick={() => handleAddTask(group.groupId)}
                  >
                    <AiOutlinePlus className="new-icon" />
                    New
                  </button>
                </article>
              </>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Editor;
