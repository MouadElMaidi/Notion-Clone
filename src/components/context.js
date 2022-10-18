import { nanoid } from "nanoid";
import React, { useState, useContext, useRef } from "react";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [page, setPage] = useState({
    title: "Task List",
    description:
      "Use this template to track your personal tasks.<br/> Click + New to create a new task directly on this board.<br/> Click an existing task to add additional context or subtasks.",
    groups: [
      {
        groupId: nanoid(),
        title: "To Do",
        tasks: [
          {
            taskId: nanoid(),
            title: "To Do Task",
          },
        ],
      },
      {
        groupId: nanoid(),
        title: "Doing",
        tasks: [
          {
            taskId: nanoid(),
            title: "Doing Task",
          },
        ],
      },
      {
        groupId: nanoid(),
        title: "Done",
        tasks: [
          {
            taskId: nanoid(),
            title: "Done Task",
          },
        ],
      },
    ],
  });

  const [groupEnteredId, setGroupEnteredId] = useState("");

  const handleIntroChange = (e, type) => {
    if (type === "title") {
      setPage((prev) => {
        return { ...prev, title: e.target.value };
      });
    } else if (type === "description") {
      setPage((prev) => {
        return {
          ...prev,
          description: e.target.value,
        };
      });
    }
  };

  const handleTaskTitleChange = (e, groupId, taskId) => {
    setPage((prev) => {
      return {
        ...prev,
        groups: prev.groups.map((group) => {
          if (group.groupId === groupId) {
            const newTasks = group.tasks.map((task) => {
              if (task.taskId === taskId) {
                return { ...task, title: e.target.value };
              } else {
                return task;
              }
            });
            return { ...group, tasks: newTasks };
          }
          return group;
        }),
      };
    });
  };

  const handleAddTask = (groupId) => {
    setPage((prev) => {
      return {
        ...prev,
        groups: prev.groups.map((group) =>
          group.groupId === groupId
            ? {
                ...group,
                tasks: [...group.tasks, { taskId: nanoid(), title: "" }],
              }
            : group
        ),
      };
    });
    // setGroups((prev) =>
    //   prev.map((group) =>
    //     group.groupId === groupId
    //       ? {
    //           ...group,
    //           tasks: [...group.tasks, { taskId: nanoid(), title: "" }],
    //         }
    //       : group
    //   )
    // );
  };

  //Drag & Drop functionnality
  function handleDragStart(e, groupId, taskId, title) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text", `${groupId} ${taskId} ${title}`);
  }

  function handleDragOver(e) {
    e.preventDefault();
    return false;
  }

  function handleDragEnter(groupId) {
    setGroupEnteredId(groupId);
  }

  function handleDragLeave() {
    // setGroupEnteredId("");
  }

  function handleDrop(e) {
    e.stopPropagation();
    const data = e.dataTransfer.getData("text");
    const droppedGrpId = data.split(" ")[0];
    const droppedTaskId = data.split(" ")[1];
    const droppedTitle = data.slice(
      droppedGrpId.length + droppedTaskId.length + 2
    );

    if (groupEnteredId) {
      if (groupEnteredId !== droppedGrpId) {
        setPage((prev) => {
          return {
            ...prev,
            groups: prev.groups.map((group) => {
              if (group.groupId === droppedGrpId) {
                return {
                  ...group,
                  tasks: group.tasks.filter(
                    (task) => task.taskId !== droppedTaskId
                  ),
                };
              }
              if (group.groupId === groupEnteredId) {
                return {
                  ...group,
                  tasks: [
                    ...group.tasks,
                    { taskId: droppedTaskId, title: droppedTitle },
                  ],
                };
              }
              return group;
            }),
          };
        });
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        page,
        handleIntroChange,
        handleTaskTitleChange,
        handleAddTask,
        handleDragStart,
        handleDragOver,
        handleDragEnter,
        handleDragLeave,
        handleDrop,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
