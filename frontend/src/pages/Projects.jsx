```jsx
import { useState } from "react";
import Libraries from "../components/Libraries.jsx";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState("project");

  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const [episodeTitle, setEpisodeTitle] = useState("");
  const [episodeDescription, setEpisodeDescription] = useState("");
  const [showEpisodeForm, setShowEpisodeForm] = useState(false);

  const [showSceneForm, setShowSceneForm] = useState(false);
  const [editingScene, setEditingScene] = useState(null);

  const [sceneTitle, setSceneTitle] = useState("");
  const [sceneDescription, setSceneDescription] = useState("");
  const [sceneAction, setSceneAction] = useState("");
  const [sceneDialogue, setSceneDialogue] = useState("");
  const [sceneStyle, setSceneStyle] = useState("");
  const [sceneStyleImages, setSceneStyleImages] = useState([]);
  const [sceneDuration, setSceneDuration] = useState("5");

  const [selectedCharacterIds, setSelectedCharacterIds] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [selectedMovementIds, setSelectedMovementIds] = useState([]);

  /*
   * ==========================
   * PROJETS
   * ==========================
   */

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
    setSelectedEpisode(null);
    setActiveSection("project");
  }

  function returnToProjects() {
    setSelectedProject(null);
    setSelectedEpisode(null);
    setActiveSection("project");
  }

  function updateProject(updatedProject) {
    setProjects((previous) =>
      previous.map((project) =>
        project.id === updatedProject.id
          ? updatedProject
          : project
      )
    );

    setSelectedProject(updatedProject);

    if (selectedEpisode) {
      const updatedEpisode =
        updatedProject.episodes.find(
          (episode) =>
            episode.id === selectedEpisode.id
        );

      if (updatedEpisode) {
        setSelectedEpisode(updatedEpisode);
      }
    }
  }

  /*
   * ==========================
   * NAVIGATION
   * ==========================
   */

  function goToSection(section) {
    setActiveSection(section);

    if (section !== "episode") {
      setSelectedEpisode(null);
    }
  }

  /*
   * ==========================
   * ÉPISODES
   * ==========================
   */

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

  function openEpisode(episode) {
    setSelectedEpisode(episode);
    setActiveSection("episode");
  }

  /*
   * ==========================
   * SCÈNES
   * ==========================
   */

  function resetSceneForm() {
    setSceneTitle("");
    setSceneDescription("");
    setSceneAction("");
    setSceneDialogue("");
    setSceneStyle("");
    setSceneStyleImages([]);
    setSceneDuration("5");

    setSelectedCharacterIds([]);
    setSelectedLocationId("");
    setSelectedMovementIds([]);

    setEditingScene(null);
    setShowSceneForm(false);
  }

  function openCreateScene() {
    resetSceneForm();
    setShowSceneForm(true);
  }

  function openEditScene(scene) {
    setEditingScene(scene);

    setSceneTitle(scene.title || "");
    setSceneDescription(scene.description || "");
    setSceneAction(scene.action || "");
    setSceneDialogue(scene.dialogue || "");

    setSceneStyle(scene.style?.text || "");

    setSceneStyleImages(
      scene.style?.images || []
    );

    setSceneDuration(scene.duration || "5");

    setSelectedCharacterIds(
      scene.characterIds || []
    );

    setSelectedLocationId(
      scene.locationId !== undefined &&
      scene.locationId !== null
        ? String(scene.locationId)
        : ""
    );

    setSelectedMovementIds(
      scene.movementIds || []
    );

    setShowSceneForm(true);
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

  function toggleMovement(movementId) {
    setSelectedMovementIds((previous) => {
      const exists = previous.some(
        (id) =>
          String(id) === String(movementId)
      );

      if (exists) {
        return previous.filter(
          (id) =>
            String(id) !== String(movementId)
        );
      }

      return [...previous, movementId];
    });
  }

  function handleStyleImages(event) {
    const files = Array.from(
      event.target.files || []
    );

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setSceneStyleImages((previous) => [
      ...previous,
      ...newImages,
    ]);
  }

  function saveScene() {
    const title = sceneTitle.trim();

    if (
      !title ||
      !selectedProject ||
      !selectedEpisode
    ) {
      return;
    }

    const newScene = {
      id: editingScene
        ? editingScene.id
        : Date.now(),

      title,

      description:
        sceneDescription.trim(),

      action:
        sceneAction.trim(),

      dialogue:
        sceneDialogue.trim(),

      duration:
        sceneDuration,

      characterIds:
        selectedCharacterIds,

      /*
       * Le lieu est sauvegardé comme string.
       * Cela évite le problème de comparaison
       * string / number du select HTML.
       */
      locationId:
        selectedLocationId
          ? String(selectedLocationId)
          : "",

      movementIds:
        selectedMovementIds,

      style: {
        text: sceneStyle.trim(),
        images: sceneStyleImages,
      },
    };

    const updatedEpisode = {
      ...selectedEpisode,

      scenes: editingScene
        ? selectedEpisode.scenes.map(
            (scene) =>
              scene.id === editingScene.id
                ? newScene
                : scene
          )
        : [
            ...selectedEpisode.scenes,
            newScene,
          ],
    };

    const updatedProject = {
      ...selectedProject,

      episodes:
        selectedProject.episodes.map(
          (episode) =>
            episode.id === updatedEpisode.id
              ? updatedEpisode
              : episode
        ),
    };

    updateProject(updatedProject);

    setSelectedEpisode(updatedEpisode);

    resetSceneForm();
  }

  function deleteScene(sceneId) {
    if (!selectedEpisode) return;

    const confirmed = window.confirm(
      "Supprimer cette scène ?"
    );

    if (!confirmed) return;

    const updatedEpisode = {
      ...selectedEpisode,

      scenes:
        selectedEpisode.scenes.filter(
          (scene) =>
            scene.id !== sceneId
        ),
    };

    const updatedProject = {
      ...selectedProject,

      episodes:
        selectedProject.episodes.map(
          (episode) =>
            episode.id === updatedEpisode.id
              ? updatedEpisode
              : episode
        ),
    };

    updateProject(updatedProject);

    setSelectedEpisode(updatedEpisode);
  }

  /*
   * ==========================
   * MENU GAUCHE
   * ==========================
   */

  function SidebarMenu() {
    return (
      <aside className="sidebar">

        <h2>🎬 Cinema AI</h2>

        <button
          onClick={returnToProjects}
        >
          📁 Mes projets
        </button>

        {selectedProject && (
          <>
            <hr />

            <h3>
              🎬 {selectedProject.name}
            </h3>

            <button
              onClick={() =>
                goToSection("project")
              }
            >
              🏠 Projet
            </button>

            <button
              onClick={() =>
                goToSection("story")
              }
            >
              📖 Histoire
            </button>

            <button
              onClick={() =>
                goToSection("libraries")
              }
            >
              📚 Bibliothèques
            </button>

            <button
              onClick={() =>
                goToSection("episodes")
              }
            >
              🎬 Épisodes
            </button>

            <button
              onClick={() =>
                goToSection("videos")
              }
            >
              🎥 Vidéos
            </button>
          </>
        )}

        <hr />

        <h3>
          Mes projets
        </h3>

        {projects.length === 0 ? (
          <p>
            Aucun projet
          </p>
        ) : (
          projects.map((project) => (
            <button
              key={project.id}
              onClick={() =>
                openProject(project)
              }
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                marginBottom: "6px",
              }}
            >
              🎬 {project.name}
            </button>
          ))
        )}

        <button
          onClick={() =>
            setShowProjectForm(true)
          }
        >
          + Nouveau projet
        </button>

      </aside>
    );
  }

  /*
   * ==========================
   * BIBLIOTHÈQUES
   * ==========================
   */

  if (
    selectedProject &&
    activeSection === "libraries"
  ) {
    return (
      <div className="app">

        <SidebarMenu />

        <main className="main">

          <button
            onClick={() =>
              goToSection("project")
            }
          >
            ← Retour au projet
          </button>

          <h1>
            📚 Bibliothèques
          </h1>

          <Libraries
            project={selectedProject}
            onUpdateProject={updateProject}
          />

        </main>

      </div>
    );
  }

  /*
   * ==========================
   * LISTE DES ÉPISODES
   * ==========================
   */

  if (
    selectedProject &&
    activeSection === "episodes"
  ) {
    return (
      <div className="app">

        <SidebarMenu />

        <main className="main">

          <button
            onClick={() =>
              goToSection("project")
            }
          >
            ← Retour au projet
          </button>

          <h1>
            🎬 Épisodes
          </h1>

          <p>
            {selectedProject.name}
          </p>

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
                      🎬 Épisode {index + 1}
                    </h3>

                    <h4>
                      {episode.title}
                    </h4>

                    <p>
                      {episode.description ||
                        "Aucune description."}
                    </p>

                    <p>
                      🎬{" "}
                      {episode.scenes.length} scène(s)
                    </p>

                    <button
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

              <h2>
                Nouvel épisode
              </h2>

              <input
                className="project-input"
                type="text"
                placeholder="Titre"
                value={episodeTitle}
                onChange={(event) =>
                  setEpisodeTitle(
                    event.target.value
                  )
                }
              />

              <textarea
                className="project-input"
                placeholder="Description"
                value={episodeDescription}
                onChange={(event) =>
                  setEpisodeDescription(
                    event.target.value
                  )
                }
                rows="4"
              />

              <div
                className="form-actions"
              >

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
                  Créer
                </button>

              </div>

            </div>
          )}

        </main>

      </div>
    );
  }

  /*
   * ==========================
   * ÉPISODE / SCÈNES
   * ==========================
   */

  if (
    selectedProject &&
    activeSection === "episode" &&
    selectedEpisode
  ) {
    return (
      <div className="app">

        <SidebarMenu />

        <main className="main">

          <button
            onClick={() =>
              goToSection("episodes")
            }
          >
            ← Retour aux épisodes
          </button>

          <h1>
            🎬 {selectedEpisode.title}
          </h1>

          <p>
            {selectedEpisode.description ||
              "Aucune description."}
          </p>

          <hr />

          <h2>
            🎬 Scènes
          </h2>

          {selectedEpisode.scenes.length ===
          0 ? (
            <p>
              Aucune scène pour le moment.
            </p>
          ) : (
            <div className="project-grid">

              {selectedEpisode.scenes.map(
                (scene, index) => {

                  const characters =
                    selectedProject.characters.filter(
                      (character) =>
                        scene.characterIds?.some(
                          (id) =>
                            String(id) ===
                            String(character.id)
                        )
                    );

                  const location =
                    selectedProject.locations.find(
                      (item) =>
                        String(item.id) ===
                        String(
                          scene.locationId
                        )
                    );

                  const movements =
                    selectedProject.movements.filter(
                      (movement) =>
                        scene.movementIds?.some(
                          (id) =>
                            String(id) ===
                            String(movement.id)
                        )
                    );

                  return (
                    <div
                      className="project-card"
                      key={scene.id}
                    >

                      <h3>
                        🎬 Scène {index + 1}
                      </h3>

                      <h4>
                        {scene.title}
                      </h4>

                      <p>
                        {scene.description ||
                          "Aucune description."}
                      </p>

                      <p>
                        🎭{" "}
                        {characters.length} personnage(s)
                      </p>

                      <p>
                        🌍{" "}
                        {location
                          ? location.name
                          : "Aucun lieu"}
                      </p>

                      <p>
                        🎞️{" "}
                        {movements.length} mouvement(s)
                      </p>

                      <p>
                        ⏱️ {scene.duration} secondes
                      </p>

                      <button
                        onClick={() =>
                          openEditScene(scene)
                        }
                      >
                        ✏️ Modifier
                      </button>

                      <button
                        onClick={() =>
                          deleteScene(
                            scene.id
                          )
                        }
                      >
                        🗑️ Supprimer
                      </button>

                    </div>
                  );
                }
              )}

            </div>
          )}

          <button
            onClick={openCreateScene}
          >
            + Nouvelle scène
          </button>

          {showSceneForm && (
            <div className="form-container">

              <h2>
                {editingScene
                  ? "✏️ Modifier la scène"
                  : "🎬 Nouvelle scène"}
              </h2>

              <input
                className="project-input"
                type="text"
                placeholder="Titre de la scène"
                value={sceneTitle}
                onChange={(event) =>
                  setSceneTitle(
                    event.target.value
                  )
                }
              />

              <textarea
                className="project-input"
                placeholder="Description de la scène"
                value={sceneDescription}
                onChange={(event) =>
                  setSceneDescription(
                    event.target.value
                  )
                }
                rows="4"
              />

              <hr />

              <h3>
                🎭 Personnages
              </h3>

              {selectedProject.characters.length ===
              0 ? (
                <p>
                  Aucun personnage.
                  Ajoute-en dans les
                  bibliothèques.
                </p>
              ) : (
                selectedProject.characters.map(
                  (character) => (
                    <label
                      key={character.id}
                      style={{
                        display: "block",
                        margin: "8px 0",
                      }}
                    >

                      <input
                        type="checkbox"
                        checked={selectedCharacterIds.some(
                          (id) =>
                            String(id) ===
                            String(
                              character.id
                            )
                        )}
                        onChange={() =>
                          toggleCharacter(
                            character.id
                          )
                        }
                      />

                      {" "}
                      🎭 {character.name}

                    </label>
                  )
                )
              )}

              <h3>
                🌍 Lieu
              </h3>

              {selectedProject.locations.length ===
              0 ? (
                <p>
                  Aucun lieu.
                  Ajoute-en dans les
                  bibliothèques.
                </p>
              ) : (
                <select
                  className="project-input"
                  value={selectedLocationId}
                  onChange={(event) =>
                    setSelectedLocationId(
                      event.target.value
                    )
                  }
                >

                  <option value="">
                    Aucun lieu
                  </option>

                  {selectedProject.locations.map(
                    (location) => (
                      <option
                        key={location.id}
                        value={String(
                          location.id
                        )}
                      >
                        🌍 {location.name}
                      </option>
                    )
                  )}

                </select>
              )}

              <h3>
                🎞️ Mouvements
              </h3>

              {selectedProject.movements.length ===
              0 ? (
                <p>
                  Aucun mouvement.
                  Ajoute-en dans les
                  bibliothèques.
                </p>
              ) : (
                selectedProject.movements.map(
                  (movement) => (
                    <label
                      key={movement.id}
                      style={{
                        display: "block",
                        margin: "8px 0",
                      }}
                    >

                      <input
                        type="checkbox"
                        checked={selectedMovementIds.some(
                          (id) =>
                            String(id) ===
                            String(
                              movement.id
                            )
                        )}
                        onChange={() =>
                          toggleMovement(
                            movement.id
                          )
                        }
                      />

                      {" "}
                      🎞️ {movement.name}

                    </label>
                  )
                )
              )}

              <hr />

              <h3>
                🎬 Action / mise en scène
              </h3>

              <textarea
                className="project-input"
                placeholder="Décrire l'action..."
                value={sceneAction}
                onChange={(event) =>
                  setSceneAction(
                    event.target.value
                  )
                }
                rows="5"
              />

              <h3>
                💬 Dialogues
              </h3>

              <textarea
                className="project-input"
                placeholder="Dialogues..."
                value={sceneDialogue}
                onChange={(event) =>
                  setSceneDialogue(
                    event.target.value
                  )
                }
                rows="5"
              />

              <h3>
                🎨 Style visuel
              </h3>

              <textarea
                className="project-input"
                placeholder="Décrire le style visuel..."
                value={sceneStyle}
                onChange={(event) =>
                  setSceneStyle(
                    event.target.value
                  )
                }
                rows="5"
              />

              <p>
                🖼️ Images de référence
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleStyleImages}
              />

              <h3>
                ⏱️ Durée
              </h3>

              <input
                className="project-input"
                type="number"
                min="1"
                value={sceneDuration}
                onChange={(event) =>
                  setSceneDuration(
                    event.target.value
                  )
                }
              />

              <div
                className="form-actions"
              >

                <button
                  onClick={resetSceneForm}
                >
                  Annuler
                </button>

                <button
                  onClick={saveScene}
                >
                  {editingScene
                    ? "Enregistrer"
                    : "Créer la scène"}
                </button>

              </div>

            </div>
          )}

        </main>

      </div>
    );
  }

  /*
   * ==========================
   * PROJET OUVERT
   * ==========================
   */

  if (
    selectedProject &&
    activeSection === "project"
  ) {
    return (
      <div className="app">

        <SidebarMenu />

        <main className="main">

          <button
            onClick={returnToProjects}
          >
            ← Retour à Mes projets
          </button>

          <h1>
            🎬 {selectedProject.name}
          </h1>

          <h2>
            📚 Bibliothèques
          </h2>

          <div className="project-grid">

            <div className="project-card">
              <h3>
                🎭 Personnages
              </h3>

              <p>
                {selectedProject.characters.length}
              </p>

              <button
                onClick={() =>
                  goToSection("libraries")
                }
              >
                Ouvrir
              </button>
            </div>

            <div className="project-card">
              <h3>
                🌍 Lieux
              </h3>

              <p>
                {selectedProject.locations.length}
              </p>

              <button
                onClick={() =>
                  goToSection("libraries")
                }
              >
                Ouvrir
              </button>
            </div>

            <div className="project-card">
              <h3>
                🖼️ Images
              </h3>

              <p>
                {selectedProject.images.length}
              </p>

              <button
                onClick={() =>
                  goToSection("libraries")
                }
              >
                Ouvrir
              </button>
            </div>

            <div className="project-card">
              <h3>
                🎞️ Mouvements
              </h3>

              <p>
                {selectedProject.movements.length}
              </p>

              <button
                onClick={() =>
                  goToSection("libraries")
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

          {selectedProject.episodes.length ===
          0 ? (
            <p>
              Aucun épisode.
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
                      🎬 Épisode {index + 1}
                    </h3>

                    <p>
                      {episode.title}
                    </p>

                    <p>
                      🎬{" "}
                      {episode.scenes.length} scène(s)
                    </p>

                    <button
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

              <h2>
                Nouvel épisode
              </h2>

              <input
                className="project-input"
                placeholder="Titre"
                value={episodeTitle}
                onChange={(event) =>
                  setEpisodeTitle(
                    event.target.value
                  )
                }
              />

              <textarea
                className="project-input"
                placeholder="Description"
                value={episodeDescription}
                onChange={(event) =>
                  setEpisodeDescription(
                    event.target.value
                  )
                }
                rows="4"
              />

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
                Créer
              </button>

            </div>
          )}

        </main>

      </div>
    );
  }

  /*
   * ==========================
   * PAGE MES PROJETS
   * ==========================
   */

  return (
    <div className="app">

      <aside className="sidebar">

        <h2>
          🎬 Cinema AI
        </h2>

        <h3>
          📁 Mes projets
        </h3>

        {projects.length === 0 ? (
          <p>
            Aucun projet
          </p>
        ) : (
          projects.map((project) => (
            <button
              key={project.id}
              onClick={() =>
                openProject(project)
              }
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                marginBottom: "6px",
              }}
            >
              🎬 {project.name}
            </button>
          ))
        )}

        <button
          onClick={() =>
            setShowProjectForm(true)
          }
        >
          + Nouveau projet
        </button>

      </aside>

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
                  🎭{" "}
                  {project.characters.length} personnage(s)
                </p>

                <p>
                  🌍{" "}
                  {project.locations.length} lieu(x)
                </p>

                <p>
                  🎞️{" "}
                  {project.movements.length} mouvement(s)
                </p>

                <p>
                  🎬{" "}
                  {project.episodes.length} épisode(s)
                </p>

                <button
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
              placeholder="Nom du projet"
              value={projectName}
              onChange={(event) =>
                setProjectName(
                  event.target.value
                )
              }
            />

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
        )}

      </main>

    </div>
  );
}

export default Projects;
```
