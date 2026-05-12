import { createContext, useContext, useState } from "react";
import taskService from "../services/taskService";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      setError(error.response?.data?.message || "Could not fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      setLoading(true);
      setError("");

      const newTask = await taskService.createTask(taskData);

      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (error) {
      setError(error.response?.data?.message || "Could not create task");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      setError("");

      const updatedTask = await taskService.updateTask(taskId, taskData);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (error) {
      setError(error.response?.data?.message || "Could not update task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setError("");

      await taskService.deleteTask(taskId);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      setError(error.response?.data?.message || "Could not delete task");
    }
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        filter,
        setFilter,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
