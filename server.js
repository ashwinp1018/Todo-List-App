import express from "express";
import path from "path";
import methodOverride from "method-override";
import { v4 as uuid } from "uuid";

const __dirname = path.resolve();
const app = express();

// View engine & static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// In-memory “database”
let tasks = [];          // { id, text, priority, completed }

//---------- ROUTES ---------------------------------
app.get("/", (req, res) => {
  const { priority } = req.query;          // filter ?priority=high|medium|low
  const shown = priority ? tasks.filter(t => t.priority === priority) : tasks;
  res.render("index", { tasks: shown, priority });
});

app.post("/tasks", (req, res) => {
  const { text = "", priority = "low" } = req.body;
  if (!text.trim()) return res.status(400).send("Task content required");
  tasks.push({ id: uuid(), text: text.trim(), priority, completed: false });
  res.redirect("/");
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { text, priority } = req.body;
  const task = tasks.find(t => t.id === id);
  if (task) { task.text = text.trim(); task.priority = priority; }
  res.redirect("/");
});

app.patch("/tasks/:id/complete", (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  res.redirect("back");
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.redirect("/");
});

app.listen(8000, () => console.log("✅  Todo app listening on :8000"));
