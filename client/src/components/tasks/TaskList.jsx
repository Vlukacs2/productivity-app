import { useTasks } from "../../context/TaskContext";
import TaskCard from "./TaskCard";
import Loader from "../common/Loader";

const TaskList = () => {
  const { filteredTasks, loading, error } = useTasks();

  if (loading && filteredTasks.length === 0) {
    return <Loader />;
  }

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            No tasks found
          </h3>

          <p className="mt-2 text-slate-500">
            Create your first productivity task above.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
