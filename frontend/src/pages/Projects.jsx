import { useState } from "react";

function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  function createProject() {
    const name = projectName.trim();

    if (!name) return;

    const newProject = {
      id: Date.now(),
      name: name,
    };

    setProjects([...projects, newProject]);
    setProjectName("");
    setShowForm(false);
  }

  return (
    <div>
      <h1>Cinema AI</h1>

      <h2>Mes projets</h2>

      {projects.length === 0 ? (
        <p>Aucun projet pour le moment.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id}>
            <h3>🎬 {project.name}</h3>
            <p>0 épisode</p>
            <button>Ouvrir</button>
          </div>
        ))
      )}

      <button onClick={() => setShowForm(true)}>
        + Nouveau projet
      </button>

      {showForm && (
        <div>
          <h2>Nouveau projet</h2>

          <input
            type="text"
            placeholder="Nom du projet"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
          />

          <button onClick={() => setShowForm(false)}>
            Annuler
          </button>

          <button onClick={createProject}>
            Créer
          </button>
        </div>
      )}
    </div>
  );
}

export default Projects;
