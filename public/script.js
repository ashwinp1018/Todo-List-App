
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("taskInput");
  document.getElementById("createForm").addEventListener("submit", e => {
    if (!input.value.trim()) {
      e.preventDefault();
      alert("Please enter a task first!");
    }
  });

  document.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.edit;
      document.getElementById(`form-${id}`).style.display = "flex";
    });
  });

  document.querySelectorAll("[data-cancel]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.cancel;
      document.getElementById(`form-${id}`).style.display = "none";
    });
  });
});
