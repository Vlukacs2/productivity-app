import { useEffect } from "react";

import Layout from "../components/layout/Layout";
import TaskForm from "../components/tasks/TaskForm";
import TaskFilter from "../components/tasks/TaskFilter";
import TaskList from "../components/tasks/TaskList";
import { useTasks } from "../context/TaskContext";

const Dashboard = () => {
  const { fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Layout>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h2>

          <p className="mt-1 text-slate-500">
            Manage your tasks and stay productive.
          </p>
        </div>

        <TaskFilter />
      </div>

      <TaskForm />

      <TaskList />
    </Layout>
  );
};

export default Dashboard;
