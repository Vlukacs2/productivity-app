import { useTasks } from "../../context/TaskContext";

const Sidebar = () => {
  const { tasks } = useTasks();

  const todoCount = tasks.filter((task) => task.status === "todo").length;
  const inProgressCount = tasks.filter((task) => task.status === "in-progress").length;
  const doneCount = tasks.filter((task) => task.status === "done").length;

  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-6 md:block">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">
        Overview
      </h2>

      <div className="space-y-3">
        <div className="rounded-xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">Total tasks</p>
          <p className="text-2xl font-bold text-slate-900">{tasks.length}</p>
        </div>

        <div className="rounded-xl bg-blue-50 p-4">
          <p className="text-sm text-blue-600">To Do</p>
          <p className="text-2xl font-bold text-blue-700">{todoCount}</p>
        </div>

        <div className="rounded-xl bg-yellow-50 p-4">
          <p className="text-sm text-yellow-600">In Progress</p>
          <p className="text-2xl font-bold text-yellow-700">{inProgressCount}</p>
        </div>

        <div className="rounded-xl bg-green-50 p-4">
          <p className="text-sm text-green-600">Done</p>
          <p className="text-2xl font-bold text-green-700">{doneCount}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
