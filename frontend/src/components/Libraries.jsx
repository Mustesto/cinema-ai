
import { useState } from "react";

function Libraries({ project, onUpdateProject }) {
  const [activeLibrary, setActiveLibrary] =
    useState("characters");

  // ==========================
  // PERSONNAGES
  // ==========================

  const [characterName, setCharacterName] =
    useState("");

  const [characterDescription, setCharacterDescription] =
    useState("");

  // ==========================
  // LIEUX
  // ==========================

  const [locationName, setLocationName] =
    useState("");

  const [locationDescription, setLocationDescription] =
    useState("");

  // ==========================
  // IMAGES
  // ==========================

  const [imageName, setImageName] =
    useState("");

  // ==========================
  // VIDÉOS
  // ==========================

  const [videoName, setVideoName] =
    useState("");

  // ==========================
  // MOUVEMENTS
  // ==========================

  const [movementName, setMovementName] =
    useState("");

  const [movementDescription, setMovementDescription] =
    useState("");

  const [movementDestination, setMovementDestination] =
    useState("");

  const [movementImage, setMovementImage] =
    useState(null);

  const [movementVideo, setMovementVideo] =
    useState(null);

  const [editingMovement, setEditingMovement] =
    useState(null);

  // ==========================
  // UTILITAIRE
  // ==========================

  function updateProject(updatedProject) {
    onUpdateProject(updatedProject);
  }

  // ==========================
  // PERSONNAGES
  // ==========================

  function addCharacter() {
    const name = characterName.trim();

    if (!name) return;

    const newCharacter = {
      id: Date.now(),
      name,
      description:
        characterDescription.trim(),
    };

    updateProject({
      ...project,
      characters: [
        ...(project.characters || []),
        newCharacter,
      ],
    });

    setCharacterName("");
    setCharacterDescription("");
  }

  function deleteCharacter(id) {
    if (
      !window.confirm(
        "Supprimer ce personnage ?"
      )
    ) {
      return;
    }

    updateProject({
      ...project,
      characters:
        project.characters.filter(
          (character) =>
            character.id !== id
        ),
    });
  }

  // ==========================
  // LIEUX
  // ==========================

  function addLocation() {
    const name = locationName.trim();

    if (!name) return;

    const newLocation = {
      id: Date.now(),
      name,
      description:
        locationDescription.trim(),
    };

    updateProject({
      ...project,
      locations: [
        ...(project.locations || []),
        newLocation,
      ],
    });

    setLocationName("");
    setLocationDescription("");
  }

  function deleteLocation(id) {
    if (
      !window.confirm(
        "Supprimer ce lieu ?"
      )
    ) {
      return;
    }

    updateProject({
      ...project,
      locations:
        project.locations.filter(
          (location) =>
            location.id !== id
        ),
    });
  }

  // ==========================
  // IMAGES
  // ==========================

  function handleImageUpload(event) {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length === 0) return;

    const newImages = files.map(
      (file) => ({
        id:
          Date.now() +
          Math.random(),

        name:
          imageName.trim() ||
          file.name,

        fileName: file.name,

        url: URL.createObjectURL(
          file
        ),
      })
    );

    updateProject({
      ...project,
      images: [
        ...(project.images || []),
        ...newImages,
      ],
    });

    setImageName("");
    event.target.value = "";
  }

  function deleteImage(id) {
    if (
      !window.confirm(
        "Supprimer cette image ?"
      )
    ) {
      return;
    }

    updateProject({
      ...project,
      images:
        project.images.filter(
          (image) =>
            image.id !== id
        ),
    });
  }

  // ==========================
  // VIDÉOS
  // ==========================

  function handleVideoUpload(event) {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length === 0) return;

    const newVideos = files.map(
      (file) => ({
        id:
          Date.now() +
          Math.random(),

        name:
          videoName.trim() ||
          file.name,

        fileName: file.name,

        url: URL.createObjectURL(
          file
        ),
      })
    );

    updateProject({
      ...project,
      videos: [
        ...(project.videos || []),
        ...newVideos,
      ],
    });

    setVideoName("");
    event.target.value = "";
  }

  function deleteVideo(id) {
    if (
      !window.confirm(
        "Supprimer cette vidéo ?"
      )
    ) {
      return;
    }

    updateProject({
      ...project,
      videos:
        (project.videos || []).filter(
          (video) =>
            video.id !== id
        ),
    });
  }

  // ==========================
  // MOUVEMENTS
  // ==========================

  function resetMovementForm() {
    setMovementName("");
    setMovementDescription("");
    setMovementDestination("");
    setMovementImage(null);
    setMovementVideo(null);
    setEditingMovement(null);
  }

  function addMovement() {
    const name =
      movementName.trim();

    if (!name) return;

    const newMovement = {
      id: Date.now(),

      name,

      description:
        movementDescription.trim(),

      /*
       * Destination libre.
       *
       * Exemple :
       * "Porte principale"
       * "Voiture"
       * "Table"
       * "Fenêtre"
       * etc.
       */
      destination:
        movementDestination.trim(),

      /*
       * Aperçu image.
       */
      previewImage:
        movementImage
          ? {
              name:
                movementImage.name,

              url:
                URL.createObjectURL(
                  movementImage
                ),
            }
          : null,

      /*
       * Vidéo de référence.
       */
      previewVideo:
        movementVideo
          ? {
              name:
                movementVideo.name,

              url:
                URL.createObjectURL(
                  movementVideo
                ),
            }
          : null,
    };

    updateProject({
      ...project,

      movements: [
        ...(project.movements || []),
        newMovement,
      ],
    });

    resetMovementForm();
  }

  function updateMovement() {
    if (!editingMovement) {
      return;
    }

    const name =
      movementName.trim();

    if (!name) return;

    const updatedMovement = {
      ...editingMovement,

      name,

      description:
        movementDescription.trim(),

      destination:
        movementDestination.trim(),

      previewImage:
        movementImage
          ? {
              name:
                movementImage.name,

              url:
                URL.createObjectURL(
                  movementImage
                ),
            }
          : editingMovement.previewImage ||
            null,

      previewVideo:
        movementVideo
          ? {
              name:
                movementVideo.name,

              url:
                URL.createObjectURL(
                  movementVideo
                ),
            }
          : editingMovement.previewVideo ||
            null,
    };

    updateProject({
      ...project,

      movements:
        project.movements.map(
          (movement) =>
            movement.id ===
            editingMovement.id
              ? updatedMovement
              : movement
        ),
    });

    resetMovementForm();
  }

  function saveMovement() {
    if (editingMovement) {
      updateMovement();
    } else {
      addMovement();
    }
  }

  function editMovement(movement) {
    setEditingMovement(
      movement
    );

    setMovementName(
      movement.name || ""
    );

    setMovementDescription(
      movement.description || ""
    );

    setMovementDestination(
      movement.destination || ""
    );

    /*
     * On ne peut pas remettre
     * directement un ancien fichier
     * dans un input type=file.
     *
     * Les références existantes
     * sont donc conservées si aucun
     * nouveau fichier n'est choisi.
     */
    setMovementImage(null);
    setMovementVideo(null);
  }

  function deleteMovement(id) {
    if (
      !window.confirm(
        "Supprimer ce mouvement ?"
      )
    ) {
      return;
    }

    updateProject({
      ...project,

      movements:
        project.movements.filter(
          (movement) =>
            movement.id !== id
        ),
    });

    if (
      editingMovement &&
      editingMovement.id === id
    ) {
      resetMovementForm();
    }
  }

  // ==========================
  // RENDU
  // ==========================

  return (
    <div className="libraries">

      <div className="library-menu">

        <button
          onClick={() =>
            setActiveLibrary(
              "characters"
            )
          }
        >
          🎭 Personnages
        </button>

        <button
          onClick={() =>
            setActiveLibrary(
              "locations"
            )
          }
        >
          🌍 Lieux
        </button>

        <button
          onClick={() =>
            setActiveLibrary(
              "movements"
            )
          }
        >
          🎞️ Mouvements
        </button>

        <button
          onClick={() =>
            setActiveLibrary(
              "images"
            )
          }
        >
          🖼️ Images
        </button>

        <button
          onClick={() =>
            setActiveLibrary(
              "videos"
            )
          }
        >
          🎥 Vidéos
        </button>

      </div>

      <div className="library-content">

        {/* ==========================
            PERSONNAGES
            ========================== */}

        {activeLibrary ===
          "characters" && (
          <section>

            <h2>
              🎭 Bibliothèque des
              personnages
            </h2>

            <input
              className="project-input"
              placeholder="Nom du personnage"
              value={
                characterName
              }
              onChange={(event) =>
                setCharacterName(
                  event.target.value
                )
              }
            />

            <textarea
              className="project-input"
              placeholder="Description du personnage"
              value={
                characterDescription
              }
              onChange={(event) =>
                setCharacterDescription(
                  event.target.value
                )
              }
              rows="4"
            />

            <button
              onClick={
                addCharacter
              }
            >
              + Ajouter
            </button>

            <hr />

            {
              (project.characters ||
                []).map(
                (character) => (
                  <div
                    className="project-card"
                    key={
                      character.id
                    }
                  >

                    <h3>
                      🎭{" "}
                      {
                        character.name
                      }
                    </h3>

                    <p>
                      {
                        character.description
                      }
                    </p>

                    <button
                      onClick={() =>
                        deleteCharacter(
                          character.id
                        )
                      }
                    >
                      🗑️ Supprimer
                    </button>

                  </div>
                )
              )
            }

          </section>
        )}

        {/* ==========================
            LIEUX
            ========================== */}

        {activeLibrary ===
          "locations" && (
          <section>

            <h2>
              🌍 Bibliothèque des lieux
            </h2>

            <input
              className="project-input"
              placeholder="Nom du lieu"
              value={
                locationName
              }
              onChange={(event) =>
                setLocationName(
                  event.target.value
                )
              }
            />

            <textarea
              className="project-input"
              placeholder="Description du lieu"
              value={
                locationDescription
              }
              onChange={(event) =>
                setLocationDescription(
                  event.target.value
                )
              }
              rows="4"
            />

            <button
              onClick={
                addLocation
              }
            >
              + Ajouter le lieu
            </button>

            <hr />

            {
              (project.locations ||
                []).map(
                (location) => (
                  <div
                    className="project-card"
                    key={
                      location.id
                    }
                  >

                    <h3>
                      🌍{" "}
                      {
                        location.name
                      }
                    </h3>

                    <p>
                      {
                        location.description
                      }
                    </p>

                    <button
                      onClick={() =>
                        deleteLocation(
                          location.id
                        )
                      }
                    >
                      🗑️ Supprimer
                    </button>

                  </div>
                )
              )
            }

          </section>
        )}

        {/* ==========================
            MOUVEMENTS
            ========================== */}

        {activeLibrary ===
          "movements" && (
          <section>

            <h2>
              🎞️ Bibliothèque des
              mouvements
            </h2>

            <p>
              Tu peux créer autant de
              mouvements que nécessaire.
              Chaque mouvement peut avoir
              une destination, une image
              d'aperçu et une vidéo de
              référence.
            </p>

            <div className="form-container">

              <h3>
                {
                  editingMovement
                    ? "✏️ Modifier le mouvement"
                    : "➕ Ajouter un mouvement"
                }
              </h3>

              <input
                className="project-input"
                placeholder="Nom du mouvement"
                value={
                  movementName
                }
                onChange={(event) =>
                  setMovementName(
                    event.target.value
                  )
                }
              />

              <textarea
                className="project-input"
                placeholder="Description du mouvement"
                value={
                  movementDescription
                }
                onChange={(event) =>
                  setMovementDescription(
                    event.target.value
                  )
                }
                rows="4"
              />

              <label>
                🎯 Destination
              </label>

              <input
                className="project-input"
                placeholder="Exemple : Porte principale, voiture, table..."
                value={
                  movementDestination
                }
                onChange={(event) =>
                  setMovementDestination(
                    event.target.value
                  )
                }
              />

              <p>
                L'utilisateur peut écrire
                librement la destination.
                Plus tard, l'IA pourra
                proposer des destinations
                adaptées au contexte.
              </p>

              <label>
                🖼️ Image d'aperçu
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setMovementImage(
                    event.target.files?.[0] ||
                      null
                  )
                }
              />

              {movementImage && (
                <p>
                  🖼️{" "}
                  {
                    movementImage.name
                  }
                </p>
              )}

              <label>
                🎥 Vidéo de référence
              </label>

              <input
                type="file"
                accept="video/*"
                onChange={(event) =>
                  setMovementVideo(
                    event.target.files?.[0] ||
                      null
                  )
                }
              />

              {movementVideo && (
                <p>
                  🎥{" "}
                  {
                    movementVideo.name
                  }
                </p>
              )}

              <div
                className="form-actions"
              >

                {editingMovement && (
                  <button
                    onClick={
                      resetMovementForm
                    }
                  >
                    Annuler
                  </button>
                )}

                <button
                  onClick={
                    saveMovement
                  }
                >
                  {
                    editingMovement
                      ? "Enregistrer"
                      : "Ajouter le mouvement"
                  }
                </button>

              </div>

            </div>

            <hr />

            <h3>
              🎞️ Mouvements enregistrés
            </h3>

            {
              (project.movements ||
                []).length ===
              0 ? (
                <p>
                  Aucun mouvement
                  pour le moment.
                </p>
              ) : (
                <div className="project-grid">

                  {
                    project.movements.map(
                      (
                        movement
                      ) => (
                        <div
                          className="project-card"
                          key={
                            movement.id
                          }
                        >

                          <h3>
                            🎞️{" "}
                            {
                              movement.name
                            }
                          </h3>

                          {movement
                            .previewImage
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
                                  "100%",
                                maxHeight:
                                  "220px",
                                objectFit:
                                  "cover",
                                borderRadius:
                                  "8px",
                                marginBottom:
                                  "10px",
                              }}
                            />
                          )}

                          <p>
                            {
                              movement.description ||
                              "Aucune description."
                            }
                          </p>

                          <p>
                            🎯{" "}
                            <strong>
                              Destination :
                            </strong>{" "}
                            {
                              movement.destination ||
                              "Aucune destination"
                            }
                          </p>

                          {movement
                            .previewVideo
                            ?.url && (
                            <div>

                              <p>
                                🎥 Vidéo de
                                référence
                              </p>

                              <video
                                controls
                                style={{
                                  width:
                                    "100%",
                                  maxHeight:
                                    "240px",
                                  borderRadius:
                                    "8px",
                                }}
                                src={
                                  movement
                                    .previewVideo
                                    .url
                                }
                              />

                            </div>
                          )}

                          <div
                            className="form-actions"
                          >

                            <button
                              onClick={() =>
                                editMovement(
                                  movement
                                )
                              }
                            >
                              ✏️ Modifier
                            </button>

                            <button
                              onClick={() =>
                                deleteMovement(
                                  movement.id
                                )
                              }
                            >
                              🗑️ Supprimer
                            </button>

                          </div>

                        </div>
                      )
                    )
                  }

                </div>
              )
            }

          </section>
        )}

        {/* ==========================
            IMAGES
            ========================== */}

        {activeLibrary ===
          "images" && (
          <section>

            <h2>
              🖼️ Bibliothèque des images
            </h2>

            <input
              className="project-input"
              placeholder="Nom de l'image (facultatif)"
              value={
                imageName
              }
              onChange={(event) =>
                setImageName(
                  event.target.value
                )
              }
            />

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={
                handleImageUpload
              }
            />

            <hr />

            <div className="project-grid">

              {
                (project.images ||
                  []).map(
                  (image) => (
                    <div
                      className="project-card"
                      key={
                        image.id
                      }
                    >

                      <h3>
                        🖼️{" "}
                        {
                          image.name
                        }
                      </h3>

                      {image.url && (
                        <img
                          src={
                            image.url
                          }
                          alt={
                            image.name
                          }
                          style={{
                            width:
                              "100%",
                            maxHeight:
                              "220px",
                            objectFit:
                              "cover",
                            borderRadius:
                              "8px",
                          }}
                        />
                      )}

                      <button
                        onClick={() =>
                          deleteImage(
                            image.id
                          )
                        }
                      >
                        🗑️ Supprimer
                      </button>

                    </div>
                  )
                )
              }

            </div>

          </section>
        )}

        {/* ==========================
            VIDÉOS
            ========================== */}

        {activeLibrary ===
          "videos" && (
          <section>

            <h2>
              🎥 Bibliothèque des vidéos
            </h2>

            <input
              className="project-input"
              placeholder="Nom de la vidéo (facultatif)"
              value={
                videoName
              }
              onChange={(event) =>
                setVideoName(
                  event.target.value
                )
              }
            />

            <input
              type="file"
              accept="video/*"
              multiple
              onChange={
                handleVideoUpload
              }
            />

            <hr />

            <div className="project-grid">

              {
                (project.videos ||
                  []).map(
                  (video) => (
                    <div
                      className="project-card"
                      key={
                        video.id
                      }
                    >

                      <h3>
                        🎥{" "}
                        {
                          video.name
                        }
                      </h3>

                      {video.url && (
                        <video
                          controls
                          style={{
                            width:
                              "100%",
                            maxHeight:
                              "240px",
                            borderRadius:
                              "8px",
                          }}
                          src={
                            video.url
                          }
                        />
                      )}

                      <button
                        onClick={() =>
                          deleteVideo(
                            video.id
                          )
                        }
                      >
                        🗑️ Supprimer
                      </button>

                    </div>
                  )
                )
              }

            </div>

          </section>
        )}

      </div>
    </div>
  );
}

export default Libraries;

