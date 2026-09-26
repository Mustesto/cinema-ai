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
    <div className="app">
      <Sidebar onNewProject={() => setShowForm(true)} />

      <main className="main">
        <h1>Mes projets</h1>

        {projects.length === 0 ? (
          <p>Aucun projet pour le moment.</p>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.id}>
                <h3>🎬 {project.name}</h3>
                <p>0 épisode</p>
                <button className="open-button">
                  Ouvrir
                </button>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="form-container">
            <h2>Nouveau projet</h2>

            <input
              className="project-input"
              type="text"
              placeholder="Nom du projet"
              value={projectName}
              onChange={(event) =>
                setProjectName(event.target.value)
              }
            />

            <div className="form-actions">
              <button onClick={() => setShowForm(false)}>
                Annuler
              </button>

              <button onClick={createProject}>
                Créer
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Projects;
