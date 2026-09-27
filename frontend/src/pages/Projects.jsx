import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);

  const [showCharacterForm, setShowCharacterForm] = useState(false);
  const [characterName, setCharacterName] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");
  const [characterImages, setCharacterImages] = useState([]);

  const [showEpisodeForm, setShowEpisodeForm] = useState(false);
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [episodeDescription, setEpisodeDescription] = useState("");
  const [episodeDuration, setEpisodeDuration] = useState("30");

  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const [showSceneForm, setShowSceneForm] = useState(false);
  const [sceneTitle, setSceneTitle] = useState("");
  const [sceneDescription, setSceneDescription] = useState("");
  const [sceneDuration, setSceneDuration] = useState("2");
  const [sceneAction, setSceneAction] = useState("");
  const [sceneDialogue, setSceneDialogue] = useState("");
  const [sceneStyle, setSceneStyle] = useState("");
  const [sceneStyleImages, setSceneStyleImages] = useState([]);

  const [selectedCharacterIds, setSelectedCharacterIds] = useState([]);

  function createProject() {
    const name = projectName.trim();

    if (!name) return;

    const newProject = {
      id: Date.now(),
      name,
      characters: [],
      episodes: [],
    };

    setProjects([...projects, newProject]);
    setProjectName("");
    setShowForm(false);
  }

  function handleCharacterImages(event) {
    const files = Array.from(event.target.files || []);

    const images = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setCharacterImages((previous) => [
      ...previous,
      ...images,
    ]);
  }

  function createCharacter() {
    const name = characterName.trim();

    if (!name || !selectedProject) return;

    const newCharacter = {
      id: Date.now(),
      name,
      description: characterDescription.trim(),
      images: characterImages,
    };

    const updatedProject = {
      ...selectedProject,
      characters: [
        ...selectedProject.characters,
        newCharacter,
      ],
    };

    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id
          ? updatedProject
          : project
      )
    );

    setSelectedProject(updatedProject);

    setCharacterName("");
    setCharacterDescription("");
    setCharacterImages([]);
    setShowCharacterForm(false);
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
      episodes: [
        ...selectedProject.episodes,
        newEpisode,
      ],
    };

    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id
          ? updatedProject
          : project
      )
    );

    setSelectedProject(updatedProject);

    setEpisodeTitle("");
    setEpisodeDescription("");
    setEpisodeDuration("30");
    setShowEpisodeForm(false);
  }

  function toggleCharacter(characterId) {
    setSelectedCharacterIds((previous) => {
      if (previous.includes(characterId)) {
        return previous.filter(
          (id) => id !== characterId
        );
      }

      return [...previous, characterId];
    });
  }

  function handleStyleImages(event) {
    const files = Array.from(event.target.files || []);

    const images = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setSceneStyleImages((previous) => [
      ...previous,
      ...images,
    ]);
  }

  function createScene() {
    const title = sceneTitle.trim();

    if (
      !title ||
      !selectedProject ||
      !selectedEpisode
    ) {
      return;
    }

    const selectedCharacters =
      selectedProject.characters.filter((character) =>
        selectedCharacterIds.includes(character.id)
      );

    const newScene = {
      id: Date.now(),
      title,
      description: sceneDescription.trim(),
      duration: sceneDuration,
      action: sceneAction.trim(),
      dialogue: sceneDialogue.trim(),
      style: sceneStyle.trim(),
      styleImages: sceneStyleImages,
      characters: selectedCharacters,
    };

    const updatedEpisode = {
      ...selectedEpisode,
      scenes: [
        ...selectedEpisode.scenes,
        newScene,
      ],
    };

    const updatedProject = {
      ...selectedProject,
      episodes: selectedProject.episodes.map(
        (episode) =>
          episode.id === updatedEpisode.id
            ? updatedEpisode
            : episode
      ),
    };

    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id
          ? updatedProject
          : project
      )
    );

    setSelectedProject(updatedProject);
    setSelectedEpisode(updatedEpisode);

    setSceneTitle("");
    setSceneDescription("");
    setSceneDuration("2");
    setSceneAction("");
    setSceneDialogue("");
    setSceneStyle("");
    setSceneStyleImages([]);
    setSelectedCharacterIds([]);

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

          <button
            onClick={() => setSelectedEpisode(null)}
          >
            ← Épisodes
          </button>

          <nav className="sidebar-nav">
            <p>📖 Histoire</p>
            <p>🎭 Personnages</p>
            <p>🌍 Lieux</p>
            <p>🖼️ Images</p>
            <p>🎞️ Mouvements</p>
            <p>🎬 Épisodes</p>
            <p>🎥 Vidéos</p>
          </nav>
        </aside>

        <main className="main">
          <h1>{selectedEpisode.title}</h1>

          <p>
            {selectedEpisode.description ||
              "Aucune description."}
          </p>

          <p>
            ⏱️ {selectedEpisode.duration} minutes
          </p>

          <h2>🎬 Scènes</h2>

          {selectedEpisode.scenes.length === 0 ? (
            <p>Aucune scène pour le moment.</p>
          ) : (
            <div className="project-grid">
              {selectedEpisode.scenes.map(
                (scene, index) => (
                  <div
                    className="project-card"
                    key={scene.id}
                  >
                    <h3>
                      Scène {index + 1} —{" "}
                      {scene.title}
                    </h3>

                    <p>
                      {scene.description ||
                        "Aucune description."}
                    </p>

                    <p>
                      🎭{" "}
                      {scene.characters.length} personnage(s)
                    </p>

                    <p>
                      🎨{" "}
                      {scene.styleImages.length} image(s)
                      de référence
                    </p>

                    <p>
                      ⏱️ {scene.duration} minutes
                    </p>
                  </div>
                )
              )}
            </div>
          )}

          <button
            onClick={() => setShowSceneForm(true)}
          >
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
                placeholder="Description"
                value={sceneDescription}
                onChange={(event) =>
                  setSceneDescription(
                    event.target.value
                  )
                }
                rows="4"
              />

              <h3>🎭 Personnages présents</h3>

              {selectedProject.characters.length ===
              0 ? (
                <p>
                  Aucun personnage créé dans ce
                  projet.
                </p>
              ) : (
                selectedProject.characters.map(
                  (character) => (
                    <label
                      key={character.id}
                      style={{
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCharacterIds.includes(
                          character.id
                        )}
                        onChange={() =>
                          toggleCharacter(
                            character.id
                          )
                        }
                      />

                      {" "}

                      {character.name}
                    </label>
                  )
                )
              )}

              <h3>🎥 Action / mise en scène</h3>

              <textarea
                className="project-input"
                placeholder="Décrire ce que font les personnages..."
                value={sceneAction}
                onChange={(event) =>
                  setSceneAction(
                    event.target.value
                  )
                }
                rows="5"
              />

              <h3>💬 Dialogues</h3>

              <textarea
                className="project-input"
                placeholder="Dialogues de la scène"
                value={sceneDialogue}
                onChange={(event) =>
                  setSceneDialogue(
                    event.target.value
                  )
                }
                rows="5"
              />

              <h3>🎨 Style visuel</h3>

              <textarea
                className="project-input"
                placeholder="Décrire le style visuel..."
                value={sceneStyle}
                onChange={(event) =>
                  setSceneStyle(
                    event.target.value
                  )
                }
                rows="4"
              />

              <p>
                Images de référence du style
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleStyleImages}
              />

              {sceneStyleImages.length > 0 && (
                <div>
                  {sceneStyleImages.map(
                    (image) => (
                      <img
                        key={image.id}
                        src={image.url}
                        alt={image.name}
                        width="120"
                        style={{
                          margin: "5px",
                        }}
                      />
                    )
                  )}
                </div>
              )}

              <h3>⏱️ Durée</h3>

              <input
                className="project-input"
                type="number"
                min="1"
                max="30"
                value={sceneDuration}
                onChange={(event) =>
                  setSceneDuration(
                    event.target.value
                  )
                }
              />

              <div className="form-actions">
                <button
                  onClick={() =>
                    setShowSceneForm(false)
                  }
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

          <button
            onClick={() =>
              setSelectedProject(null)
            }
          >
            ← Mes projets
          </button>

          <nav className="sidebar-nav">
            <p>📖 Histoire</p>
            <p>🎭 Personnages</p>
            <p>🌍 Lieux</p>
            <p>🖼️ Images</p>
            <p>🎞️ Mouvements</p>
            <p>🎬 Épisodes</p>
            <p>🎥 Vidéos</p>
          </nav>
        </aside>

        <main className="main">
          <h1>{selectedProject.name}</h1>

          <h2>🎭 Personnages</h2>

          {selectedProject.characters.length ===
          0 ? (
            <p>
              Aucun personnage pour le moment.
            </p>
          ) : (
            <div className="project-grid">
              {selectedProject.characters.map(
                (character) => (
                  <div
                    className="project-card"
                    key={character.id}
                  >
                    {character.images.length >
                      0 && (
                      <img
                        src={
                          character.images[0].url
                        }
                        alt={character.name}
                        width="180"
                      />
                    )}

                    <h3>
                      🎭 {character.name}
                    </h3>

                    <p>
                      {character.description ||
                        "Aucune description."}
                    </p>

                    <p>
                      🖼️{" "}
                      {character.images.length} image(s)
                    </p>
                  </div>
                )
              )}
            </div>
          )}

          <button
            onClick={() =>
              setShowCharacterForm(true)
            }
          >
            + Nouveau personnage
          </button>

          {showCharacterForm && (
            <div className="form-container">
              <h2>Nouveau personnage</h2>

              <input
                className="project-input"
                type="text"
                placeholder="Nom du personnage"
                value={characterName}
                onChange={(event) =>
                  setCharacterName(
                    event.target.value
                  )
                }
              />

              <textarea
                className="project-input"
                placeholder="Description du personnage"
                value={characterDescription}
                onChange={(event) =>
                  setCharacterDescription(
                    event.target.value
                  )
                }
                rows="5"
              />

              <h3>
                🖼️ Images de référence
              </h3>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={
                  handleCharacterImages
                }
              />

              {characterImages.length > 0 && (
                <div>
                  {characterImages.map(
                    (image) => (
                      <img
                        key={image.id}
                        src={image.url}
                        alt={image.name}
                        width="120"
                        style={{
                          margin: "5px",
                        }}
                      />
                    )
                  )}
                </div>
              )}

              <div className="form-actions">
                <button
                  onClick={() =>
                    setShowCharacterForm(false)
                  }
                >
                  Annuler
                </button>

                <button
                  onClick={createCharacter}
                >
                  Créer le personnage
                </button>
              </div>
            </div>
          )}

          <hr />

          <h2>🎬 Épisodes</h2>

          {selectedProject.episodes.length ===
          0 ? (
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
                      ⏱️ {episode.duration} minutes
                    </p>

                    <p>
                      🎬{" "}
                      {episode.scenes.length} scène(s)
                    </p>

                    <button
                      className="open-button"
                      onClick={() =>
                        openEpisode(
                          episode
                        )
                      }
                    >
                      Ouvrir
                    </button>
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
              <h2>Nouvel épisode</h2>

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

              <input
                className="project-input"
                type="number"
                min="1"
                max="120"
                value={episodeDuration}
                onChange={(event) =>
                  setEpisodeDuration(
                    event.target.value
                  )
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
   * LISTE DES PROJETS
   */

  return (
    <div className="app">
      <Sidebar
        onNewProject={() =>
          setShowForm(true)
        }
      />

      <main className="main">
        <h1>Mes projets</h1>

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
                  🎭{" "}
                  {project.characters.length} personnage(s)
                </p>

                <p>
                  🎬{" "}
                  {project.episodes.length} épisode(s)
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

        {showForm && (
          <div className="form-container">
            <h2>Nouveau projet</h2>

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
                  setShowForm(false)
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
