import { useState } from "react";

import { useTasks } from "../../context/TaskContext";
import Button from "../common/Button";
import Input from "../common/Input";

const TaskForm = () => {
  const { createTask, loading } = useTasks();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: ""
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await createTask(formData);

    setFormData({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: ""
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-2xl bg-white p-5 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-bold text-slate-900">
        Create new task
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Example: Finish project"
          required
        />

        <Input
          label="Due date"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task description..."
          rows="3"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <Button type="submit" disabled={loading} className="mt-4">
        {loading ? "Creating..." : "Add task"}
      </Button>
    </form>
  );
};

export default TaskForm;
