import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  function createProject() {
    const name = projectName.trim();

    if (!name) return;

    const newProject = {
      id: Date.now(),
      name,
    };

    setProjects([...projects, newProject]);
    setProjectName("");
    setShowForm(false);
  }

  return (
    <div>
      <Sidebar onNewProject={() => setShowForm(true)} />

      <main>
        <h1>Mes projets</h1>

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
      </main>
    </div>
  );
}

export default Projects;
