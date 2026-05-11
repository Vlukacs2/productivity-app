const db = require("../config/db");

const getTasks = (req, res) => {
  const tasks = db.prepare(`
    SELECT *
    FROM tasks
    WHERE userId = ?
    ORDER BY createdAt DESC
  `).all(req.user.id);

  res.json(tasks);
};

const createTask = (req, res) => {
  const {
    title,
    description,
    status,
    priority,
    dueDate
  } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  const result = db.prepare(`
    INSERT INTO tasks (
      title,
      description,
      status,
      priority,
      dueDate,
      userId
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    title,
    description || "",
    status || "todo",
    priority || "medium",
    dueDate || null,
    req.user.id
  );

  const task = db.prepare(`
    SELECT *
    FROM tasks
    WHERE id = ?
  `).get(result.lastInsertRowid);

  res.status(201).json(task);
};

const updateTask = (req, res) => {
  const taskId = req.params.id;

  const existingTask = db.prepare(`
    SELECT *
    FROM tasks
    WHERE id = ?
  `).get(taskId);

  if (!existingTask) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  if (existingTask.userId !== req.user.id) {
    return res.status(403).json({
      message: "Not authorized"
    });
  }

  const updatedTask = {
    title: req.body.title ?? existingTask.title,
    description:
      req.body.description ?? existingTask.description,
    status: req.body.status ?? existingTask.status,
    priority:
      req.body.priority ?? existingTask.priority,
    dueDate: req.body.dueDate ?? existingTask.dueDate
  };

  db.prepare(`
    UPDATE tasks
    SET
      title = ?,
      description = ?,
      status = ?,
      priority = ?,
      dueDate = ?
    WHERE id = ?
  `).run(
    updatedTask.title,
    updatedTask.description,
    updatedTask.status,
    updatedTask.priority,
    updatedTask.dueDate,
    taskId
  );

  const task = db.prepare(`
    SELECT *
    FROM tasks
    WHERE id = ?
  `).get(taskId);

  res.json(task);
};

const deleteTask = (req, res) => {
  const taskId = req.params.id;

  const existingTask = db.prepare(`
    SELECT *
    FROM tasks
    WHERE id = ?
  `).get(taskId);

  if (!existingTask) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  if (existingTask.userId !== req.user.id) {
    return res.status(403).json({
      message: "Not authorized"
    });
  }

  db.prepare(`
    DELETE FROM tasks
    WHERE id = ?
  `).run(taskId);

  res.json({
    message: "Task deleted"
  });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};