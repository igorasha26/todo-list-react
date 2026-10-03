import { createContext, useMemo } from "react";
import useTasks from "./useTasks.js";
import useIncompleteTasksScroll from "./useIncompleteTasksScroll.js";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
  const { children } = props;

  const {
    tasks,
    filteredTask,
    deleteTasks,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
      disappearingTaskId,
      appearingTaskId,
  } = useTasks();

  const {
      firstIncompleteTaskRef,
      firstIncompleteTaskId
  } = useIncompleteTasksScroll(tasks);

  const value = useMemo(() => ({
      tasks,
      filteredTask,
      deleteTasks,
      deleteAllTasks,
      toggleTaskComplete,
      newTaskTitle,
      setNewTaskTitle,
      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
      disappearingTaskId,
      appearingTaskId,
      firstIncompleteTaskRef,
      firstIncompleteTaskId
  }), [
      tasks,
      filteredTask,
      deleteTasks,
      deleteAllTasks,
      toggleTaskComplete,
      newTaskTitle,
      setNewTaskTitle,
      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
      disappearingTaskId,
      appearingTaskId,
      firstIncompleteTaskRef,
      firstIncompleteTaskId
  ])

  return (
    <TasksContext.Provider
      value={value}
    >
      {children}
    </TasksContext.Provider>
  );
};
