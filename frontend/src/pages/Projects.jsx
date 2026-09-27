import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);

  const [showEpisodeForm, setShowEpisodeForm] = useState(false);
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [episodeDescription, setEpisodeDescription] = useState("");
  const [episodeDuration, setEpisodeDuration] = useState("30");

  function createProject() {
    const name = projectName.trim();

    if (!name) return;

    const newProject = {
      id: Date.now(),
      name,
      episodes: [],
    };

    setProjects([...projects, newProject]);
    setProjectName("");
    setShowForm(false);
  }

  function createEpisode() {
    const title = episodeTitle.trim();

    if (!title || !selectedProject) return;

    const newEpisode = {
      id: Date.now(),
      title,
      description: episodeDescription.trim(),
      duration: episodeDuration,
      scenes: [],
    };

    const updatedProject = {
      ...selectedProject,
      episodes: [...selectedProject.episodes, newEpisode],
    };

    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );

    setSelectedProject(updatedProject);

    setEpisodeTitle("");
    setEpisodeDescription("");
    setEpisodeDuration("30");
    setShowEpisodeForm(false);
  }

  function openProject(project) {
    setSelectedProject(project);
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

          <h2>🎬 Épisodes</h2>

          {selectedProject.episodes.length === 0 ? (
            <p>Aucun épisode pour le moment.</p>
          ) : (
            <div className="project-grid">
              {selectedProject.episodes.map((episode, index) => (
                <div className="project-card" key={episode.id}>
                  <h3>
                    Épisode {index + 1} — {episode.title}
                  </h3>

                  <p>{episode.description || "Aucune description."}</p>

                  <p>⏱️ {episode.duration} minutes</p>

                  <p>🎬 {episode.scenes.length} scène(s)</p>

                  <button className="open-button">
                    Ouvrir
                  </button>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setShowEpisodeForm(true)}>
            + Nouvel épisode
          </button>

          {showEpisodeForm && (
            <div className="form-container">
              <h2>Nouvel épisode</h2>

              <input
                className="project-input"
                type="text"
                placeholder="Titre de l'épisode"
                value={episodeTitle}
                onChange={(event) =>
                  setEpisodeTitle(event.target.value)
                }
              />

              <textarea
                className="project-input"
                placeholder="Description de l'épisode"
                value={episodeDescription}
                onChange={(event) =>
                  setEpisodeDescription(event.target.value)
                }
                rows="5"
              />

              <input
                className="project-input"
                type="number"
                min="1"
                max="120"
                value={episodeDuration}
                onChange={(event) =>
                  setEpisodeDuration(event.target.value)
                }
              />

              <div className="form-actions">
                <button onClick={() => setShowEpisodeForm(false)}>
                  Annuler
                </button>

                <button onClick={createEpisode}>
                  Créer l'épisode
                </button>
              </div>
            </div>
          )}

          <hr />

          <h2>📖 Histoire</h2>
          <p>Construire l'histoire du projet.</p>

          <h2>🎭 Personnages</h2>
          <p>Créer et gérer les personnages.</p>

          <h2>🌍 Lieux</h2>
          <p>Créer les lieux et environnements.</p>

          <h2>🎞️ Vidéos</h2>
          <p>Les vidéos générées apparaîtront ici.</p>
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

                <p>
                  {project.episodes.length} épisode(s)
                </p>

                <button
                  className="open-button"
                  onClick={() => openProject(project)}
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
