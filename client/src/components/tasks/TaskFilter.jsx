import { useTasks } from "../../context/TaskContext";

const TaskFilter = () => {
  const { filter, setFilter } = useTasks();

  const filters = [
    { value: "all", label: "All" },
    { value: "todo", label: "To Do" },
    { value: "in-progress", label: "In Progress" },
    { value: "done", label: "Done" }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((item) => (
        <button
          key={item.value}
          onClick={() => setFilter(item.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            filter === item.value
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
