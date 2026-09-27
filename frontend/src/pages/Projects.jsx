
import { useState } from "react";
import Libraries from "../components/Libraries.jsx";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [showProjectForm, setShowProjectForm] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [activeSection, setActiveSection] =
    useState("project");

  const [selectedEpisode, setSelectedEpisode] =
    useState(null);

  const [episodeTitle, setEpisodeTitle] =
    useState("");

  const [episodeDescription, setEpisodeDescription] =
    useState("");

  const [showEpisodeForm, setShowEpisodeForm] =
    useState(false);

  // ==========================
  // FORMULAIRE SCÈNE
  // ==========================

  const [showSceneForm, setShowSceneForm] =
    useState(false);

  const [editingScene, setEditingScene] =
    useState(null);

  const [sceneTitle, setSceneTitle] =
    useState("");

  const [sceneDescription, setSceneDescription] =
    useState("");

  const [sceneAction, setSceneAction] =
    useState("");

  const [sceneDialogue, setSceneDialogue] =
    useState("");

  const [sceneStyle, setSceneStyle] =
    useState("");

  const [sceneStyleImages, setSceneStyleImages] =
    useState([]);

  const [sceneDuration, setSceneDuration] =
    useState("5");

  const [selectedCharacterIds, setSelectedCharacterIds] =
    useState([]);

  const [selectedLocationIds, setSelectedLocationIds] =
    useState([]);

  const [sceneMovements, setSceneMovements] =
    useState([]);

  // ==========================
  // PROJETS
  // ==========================

  function createProject() {
    const name = projectName.trim();

    if (!name) return;

    const newProject = {
      id: Date.now(),
      name,
      characters: [],
      locations: [],
      images: [],
      videos: [],
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
        (updatedProject.episodes || []).find(
          (episode) =>
            episode.id === selectedEpisode.id
        );

      if (updatedEpisode) {
        setSelectedEpisode(updatedEpisode);
      }
    }
  }

  // ==========================
  // NAVIGATION
  // ==========================

  function goToSection(section) {
    setActiveSection(section);

    if (
      section !== "episode" &&
      section !== "episodes"
    ) {
      setSelectedEpisode(null);
    }
  }

  // ==========================
  // ÉPISODES
  // ==========================

  function createEpisode() {
    const title = episodeTitle.trim();

    if (!title || !selectedProject) return;

    const newEpisode = {
      id: Date.now(),
      title,
      description:
        episodeDescription.trim(),
      scenes: [],
    };

    updateProject({
      ...selectedProject,
      episodes: [
        ...(selectedProject.episodes || []),
        newEpisode,
      ],
    });

    setEpisodeTitle("");
    setEpisodeDescription("");
    setShowEpisodeForm(false);
  }

  function openEpisode(episode) {
    setSelectedEpisode(episode);
    setActiveSection("episode");
  }

  // ==========================
  // SCÈNES
  // ==========================

  function resetSceneForm() {
    setSceneTitle("");
    setSceneDescription("");
    setSceneAction("");
    setSceneDialogue("");
    setSceneStyle("");
    setSceneStyleImages([]);
    setSceneDuration("5");

    setSelectedCharacterIds([]);
    setSelectedLocationIds([]);
    setSceneMovements([]);

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
    setSceneDescription(
      scene.description || ""
    );

    setSceneAction(scene.action || "");
    setSceneDialogue(scene.dialogue || "");

    setSceneStyle(
      scene.style?.text || ""
    );

    setSceneStyleImages(
      scene.style?.images || []
    );

    setSceneDuration(
      scene.duration || "5"
    );

    setSelectedCharacterIds(
      scene.characterIds || []
    );

    if (Array.isArray(scene.locationIds)) {
      setSelectedLocationIds(
        scene.locationIds
      );
    } else if (
      scene.locationId !== undefined &&
      scene.locationId !== null
    ) {
      setSelectedLocationIds([
        scene.locationId,
      ]);
    } else {
      setSelectedLocationIds([]);
    }

    if (
      Array.isArray(scene.movementSteps)
    ) {
      setSceneMovements(
        scene.movementSteps
      );
    } else if (
      Array.isArray(scene.movementIds)
    ) {
      setSceneMovements(
        scene.movementIds.map(
          (movementId) => {
            const movement =
              (
                selectedProject?.movements ||
                []
              ).find(
                (item) =>
                  String(item.id) ===
                  String(movementId)
              );

            return {
              id: movementId,
              destination:
                movement?.destination || "",
            };
          }
        )
      );
    } else {
      setSceneMovements([]);
    }

    setShowSceneForm(true);
  }

  // ==========================
  // PERSONNAGES
  // ==========================

  function toggleCharacter(characterId) {
    setSelectedCharacterIds(
      (previous) => {
        const exists = previous.some(
          (id) =>
            String(id) ===
            String(characterId)
        );

        if (exists) {
          return previous.filter(
            (id) =>
              String(id) !==
              String(characterId)
          );
        }

        return [
          ...previous,
          characterId,
        ];
      }
    );
  }

  // ==========================
  // LIEUX
  // ==========================

  function toggleLocation(locationId) {
    setSelectedLocationIds(
      (previous) => {
        const exists = previous.some(
          (id) =>
            String(id) ===
            String(locationId)
        );

        if (exists) {
          return previous.filter(
            (id) =>
              String(id) !==
              String(locationId)
          );
        }

        return [
          ...previous,
          locationId,
        ];
      }
    );
  }

  // ==========================
  // MOUVEMENTS
  // ==========================

  function addMovementToScene(movement) {
    const alreadyAdded =
      sceneMovements.some(
        (item) =>
          String(item.id) ===
          String(movement.id)
      );

    if (alreadyAdded) return;

    setSceneMovements(
      (previous) => [
        ...previous,
        {
          id: movement.id,
          destination:
            movement.destination || "",
        },
      ]
    );
  }

  function removeMovementFromScene(index) {
    setSceneMovements(
      (previous) =>
        previous.filter(
          (_, movementIndex) =>
            movementIndex !== index
        )
    );
  }

  function updateMovementDestination(
    index,
    destination
  ) {
    setSceneMovements(
      (previous) =>
        previous.map(
          (movement, movementIndex) =>
            movementIndex === index
              ? {
                  ...movement,
                  destination,
                }
              : movement
        )
    );
  }

  function moveMovementUp(index) {
    if (index <= 0) return;

    setSceneMovements(
      (previous) => {
        const newList = [...previous];

        const temporary =
          newList[index - 1];

        newList[index - 1] =
          newList[index];

        newList[index] =
          temporary;

        return newList;
      }
    );
  }

  function moveMovementDown(index) {
    if (
      index >=
      sceneMovements.length - 1
    ) {
      return;
    }

    setSceneMovements(
      (previous) => {
        const newList = [...previous];

        const temporary =
          newList[index + 1];

        newList[index + 1] =
          newList[index];

        newList[index] =
          temporary;

        return newList;
      }
    );
  }

  // ==========================
  // IMAGES STYLE
  // ==========================

  function handleStyleImages(event) {
    const files = Array.from(
      event.target.files || []
    );

    const newImages = files.map(
      (file) => ({
        id:
          Date.now() +
          Math.random(),
        name: file.name,
        url: URL.createObjectURL(file),
      })
    );

    setSceneStyleImages(
      (previous) => [
        ...previous,
        ...newImages,
      ]
    );

    event.target.value = "";
  }

  // ==========================
  // SAUVEGARDER SCÈNE
  // ==========================

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

      // Description complète
      // de toute la scène
      action:
        sceneAction.trim(),

      dialogue:
        sceneDialogue.trim(),

      duration:
        sceneDuration,

      // Plusieurs personnages
      characterIds:
        [...selectedCharacterIds],

      // Plusieurs lieux
      locationIds:
        [...selectedLocationIds],

      // Mouvements ordonnés
      movementSteps:
        [...sceneMovements],

      movementIds:
        sceneMovements.map(
          (movement) =>
            movement.id
        ),

      style: {
        text:
          sceneStyle.trim(),

        images:
          [...sceneStyleImages],
      },
    };

    const updatedEpisode = {
      ...selectedEpisode,

      scenes: editingScene
        ? selectedEpisode.scenes.map(
            (scene) =>
              scene.id ===
              editingScene.id
                ? newScene
                : scene
          )
        : [
            ...(selectedEpisode.scenes || []),
            newScene,
          ],
    };

    const updatedProject = {
      ...selectedProject,

      episodes:
        (
          selectedProject.episodes ||
          []
        ).map(
          (episode) =>
            episode.id ===
            updatedEpisode.id
              ? updatedEpisode
              : episode
        ),
    };

    updateProject(
      updatedProject
    );

    setSelectedEpisode(
      updatedEpisode
    );

    resetSceneForm();
  }

  // ==========================
  // SUPPRIMER SCÈNE
  // ==========================

  function deleteScene(sceneId) {
    if (!selectedEpisode) return;

    if (
      !window.confirm(
        "Supprimer cette scène ?"
      )
    ) {
      return;
    }

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
            episode.id ===
            updatedEpisode.id
              ? updatedEpisode
              : episode
        ),
    };

    updateProject(
      updatedProject
    );

    setSelectedEpisode(
      updatedEpisode
    );
  }

  // ==========================
  // SIDEBAR
  // ==========================

  function SidebarMenu() {
    return (
      <aside className="sidebar">
        <h2>
          🎬 Cinema AI
        </h2>

        <button
          onClick={
            returnToProjects
          }
        >
          📁 Mes projets
        </button>

        {selectedProject && (
          <>
            <hr />

            <h3>
              🎬{" "}
              {selectedProject.name}
            </h3>

            <button
              onClick={() =>
                goToSection(
                  "project"
                )
              }
            >
              🏠 Projet
            </button>

            <button
              onClick={() =>
                goToSection(
                  "story"
                )
              }
            >
              📖 Histoire
            </button>

            <button
              onClick={() =>
                goToSection(
                  "libraries"
                )
              }
            >
              📚 Bibliothèques
            </button>

            <button
              onClick={() =>
                goToSection(
                  "episodes"
                )
              }
            >
              🎬 Épisodes
            </button>

            <button
              onClick={() =>
                goToSection(
                  "videos"
                )
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
          projects.map(
            (project) => (
              <button
                key={project.id}
                onClick={() =>
                  openProject(
                    project
                  )
                }
                style={{
                  display:
                    "block",
                  width:
                    "100%",
                  textAlign:
                    "left",
                  marginBottom:
                    "6px",
                }}
              >
                🎬{" "}
                {project.name}
              </button>
            )
          )
        )}

        <button
          onClick={() =>
            setShowProjectForm(
              true
            )
          }
        >
          + Nouveau projet
        </button>
      </aside>
    );
  }

  // ==========================
  // BIBLIOTHÈQUES
  // ==========================

  if (
    selectedProject &&
    activeSection ===
      "libraries"
  ) {
    return (
      <div className="app">
        <SidebarMenu />

        <main className="main">
          <button
            onClick={() =>
              goToSection(
                "project"
              )
            }
          >
            ← Retour au projet
          </button>

          <h1>
            📚 Bibliothèques
          </h1>

          <Libraries
            project={
              selectedProject
            }
            onUpdateProject={
              updateProject
            }
          />
        </main>
      </div>
    );
  }

  // ==========================
  // LISTE DES ÉPISODES
  // ==========================

  if (
    selectedProject &&
    activeSection ===
      "episodes"
  ) {
    return (
      <div className="app">
        <SidebarMenu />

        <main className="main">
          <button
            onClick={() =>
              goToSection(
                "project"
              )
            }
          >
            ← Retour au projet
          </button>

          <h1>
            🎬 Épisodes
          </h1>

          {(
            selectedProject.episodes ||
            []
          ).length === 0 ? (
            <p>
              Aucun épisode.
            </p>
          ) : (
            <div className="project-grid">
              {selectedProject.episodes.map(
                (
                  episode,
                  index
                ) => (
                  <div
                    className="project-card"
                    key={
                      episode.id
                    }
                  >
                    <h3>
                      🎬 Épisode{" "}
                      {index + 1}
                    </h3>

                    <h4>
                      {
                        episode.title
                      }
                    </h4>

                    <p>
                      {
                        episode.description ||
                        "Aucune description."
                      }
                    </p>

                    <p>
                      🎬{" "}
                      {
                        (
                          episode.scenes ||
                          []
                        ).length
                      }{" "}
                      scène(s)
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
              setShowEpisodeForm(
                true
              )
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
                value={
                  episodeTitle
                }
                onChange={(event) =>
                  setEpisodeTitle(
                    event.target.value
                  )
                }
              />

              <textarea
                className="project-input"
                placeholder="Description"
                value={
                  episodeDescription
                }
                onChange={(event) =>
                  setEpisodeDescription(
                    event.target.value
                  )
                }
                rows="4"
              />

              <button
                onClick={() =>
                  setShowEpisodeForm(
                    false
                  )
                }
              >
                Annuler
              </button>

              <button
                onClick={
                  createEpisode
                }
              >
                Créer
              </button>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ==========================
  // ÉPISODE / SCÈNES
  // ==========================

  if (
    selectedProject &&
    activeSection ===
      "episode" &&
    selectedEpisode
  ) {
    return (
      <div className="app">
        <SidebarMenu />

        <main className="main">
          <button
            onClick={() =>
              goToSection(
                "episodes"
              )
            }
          >
            ← Retour aux épisodes
          </button>

          <h1>
            🎬{" "}
            {
              selectedEpisode.title
            }
          </h1>

          <p>
            {
              selectedEpisode.description ||
              "Aucune description."
            }
          </p>

          <hr />

          <h2>
            🎬 Scènes
          </h2>

          {(
            selectedEpisode.scenes ||
            []
          ).length === 0 ? (
            <p>
              Aucune scène.
            </p>
          ) : (
            <div className="project-grid">
              {selectedEpisode.scenes.map(
                (
                  scene,
                  index
                ) => {
                  const characters =
                    (
                      selectedProject.characters ||
                      []
                    ).filter(
                      (character) =>
                        (
                          scene.characterIds ||
                          []
                        ).some(
                          (id) =>
                            String(
                              id
                            ) ===
                            String(
                              character.id
                            )
                        )
                    );

                  const locations =
                    (
                      selectedProject.locations ||
                      []
                    ).filter(
                      (location) =>
                        (
                          scene.locationIds ||
                          []
                        ).some(
                          (id) =>
                            String(
                              id
                            ) ===
                            String(
                              location.id
                            )
                        )
                    );

                  const movements =
                    scene.movementSteps ||
                    (
                      scene.movementIds ||
                      []
                    ).map(
                      (movementId) => {
                        const movement =
                          (
                            selectedProject.movements ||
                            []
                          ).find(
                            (item) =>
                              String(
                                item.id
                              ) ===
                              String(
                                movementId
                              )
                          );

                        return {
                          id:
                            movementId,
                          destination:
                            movement?.destination ||
                            "",
                        };
                      }
                    );

                  return (
                    <div
                      className="project-card"
                      key={
                        scene.id
                      }
                    >
                      <h3>
                        🎬 Scène{" "}
                        {index + 1}
                      </h3>

                      <h4>
                        {
                          scene.title
                        }
                      </h4>

                      <p>
                        {
                          scene.description ||
                          "Aucune description."
                        }
                      </p>

                      {/* PERSONNAGES */}

                      <hr />

                      <h4>
                        🎭 Personnages
                      </h4>

                      {characters.length ===
                      0 ? (
                        <p>
                          Aucun
                          personnage.
                        </p>
                      ) : (
                        characters.map(
                          (
                            character
                          ) => (
                            <div
                              key={
                                character.id
                              }
                              style={{
                                marginBottom:
                                  "15px",
                              }}
                            >
                              <strong>
                                🎭{" "}
                                {
                                  character.name
                                }
                              </strong>

                              {character
                                .description && (
                                <p>
                                  {
                                    character.description
                                  }
                                </p>
                              )}

                              {(
                                character.images ||
                                []
                              ).length >
                                0 && (
                                <div
                                  style={{
                                    display:
                                      "grid",
                                    gridTemplateColumns:
                                      "repeat(auto-fit, minmax(100px, 1fr))",
                                    gap:
                                      "8px",
                                    marginTop:
                                      "8px",
                                  }}
                                >
                                  {character.images.map(
                                    (
                                      image
                                    ) => (
                                      <img
                                        key={
                                          image.id
                                        }
                                        src={
                                          image.url
                                        }
                                        alt={
                                          character.name
                                        }
                                        style={{
                                          width:
                                            "100%",
                                          height:
                                            "110px",
                                          objectFit:
                                            "cover",
                                          borderRadius:
                                            "8px",
                                        }}
                                      />
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        )
                      )}

                      {/* LIEUX */}

                      <hr />

                      <h4>
                        🌍 Lieux
                      </h4>

                      {locations.length ===
                      0 ? (
                        <p>
                          Aucun lieu.
                        </p>
                      ) : (
                        locations.map(
                          (
                            location
                          ) => (
                            <div
                              key={
                                location.id
                              }
                              style={{
                                marginBottom:
                                  "15px",
                              }}
                            >
                              <strong>
                                🌍{" "}
                                {
                                  location.name
                                }
                              </strong>

                              {location
                                .description && (
                                <p>
                                  {
                                    location.description
                                  }
                                </p>
                              )}

                              {(
                                location.images ||
                                []
                              ).length >
                                0 && (
                                <div
                                  style={{
                                    display:
                                      "grid",
                                    gridTemplateColumns:
                                      "repeat(auto-fit, minmax(100px, 1fr))",
                                    gap:
                                      "8px",
                                    marginTop:
                                      "8px",
                                  }}
                                >
                                  {location.images.map(
                                    (
                                      image
                                    ) => (
                                      <img
                                        key={
                                          image.id
                                        }
                                        src={
                                          image.url
                                        }
                                        alt={
                                          location.name
                                        }
                                        style={{
                                          width:
                                            "100%",
                                          height:
                                            "110px",
                                          objectFit:
                                            "cover",
                                          borderRadius:
                                            "8px",
                                        }}
                                      />
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        )
                      )}

                      {/* ACTION */}

                      <hr />

                      <h4>
                        🎬 Action / mise
                        en scène
                      </h4>

                      <p
                        style={{
                          whiteSpace:
                            "pre-wrap",
                        }}
                      >
                        {scene.action ||
                          "Aucune action décrite."}
                      </p>

                      {/* DIALOGUES */}

                      <h4>
                        💬 Dialogues
                      </h4>

                      <p
                        style={{
                          whiteSpace:
                            "pre-wrap",
                        }}
                      >
                        {scene.dialogue ||
                          "Aucun dialogue."}
                      </p>

                      {/* MOUVEMENTS */}

                      <hr />

                      <h4>
                        🎞️ Mouvements
                      </h4>

                      {movements.length ===
                      0 ? (
                        <p>
                          Aucun mouvement.
                        </p>
                      ) : (
                        movements.map(
                          (
                            step,
                            movementIndex
                          ) => {
                            const movement =
                              (
                                selectedProject.movements ||
                                []
                              ).find(
                                (
                                  item
                                ) =>
                                  String(
                                    item.id
                                  ) ===
                                  String(
                                    step.id
                                  )
                              );

                            return (
                              <div
                                key={`${scene.id}-${movementIndex}`}
                                style={{
                                  marginBottom:
                                    "15px",
                                }}
                              >
                                <strong>
                                  {
                                    movementIndex +
                                    1
                                  }
                                  . 🎞️{" "}
                                  {
                                    movement?.name ||
                                    "Mouvement"
                                  }
                                </strong>

                                {movement
                                  ?.description && (
                                  <p>
                                    {
                                      movement.description
                                    }
                                  </p>
                                )}

                                {movement
                                  ?.previewImage
                                  ?.url && (
                                  <img
                                    src={
                                      movement
                                        .previewImage
                                        .url
                                    }
                                    alt={
                                      movement.name
                                    }
                                    style={{
                                      width:
                                        "180px",
                                      maxHeight:
                                        "120px",
                                      objectFit:
                                        "cover",
                                      borderRadius:
                                        "8px",
                                    }}
                                  />
                                )}

                                {movement
                                  ?.previewVideo
                                  ?.url && (
                                  <video
                                    controls
                                    src={
                                      movement
                                        .previewVideo
                                        .url
                                    }
                                    style={{
                                      width:
                                        "240px",
                                      maxHeight:
                                        "160px",
                                      display:
                                        "block",
                                        marginTop:
                                        "8px",
                                    }}
                                  />
                                )}

                                <p>
                                  🎯{" "}
                                  <strong>
                                    Destination :
                                  </strong>{" "}
                                  {
                                    step.destination ||
                                    movement?.destination ||
                                    "Aucune destination"
                                  }
                                </p>
                              </div>
                            );
                          }
                        )
                      )}

                      {/* STYLE */}

                      <hr />

                      <h4>
                        🎨 Style visuel
                      </h4>

                      <p
                        style={{
                          whiteSpace:
                            "pre-wrap",
                        }}
                      >
                        {scene.style
                          ?.text ||
                          "Aucun style défini."}
                      </p>

                      {(
                        scene.style
                          ?.images ||
                        []
                      ).length >
                        0 && (
                        <div
                          style={{
                            display:
                              "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(120px, 1fr))",
                            gap:
                              "8px",
                          }}
                        >
                          {scene.style.images.map(
                            (
                              image
                            ) => (
                              <img
                                key={
                                  image.id
                                }
                                src={
                                  image.url
                                }
                                alt={
                                  image.name
                                }
                                style={{
                                  width:
                                    "100%",
                                  height:
                                    "130px",
                                  objectFit:
                                    "cover",
                                  borderRadius:
                                    "8px",
                                }}
                              />
                            )
                          )}
                        </div>
                      )}

                      <p>
                        ⏱️{" "}
                        {
                          scene.duration
                        }{" "}
                        secondes
                      </p>

                      <button
                        onClick={() =>
                          openEditScene(
                            scene
                          )
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
            onClick={
              openCreateScene
            }
          >
            + Nouvelle scène
          </button>

          {/* ==========================
              FORMULAIRE SCÈNE
              ========================== */}

          {showSceneForm && (
            <div className="form-container">
              <h2>
                {editingScene
                  ? "✏️ Modifier la scène"
                  : "🎬 Nouvelle scène"}
              </h2>

              <input
                className="project-input"
                placeholder="Titre de la scène"
                value={
                  sceneTitle
                }
                onChange={(event) =>
                  setSceneTitle(
                    event.target.value
                  )
                }
              />

              <textarea
                className="project-input"
                placeholder="Description courte de la scène..."
                value={
                  sceneDescription
                }
                onChange={(event) =>
                  setSceneDescription(
                    event.target.value
                  )
                }
                rows="4"
              />

              <hr />

              {/* ==========================
                  PERSONNAGES
                  ========================== */}

              <h3>
                🎭 Personnages
              </h3>

              <p>
                Tu peux sélectionner
                plusieurs personnages.
              </p>

              {(
                selectedProject.characters ||
                []
              ).length === 0 ? (
                <p>
                  Aucun personnage dans
                  la bibliothèque.
                </p>
              ) : (
                selectedProject.characters.map(
                  (character) => {
                    const selected =
                      selectedCharacterIds.some(
                        (id) =>
                          String(
                            id
                          ) ===
                          String(
                            character.id
                          )
                      );

                    return (
                      <div
                        key={
                          character.id
                        }
                        style={{
                          border:
                            selected
                              ? "2px solid #555"
                              : "1px solid #ccc",
                          borderRadius:
                            "8px",
                          padding:
                            "10px",
                          marginBottom:
                            "10px",
                        }}
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              selected
                            }
                            onChange={() =>
                              toggleCharacter(
                                character.id
                              )
                            }
                          />

                          {" "}
                          🎭{" "}
                          {
                            character.name
                          }
                        </label>

                        {character
                          .description && (
                          <p>
                            {
                              character.description
                            }
                          </p>
                        )}

                        {(
                          character.images ||
                          []
                        ).length >
                          0 && (
                          <div
                            style={{
                              display:
                                "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit, minmax(90px, 1fr))",
                              gap:
                                "6px",
                              marginTop:
                                "8px",
                            }}
                          >
                            {character.images.map(
                              (
                                image
                              ) => (
                                <img
                                  key={
                                    image.id
                                  }
                                  src={
                                    image.url
                                  }
                                  alt={
                                    character.name
                                  }
                                  style={{
                                    width:
                                      "100%",
                                    height:
                                      "90px",
                                    objectFit:
                                      "cover",
                                    borderRadius:
                                      "6px",
                                  }}
                                />
                              )
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }
                )
              )}

              {/* ==========================
                  LIEUX
                  ========================== */}

              <h3>
                🌍 Lieux
              </h3>

              <p>
                Plusieurs lieux peuvent
                être présents dans la même
                scène.
              </p>

              {(
                selectedProject.locations ||
                []
              ).length === 0 ? (
                <p>
                  Aucun lieu dans la
                  bibliothèque.
                </p>
              ) : (
                selectedProject.locations.map(
                  (location) => {
                    const selected =
                      selectedLocationIds.some(
                        (id) =>
                          String(
                            id
                          ) ===
                          String(
                            location.id
                          )
                      );

                    return (
                      <div
                        key={
                          location.id
                        }
                        style={{
                          border:
                            selected
                              ? "2px solid #555"
                              : "1px solid #ccc",
                          borderRadius:
                            "8px",
                          padding:
                            "10px",
                          marginBottom:
                            "10px",
                        }}
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              selected
                            }
                            onChange={() =>
                              toggleLocation(
                                location.id
                              )
                            }
                          />

                          {" "}
                          🌍{" "}
                          {
                            location.name
                          }
                        </label>

                        {location
                          .description && (
                          <p>
                            {
                              location.description
                            }
                          </p>
                        )}

                        {(
                          location.images ||
                          []
                        ).length >
                          0 && (
                          <div
                            style={{
                              display:
                                "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit, minmax(90px, 1fr))",
                              gap:
                                "6px",
                              marginTop:
                                "8px",
                            }}
                          >
                            {location.images.map(
                              (
                                image
                              ) => (
                                <img
                                  key={
                                    image.id
                                  }
                                  src={
                                    image.url
                                  }
                                  alt={
                                    location.name
                                  }
                                  style={{
                                    width:
                                      "100%",
                                    height:
                                      "90px",
                                    objectFit:
                                      "cover",
                                    borderRadius:
                                      "6px",
                                  }}
                                />
                              )
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }
                )
              )}

              {/* ==========================
                  MOUVEMENTS
                  ========================== */}

              <hr />

              <h3>
                🎞️ Mouvements de la scène
              </h3>

              <p>
                Les mouvements viennent
                directement de la bibliothèque.
              </p>

              {(
                selectedProject.movements ||
                []
              ).length === 0 ? (
                <p>
                  Aucun mouvement dans la
                  bibliothèque.
                  <br />
                  Va dans 📚 Bibliothèques →
                  🎞️ Mouvements.
                </p>
              ) : (
                <>
                  <h4>
                    Ajouter un mouvement
                  </h4>

                  <div
                    style={{
                      display:
                        "grid",
                      gap: "8px",
                    }}
                  >
                    {selectedProject.movements.map(
                      (movement) => {
                        const alreadyAdded =
                          sceneMovements.some(
                            (item) =>
                              String(
                                item.id
                              ) ===
                              String(
                                movement.id
                              )
                          );

                        return (
                          <button
                            key={
                              movement.id
                            }
                            disabled={
                              alreadyAdded
                            }
                            onClick={() =>
                              addMovementToScene(
                                movement
                              )
                            }
                            style={{
                              textAlign:
                                "left",
                              padding:
                                "10px",
                            }}
                          >
                            {alreadyAdded
                              ? "✓ "
                              : "+ "}
                            🎞️{" "}
                            {
                              movement.name
                            }

                            {movement.destination && (
                              <>
                                {" "}
                                →
                                {" "}
                                {
                                  movement.destination
                                }
                              </>
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>

                  <hr />

                  <h4>
                    Séquence de la scène
                  </h4>

                  {sceneMovements.length ===
                  0 ? (
                    <p>
                      Aucun mouvement
                      sélectionné.
                    </p>
                  ) : (
                    sceneMovements.map(
                      (
                        step,
                        index
                      ) => {
                        const movement =
                          (
                            selectedProject.movements ||
                            []
                          ).find(
                            (item) =>
                              String(
                                item.id
                              ) ===
                              String(
                                step.id
                              )
                          );

                        return (
                          <div
                            key={`${step.id}-${index}`}
                            style={{
                              border:
                                "1px solid #ccc",
                              borderRadius:
                                "8px",
                              padding:
                                "12px",
                              marginBottom:
                                "10px",
                            }}
                          >
                            <h4>
                              {index +
                                1}
                              . 🎞️{" "}
                              {
                                movement?.name ||
                                "Mouvement"
                              }
                            </h4>

                            {movement
                              ?.description && (
                              <p>
                                {
                                  movement.description
                                }
                              </p>
                            )}

                            {movement
                              ?.previewImage
                              ?.url && (
                              <img
                                src={
                                  movement
                                    .previewImage
                                    .url
                                }
                                alt={
                                  movement.name
                                }
                                style={{
                                  width:
                                    "180px",
                                  maxHeight:
                                    "120px",
                                  objectFit:
                                    "cover",
                                  borderRadius:
                                    "6px",
                                }}
                              />
                            )}

                            {movement
                              ?.previewVideo
                              ?.url && (
                              <video
                                controls
                                src={
                                  movement
                                    .previewVideo
                                    .url
                                }
                                style={{
                                  width:
                                    "240px",
                                  maxHeight:
                                    "160px",
                                  display:
                                    "block",
                                  marginTop:
                                    "8px",
                                }}
                              />
                            )}

                            <label>
                              🎯 Destination
                            </label>

                            <input
                              className="project-input"
                              placeholder="Exemple : porte principale"
                              value={
                                step.destination ||
                                ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateMovementDestination(
                                  index,
                                  event
                                    .target
                                    .value
                                )
                              }
                            />

                            <div
                              className="form-actions"
                            >
                              <button
                                disabled={
                                  index ===
                                  0
                                }
                                onClick={() =>
                                  moveMovementUp(
                                    index
                                  )
                                }
                              >
                                ↑
                              </button>

                              <button
                                disabled={
                                  index ===
                                  sceneMovements.length -
                                    1
                                }
                                onClick={() =>
                                  moveMovementDown(
                                    index
                                  )
                                }
                              >
                                ↓
                              </button>

                              <button
                                onClick={() =>
                                  removeMovementFromScene(
                                    index
                                  )
                                }
                              >
                                🗑️ Retirer
                              </button>
                            </div>
                          </div>
                        );
                      }
                    )
                  )}
                </>
              )}

              {/* ==========================
                  ACTION
                  ========================== */}

              <hr />

              <h3>
                🎬 Action / mise en scène
              </h3>

              <p>
                Décris ici toute la scène :
                déroulement, actions,
                déplacements, interactions,
                changements de lieux,
                caméra et mise en scène.
              </p>

              <textarea
                className="project-input"
                placeholder="Décris toute la scène en détail..."
                value={
                  sceneAction
                }
                onChange={(event) =>
                  setSceneAction(
                    event.target.value
                  )
                }
                rows="12"
              />

              {/* ==========================
                  DIALOGUES
                  ========================== */}

              <h3>
                💬 Dialogues
              </h3>

              <textarea
                className="project-input"
                placeholder="Dialogues des personnages..."
                value={
                  sceneDialogue
                }
                onChange={(event) =>
                  setSceneDialogue(
                    event.target.value
                  )
                }
                rows="6"
              />

              {/* ==========================
                  STYLE
                  ========================== */}

              <h3>
                🎨 Style visuel
              </h3>

              <textarea
                className="project-input"
                placeholder="Décris le style visuel..."
                value={
                  sceneStyle
                }
                onChange={(event) =>
                  setSceneStyle(
                    event.target.value
                  )
                }
                rows="6"
              />

              <p>
                🖼️ Images de référence
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={
                  handleStyleImages
                }
              />

              {sceneStyleImages.length >
                0 && (
                <div
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "8px",
                    marginTop:
                      "10px",
                  }}
                >
                  {sceneStyleImages.map(
                    (image) => (
                      <img
                        key={
                          image.id
                        }
                        src={
                          image.url
                        }
                        alt={
                          image.name
                        }
                        style={{
                          width:
                            "100%",
                          height:
                            "120px",
                          objectFit:
                            "cover",
                          borderRadius:
                            "8px",
                        }}
                      />
                    )
                  )}
                </div>
              )}

              {/* ==========================
                  DURÉE
                  ========================== */}

              <h3>
                ⏱️ Durée
              </h3>

              <input
                className="project-input"
                type="number"
                min="1"
                value={
                  sceneDuration
                }
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
                  onClick={
                    resetSceneForm
                  }
                >
                  Annuler
                </button>

                <button
                  onClick={
                    saveScene
                  }
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

  // ==========================
  // HISTOIRE
  // ==========================

  if (
    selectedProject &&
    activeSection === "story"
  ) {
    return (
      <div className="app">
        <SidebarMenu />

        <main className="main">
          <button
            onClick={() =>
              goToSection(
                "project"
              )
            }
          >
            ← Retour au projet
          </button>

          <h1>
            📖 Histoire
          </h1>

          <p>
            Cette section sera
            développée ensuite.
          </p>
        </main>
      </div>
    );
  }

  // ==========================
  // VIDÉOS
  // ==========================

  if (
    selectedProject &&
    activeSection === "videos"
  ) {
    return (
      <div className="app">
        <SidebarMenu />

        <main className="main">
          <button
            onClick={() =>
              goToSection(
                "project"
              )
            }
          >
            ← Retour au projet
          </button>

          <h1>
            🎥 Vidéos
          </h1>

          <p>
            Les vidéos du projet
            seront accessibles ici.
          </p>
        </main>
      </div>
    );
  }

  // ==========================
  // PROJET OUVERT
  // ==========================

  if (
    selectedProject &&
    activeSection === "project"
  ) {
    return (
      <div className="app">
        <SidebarMenu />

        <main className="main">
          <button
            onClick={
              returnToProjects
            }
          >
            ← Retour à Mes projets
          </button>

          <h1>
            🎬{" "}
            {selectedProject.name}
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
                {
                  (
                    selectedProject.characters ||
                    []
                  ).length
                }
              </p>

              <button
                onClick={() =>
                  goToSection(
                    "libraries"
                  )
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
                {
                  (
                    selectedProject.locations ||
                    []
                  ).length
                }
              </p>

              <button
                onClick={() =>
                  goToSection(
                    "libraries"
                  )
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
                {
                  (
                    selectedProject.movements ||
                    []
                  ).length
                }
              </p>

              <button
                onClick={() =>
                  goToSection(
                    "libraries"
                  )
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
                {
                  (
                    selectedProject.images ||
                    []
                  ).length
                }
              </p>

              <button
                onClick={() =>
                  goToSection(
                    "libraries"
                  )
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

          {(
            selectedProject.episodes ||
            []
          ).length === 0 ? (
            <p>
              Aucun épisode.
            </p>
          ) : (
            <div className="project-grid">
              {selectedProject.episodes.map(
                (
                  episode,
                  index
                ) => (
                  <div
                    className="project-card"
                    key={
                      episode.id
                    }
                  >
                    <h3>
                      🎬 Épisode{" "}
                      {index + 1}
                    </h3>

                    <p>
                      {
                        episode.title
                      }
                    </p>

                    <p>
                      🎬{" "}
                      {
                        (
                          episode.scenes ||
                          []
                        ).length
                      }{" "}
                      scène(s)
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
              setShowEpisodeForm(
                true
              )
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
                value={
                  episodeTitle
                }
                onChange={(event) =>
                  setEpisodeTitle(
                    event.target.value
                  )
                }
              />

              <textarea
                className="project-input"
                placeholder="Description"
                value={
                  episodeDescription
                }
                onChange={(event) =>
                  setEpisodeDescription(
                    event.target.value
                  )
                }
                rows="4"
              />

              <button
                onClick={() =>
                  setShowEpisodeForm(
                    false
                  )
                }
              >
                Annuler
              </button>

              <button
                onClick={
                  createEpisode
                }
              >
                Créer
              </button>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ==========================
  // MES PROJETS
  // ==========================

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
          projects.map(
            (project) => (
              <button
                key={
                  project.id
                }
                onClick={() =>
                  openProject(
                    project
                  )
                }
                style={{
                  display:
                    "block",
                  width:
                    "100%",
                  textAlign:
                    "left",
                  marginBottom:
                    "6px",
                }}
              >
                🎬{" "}
                {project.name}
              </button>
            )
          )
        )}

        <button
          onClick={() =>
            setShowProjectForm(
              true
            )
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
            Aucun projet pour
            le moment.
          </p>
        ) : (
          <div className="project-grid">
            {projects.map(
              (project) => (
                <div
                  className="project-card"
                  key={
                    project.id
                  }
                >
                  <h3>
                    🎬{" "}
                    {
                      project.name
                    }
                  </h3>

                  <p>
                    🎭{" "}
                    {
                      (
                        project.characters ||
                        []
                      ).length
                    }{" "}
                    personnage(s)
                  </p>

                  <p>
                    🌍{" "}
                    {
                      (
                        project.locations ||
                        []
                      ).length
                    }{" "}
                    lieu(x)
                  </p>

                  <p>
                    🎞️{" "}
                    {
                      (
                        project.movements ||
                        []
                      ).length
                    }{" "}
                    mouvement(s)
                  </p>

                  <p>
                    🎬{" "}
                    {
                      (
                        project.episodes ||
                        []
                      ).length
                    }{" "}
                    épisode(s)
                  </p>

                  <button
                    onClick={() =>
                      openProject(
                        project
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

        {showProjectForm && (
          <div className="form-container">
            <h2>
              Nouveau projet
            </h2>

            <input
              className="project-input"
              placeholder="Nom du projet"
              value={
                projectName
              }
              onChange={(event) =>
                setProjectName(
                  event.target.value
                )
              }
            />

            <button
              onClick={() =>
                setShowProjectForm(
                  false
                )
              }
            >
              Annuler
            </button>

            <button
              onClick={
                createProject
              }
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

