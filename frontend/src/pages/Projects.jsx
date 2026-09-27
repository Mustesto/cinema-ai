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

  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const [showSceneForm, setShowSceneForm] = useState(false);

  const [sceneTitle, setSceneTitle] = useState("");
  const [sceneDescription, setSceneDescription] = useState("");
  const [sceneCharacters, setSceneCharacters] = useState("");
  const [sceneLocation, setSceneLocation] = useState("");
  const [sceneDialogue, setSceneDialogue] = useState("");
  const [sceneAction, setSceneAction] = useState("");
  const [sceneCamera, setSceneCamera] = useState("");
  const [sceneStyle, setSceneStyle] = useState("");
  const [sceneDuration, setSceneDuration] = useState("2");

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

  function createScene() {
    const title = sceneTitle.trim();

    if (!title || !selectedProject || !selectedEpisode) return;

    const newScene = {
      id: Date.now(),
      title,
      description: sceneDescription.trim(),
      characters: sceneCharacters.trim(),
      location: sceneLocation.trim(),
      dialogue: sceneDialogue.trim(),
      action: sceneAction.trim(),
      camera: sceneCamera.trim(),
      style: sceneStyle.trim(),
      duration: sceneDuration,
    };

    const updatedEpisode = {
      ...selectedEpisode,
      scenes: [...selectedEpisode.scenes, newScene],
    };

    const updatedProject = {
      ...selectedProject,
      episodes: selectedProject.episodes.map((episode) =>
        episode.id === updatedEpisode.id
          ? updatedEpisode
          : episode
      ),
    };

    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );

    setSelectedProject(updatedProject);
    setSelectedEpisode(updatedEpisode);

    setSceneTitle("");
    setSceneDescription("");
    setSceneCharacters("");
    setSceneLocation("");
    setSceneDialogue("");
    setSceneAction("");
    setSceneCamera("");
    setSceneStyle("");
    setSceneDuration("2");

    setShowSceneForm(false);
  }

  function openProject(project) {
    setSelectedProject(project);
  }

  function openEpisode(episode) {
    setSelectedEpisode(episode);
  }

  /*
   * ÉCRAN DES SCÈNES
   */

  if (selectedEpisode) {
    return (
      <div className="app">
        <aside className="sidebar">
          <h2>🎬 Cinema AI</h2>

          <button onClick={() => setSelectedEpisode(null)}>
            ← Épisodes
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
          <h1>{selectedEpisode.title}</h1>

          <p>
            {selectedEpisode.description ||
              "Aucune description."}
          </p>

          <p>⏱️ {selectedEpisode.duration} minutes</p>

          <h2>🎬 Scènes</h2>

          {selectedEpisode.scenes.length === 0 ? (
            <p>Aucune scène pour le moment.</p>
          ) : (
            <div className="project-grid">
              {selectedEpisode.scenes.map((scene, index) => (
                <div className="project-card" key={scene.id}>
                  <h3>
                    Scène {index + 1} — {scene.title}
                  </h3>

                  <p>
                    <strong>📝 Description :</strong>{" "}
                    {scene.description || "Aucune"}
                  </p>

                  <p>
                    <strong>🎭 Personnages :</strong>{" "}
                    {scene.characters || "Aucun"}
                  </p>

                  <p>
                    <strong>🌍 Lieu :</strong>{" "}
                    {scene.location || "Aucun"}
                  </p>

                  <p>
                    <strong>💬 Dialogues :</strong>{" "}
                    {scene.dialogue || "Aucun"}
                  </p>

                  <p>
                    <strong>🎥 Action :</strong>{" "}
                    {scene.action || "Aucune"}
                  </p>

                  <p>
                    <strong>📷 Caméra :</strong>{" "}
                    {scene.camera || "Non définie"}
                  </p>

                  <p>
                    <strong>🎨 Style :</strong>{" "}
                    {scene.style || "Non défini"}
                  </p>

                  <p>
                    <strong>⏱️ Durée :</strong>{" "}
                    {scene.duration} minutes
                  </p>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setShowSceneForm(true)}>
            + Nouvelle scène
          </button>

          {showSceneForm && (
            <div className="form-container">
              <h2>Nouvelle scène</h2>

              <input
                className="project-input"
                type="text"
                placeholder="Titre de la scène"
                value={sceneTitle}
                onChange={(event) =>
                  setSceneTitle(event.target.value)
                }
              />

              <textarea
                className="project-input"
                placeholder="Description de la scène"
                value={sceneDescription}
                onChange={(event) =>
                  setSceneDescription(event.target.value)
                }
                rows="4"
              />

              <input
                className="project-input"
                type="text"
                placeholder="Personnages présents"
                value={sceneCharacters}
                onChange={(event) =>
                  setSceneCharacters(event.target.value)
                }
              />

              <input
                className="project-input"
                type="text"
                placeholder="Lieu"
                value={sceneLocation}
                onChange={(event) =>
                  setSceneLocation(event.target.value)
                }
              />

              <textarea
                className="project-input"
                placeholder="Dialogues"
                value={sceneDialogue}
                onChange={(event) =>
                  setSceneDialogue(event.target.value)
                }
                rows="4"
              />

              <textarea
                className="project-input"
                placeholder="Action / mise en scène"
                value={sceneAction}
                onChange={(event) =>
                  setSceneAction(event.target.value)
                }
                rows="4"
              />

              <input
                className="project-input"
                type="text"
                placeholder="Caméra (ex: plan large, gros plan...)"
                value={sceneCamera}
                onChange={(event) =>
                  setSceneCamera(event.target.value)
                }
              />

              <input
                className="project-input"
                type="text"
                placeholder="Style visuel"
                value={sceneStyle}
                onChange={(event) =>
                  setSceneStyle(event.target.value)
                }
              />

              <input
                className="project-input"
                type="number"
                min="1"
                max="30"
                placeholder="Durée en minutes"
                value={sceneDuration}
                onChange={(event) =>
                  setSceneDuration(event.target.value)
                }
              />

              <div className="form-actions">
                <button
                  onClick={() => setShowSceneForm(false)}
                >
                  Annuler
                </button>

                <button onClick={createScene}>
                  Créer la scène
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  /*
   * ÉCRAN DU PROJET
   */

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

          <h2>🎬 Épisodes</h2>

          {selectedProject.episodes.length === 0 ? (
            <p>Aucun épisode pour le moment.</p>
          ) : (
            <div className="project-grid">
              {selectedProject.episodes.map((episode, index) => (
                <div
                  className="project-card"
                  key={episode.id}
                >
                  <h3>
                    Épisode {index + 1} — {episode.title}
                  </h3>

                  <p>
                    {episode.description ||
                      "Aucune description."}
                  </p>

                  <p>
                    ⏱️ {episode.duration} minutes
                  </p>

                  <p>
                    🎬 {episode.scenes.length} scène(s)
                  </p>

                  <button
                    className="open-button"
                    onClick={() => openEpisode(episode)}
                  >
                    Ouvrir
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowEpisodeForm(true)}
          >
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
                <button
                  onClick={() =>
                    setShowEpisodeForm(false)
                  }
                >
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

  /*
   * LISTE DES PROJETS
   */

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
              <div
                className="project-card"
                key={project.id}
              >
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
              <button
                onClick={() => setShowForm(false)}
              >
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
