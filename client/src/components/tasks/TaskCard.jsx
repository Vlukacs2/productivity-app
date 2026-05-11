import { useState } from "react";

import { useTasks } from "../../context/TaskContext";
import Button from "../common/Button";

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.substring(0, 10) : ""
  });

  const handleChange = (event) => {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value
    });
  };

  const handleSave = async () => {
    await updateTask(task._id, editData);
    setIsEditing(false);
  };

  const statusClasses = {
    todo: "bg-blue-50 text-blue-700",
    "in-progress": "bg-yellow-50 text-yellow-700",
    done: "bg-green-50 text-green-700"
  };

  const priorityClasses = {
    low: "bg-slate-100 text-slate-700",
    medium: "bg-orange-50 text-orange-700",
    high: "bg-red-50 text-red-700"
  };

  if (isEditing) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <input
          name="title"
          value={editData.title}
          onChange={handleChange}
          className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2 font-semibold outline-none focus:border-blue-500"
        />

        <textarea
          name="description"
          value={editData.description}
          onChange={handleChange}
          rows="3"
          className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
        />

        <div className="mb-3 grid gap-3 md:grid-cols-3">
          <select
            name="status"
            value={editData.status}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            name="priority"
            value={editData.priority}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={editData.dueDate}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>

          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-900">
          {task.title}
        </h3>

        <div className="flex gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[task.status]}`}
          >
            {task.status}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityClasses[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <p className="mb-4 text-sm text-slate-600">
        {task.description || "No description"}
      </p>

      {task.dueDate && (
        <p className="mb-4 text-sm text-slate-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => setIsEditing(true)}>
          Edit
        </Button>

        <Button
          variant="success"
          onClick={() => updateTask(task._id, { status: "done" })}
        >
          Mark done
        </Button>

        <Button variant="danger" onClick={() => deleteTask(task._id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
