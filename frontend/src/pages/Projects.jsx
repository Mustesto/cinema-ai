import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

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

  if (selectedProject) {
    return (
      <div className="app">
        <aside className="sidebar">
          <h2>🎬 Cinema AI</h2>

          <button onClick={() => setSelectedProject(null)}>
            ← Mes projets
          </button>

          <nav className="sidebar-nav">
            <p>📖 Histoire</p>
            <p>🎭 Personnages</p>
            <p>🌍 Lieux</p>
            <p>🎬 Épisodes</p>
            <p>🎞️ Vidéos</p>
          </nav>
        </aside>

        <main className="main">
          <h1>{selectedProject.name}</h1>

          <p>Bienvenue dans votre projet cinématique.</p>

          <div className="project-grid">
            <div className="project-card">
              <h3>📖 Histoire</h3>
              <p>Construire l'histoire du projet.</p>
            </div>

            <div className="project-card">
              <h3>🎭 Personnages</h3>
              <p>Créer et gérer les personnages.</p>
            </div>

            <div className="project-card">
              <h3>🌍 Lieux</h3>
              <p>Créer les lieux et environnements.</p>
            </div>

            <div className="project-card">
              <h3>🎬 Épisodes</h3>
              <p>Créer les épisodes et leurs scènes.</p>
            </div>

            <div className="project-card">
              <h3>🎞️ Vidéos</h3>
              <p>Voir les vidéos générées.</p>
            </div>
          </div>
        </main>
      </div>
    );
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

                <button
                  className="open-button"
                  onClick={() => setSelectedProject(project)}
                >
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
              onChange={(event) => setProjectName(event.target.value)}
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
