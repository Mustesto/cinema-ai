import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Libraries from "../components/Libraries.jsx";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [showLibraries, setShowLibraries] = useState(false);

  const [showEpisodeForm, setShowEpisodeForm] = useState(false);
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [episodeDescription, setEpisodeDescription] =
    useState("");

  function createProject() {
    const name = projectName.trim();

    if (!name) return;

    const newProject = {
      id: Date.now(),
      name,

      characters: [],
      locations: [],
      images: [],
      movements: [],

      episodes: [],
    };

    setProjects((previous) => [
      ...previous,
      newProject,
    ]);

    setProjectName("");
    setShowProjectForm(false);
  }

  function openProject(project) {
    setSelectedProject(project);
    setShowLibraries(false);
  }

  function updateProject(updatedProject) {
    setProjects((previousProjects) =>
      previousProjects.map((project) =>
        project.id === updatedProject.id
          ? updatedProject
          : project
      )
    );

    setSelectedProject(updatedProject);
  }

  function createEpisode() {
    const title = episodeTitle.trim();

    if (!title || !selectedProject) return;

    const newEpisode = {
      id: Date.now(),
      title,
      description: episodeDescription.trim(),
      scenes: [],
    };

    const updatedProject = {
      ...selectedProject,

      episodes: [
        ...selectedProject.episodes,
        newEpisode,
      ],
    };

    updateProject(updatedProject);

    setEpisodeTitle("");
    setEpisodeDescription("");
    setShowEpisodeForm(false);
  }

  /*
   * ============================
   * BIBLIOTHÈQUES
   * ============================
   */

  if (selectedProject && showLibraries) {
    return (
      <div className="app">

        <aside className="sidebar">

          <h2>🎬 Cinema AI</h2>

          <button
            onClick={() =>
              setShowLibraries(false)
            }
          >
            ← Retour au projet
          </button>

          <nav className="sidebar-nav">

            <p>📖 Histoire</p>

            <p>📚 Bibliothèques</p>

            <p>🎬 Épisodes</p>

            <p>🎥 Vidéos</p>

          </nav>

        </aside>

        <main className="main">

          <h1>
            📚 Bibliothèques
          </h1>

          <p>
            Projet : {selectedProject.name}
          </p>

          <Libraries
            project={selectedProject}
            onUpdateProject={updateProject}
          />

        </main>

      </div>
    );
  }

  /*
   * ============================
   * PROJET OUVERT
   * ============================
   */

  if (selectedProject) {
    return (
      <div className="app">

        <aside className="sidebar">

          <h2>🎬 Cinema AI</h2>

          <button
            onClick={() =>
              setSelectedProject(null)
            }
          >
            ← Mes projets
          </button>

          <nav className="sidebar-nav">

            <p>📖 Histoire</p>

            <button
              onClick={() =>
                setShowLibraries(true)
              }
            >
              📚 Bibliothèques
            </button>

            <p>🎬 Épisodes</p>

            <p>🎥 Vidéos</p>

          </nav>

        </aside>

        <main className="main">

          <h1>
            🎬 {selectedProject.name}
          </h1>

          <button
            onClick={() =>
              setShowLibraries(true)
            }
          >
            📚 Ouvrir les bibliothèques
          </button>

          <hr />

          <h2>
            📚 Bibliothèques
          </h2>

          <div className="project-grid">

            <div className="project-card">

              <h3>🎭 Personnages</h3>

              <p>
                {selectedProject.characters.length}{" "}
                personnage(s)
              </p>

              <button
                onClick={() =>
                  setShowLibraries(true)
                }
              >
                Ouvrir
              </button>

            </div>

            <div className="project-card">

              <h3>🌍 Lieux</h3>

              <p>
                {selectedProject.locations.length}{" "}
                lieu(x)
              </p>

              <button
                onClick={() =>
                  setShowLibraries(true)
                }
              >
                Ouvrir
              </button>

            </div>

            <div className="project-card">

              <h3>🖼️ Images</h3>

              <p>
                {selectedProject.images.length}{" "}
                image(s)
              </p>

              <button
                onClick={() =>
                  setShowLibraries(true)
                }
              >
                Ouvrir
              </button>

            </div>

            <div className="project-card">

              <h3>🎞️ Mouvements</h3>

              <p>
                {selectedProject.movements.length}{" "}
                mouvement(s)
              </p>

              <button
                onClick={() =>
                  setShowLibraries(true)
                }
              >
                Ouvrir
              </button>

            </div>

          </div>

          <hr />

          <h2>
            🎬 Épisodes
          </h2>

          {selectedProject.episodes.length === 0 ? (

            <p>
              Aucun épisode pour le moment.
            </p>

          ) : (

            <div className="project-grid">

              {selectedProject.episodes.map(
                (episode, index) => (

                  <div
                    className="project-card"
                    key={episode.id}
                  >

                    <h3>
                      Épisode {index + 1} —{" "}
                      {episode.title}
                    </h3>

                    <p>
                      {episode.description ||
                        "Aucune description."}
                    </p>

                    <p>
                      🎬 {episode.scenes.length} scène(s)
                    </p>

                  </div>

                )
              )}

            </div>

          )}

          <button
            onClick={() =>
              setShowEpisodeForm(true)
            }
          >
            + Nouvel épisode
          </button>

          {showEpisodeForm && (

            <div className="form-container">

              <h2>
                Nouvel épisode
              </h2>

              <input
                className="project-input"
                type="text"
                placeholder="Titre de l'épisode"
                value={episodeTitle}
                onChange={(event) =>
                  setEpisodeTitle(
                    event.target.value
                  )
                }
              />

              <textarea
                className="project-input"
                placeholder="Description de l'épisode"
                value={episodeDescription}
                onChange={(event) =>
                  setEpisodeDescription(
                    event.target.value
                  )
                }
                rows="5"
              />

              <div className="form-actions">

                <button
                  onClick={() =>
                    setShowEpisodeForm(false)
                  }
                >
                  Annuler
                </button>

                <button
                  onClick={createEpisode}
                >
                  Créer l'épisode
                </button>

              </div>

            </div>

          )}

        </main>

      </div>
    );
  }

  /*
   * ============================
   * LISTE DES PROJETS
   * ============================
   */

  return (
    <div className="app">

      <Sidebar
        onNewProject={() =>
          setShowProjectForm(true)
        }
      />

      <main className="main">

        <h1>
          🎬 Cinema AI
        </h1>

        <h2>
          Mes projets
        </h2>

        {projects.length === 0 ? (

          <p>
            Aucun projet pour le moment.
          </p>

        ) : (

          <div className="project-grid">

            {projects.map((project) => (

              <div
                className="project-card"
                key={project.id}
              >

                <h3>
                  🎬 {project.name}
                </h3>

                <p>
                  🎭 {project.characters.length} personnage(s)
                </p>

                <p>
                  🌍 {project.locations.length} lieu(x)
                </p>

                <p>
                  🖼️ {project.images.length} image(s)
                </p>

                <p>
                  🎞️ {project.movements.length} mouvement(s)
                </p>

                <p>
                  🎬 {project.episodes.length} épisode(s)
                </p>

                <button
                  className="open-button"
                  onClick={() =>
                    openProject(project)
                  }
                >
                  Ouvrir
                </button>

              </div>

            ))}

          </div>

        )}

        {showProjectForm && (

          <div className="form-container">

            <h2>
              Nouveau projet
            </h2>

            <input
              className="project-input"
              type="text"
              placeholder="Nom du projet"
              value={projectName}
              onChange={(event) =>
                setProjectName(
                  event.target.value
                )
              }
            />

            <div className="form-actions">

              <button
                onClick={() =>
                  setShowProjectForm(false)
                }
              >
                Annuler
              </button>

              <button
                onClick={createProject}
              >
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
