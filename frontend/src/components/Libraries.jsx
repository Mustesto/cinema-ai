import { useState } from "react";

function Libraries({ project, onUpdateProject }) {
  const [activeLibrary, setActiveLibrary] =
    useState("characters");

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const libraryNames = {
    characters: "🎭 Personnages",
    locations: "🌍 Lieux",
    images: "🖼️ Images",
    movements: "🎞️ Mouvements",
  };

  const items = project[activeLibrary] || [];

  function resetForm() {
    setName("");
    setDescription("");
    setImages([]);
    setVideos([]);
    setEditingItem(null);
    setShowForm(false);
  }

  function handleImages(event) {
    const files = Array.from(event.target.files || []);

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setImages((previous) => [
      ...previous,
      ...newImages,
    ]);
  }

  function handleVideos(event) {
    const files = Array.from(event.target.files || []);

    const newVideos = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setVideos((previous) => [
      ...previous,
      ...newVideos,
    ]);
  }

  function openCreateForm() {
    resetForm();
    setShowForm(true);
  }

  function openEditForm(item) {
    setEditingItem(item);

    setName(item.name || "");
    setDescription(item.description || "");

    setImages(item.images || []);
    setVideos(item.videos || []);

    setShowForm(true);
  }

  function saveItem() {
    if (!name.trim()) return;

    const item = {
      id: editingItem
        ? editingItem.id
        : Date.now(),

      name: name.trim(),

      description:
        description.trim(),

      images,

      videos,
    };

    let updatedItems;

    if (editingItem) {
      updatedItems = items.map((existingItem) =>
        existingItem.id === editingItem.id
          ? item
          : existingItem
      );
    } else {
      updatedItems = [...items, item];
    }

    const updatedProject = {
      ...project,
      [activeLibrary]: updatedItems,
    };

    onUpdateProject(updatedProject);

    resetForm();
  }

  function deleteItem(itemId) {
    const confirmed = window.confirm(
      "Supprimer cet élément ?"
    );

    if (!confirmed) return;

    const updatedItems = items.filter(
      (item) => item.id !== itemId
    );

    const updatedProject = {
      ...project,
      [activeLibrary]: updatedItems,
    };

    onUpdateProject(updatedProject);
  }

  function removeImage(imageId) {
    setImages((previous) =>
      previous.filter(
        (image) => image.id !== imageId
      )
    );
  }

  function removeVideo(videoId) {
    setVideos((previous) =>
      previous.filter(
        (video) => video.id !== videoId
      )
    );
  }

  return (
    <div>
      <h2>📚 Bibliothèques</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {Object.entries(libraryNames).map(
          ([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveLibrary(key);
                resetForm();
              }}
            >
              {label}
            </button>
          )
        )}
      </div>

      <h2>{libraryNames[activeLibrary]}</h2>

      {items.length === 0 ? (
        <p>
          Aucun élément dans cette bibliothèque.
        </p>
      ) : (
        <div className="project-grid">
          {items.map((item) => (
            <div
              className="project-card"
              key={item.id}
            >
              <h3>{item.name}</h3>

              <p>
                {item.description ||
                  "Aucune description."}
              </p>

              {item.images?.length > 0 && (
                <div>
                  <strong>
                    🖼️ Images
                  </strong>

                  <div>
                    {item.images.map(
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
                </div>
              )}

              {item.videos?.length > 0 && (
                <div>
                  <strong>
                    🎥 Vidéos
                  </strong>

                  <div>
                    {item.videos.map(
                      (video) => (
                        <video
                          key={video.id}
                          src={video.url}
                          controls
                          width="250"
                          style={{
                            display: "block",
                            margin: "10px 0",
                          }}
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  onClick={() =>
                    openEditForm(item)
                  }
                >
                  ✏️ Modifier
                </button>

                <button
                  onClick={() =>
                    deleteItem(item.id)
                  }
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showForm && (
        <button onClick={openCreateForm}>
          + Ajouter
        </button>
      )}

      {showForm && (
        <div className="form-container">
          <h3>
            {editingItem
              ? "✏️ Modifier"
              : "+ Ajouter"}{" "}
            {libraryNames[activeLibrary]}
          </h3>

          <input
            className="project-input"
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />

          <textarea
            className="project-input"
            placeholder={
              activeLibrary === "movements"
                ? "Description / instructions du mouvement"
                : "Description"
            }
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value
              )
            }
            rows="5"
          />

          <h4>🖼️ Images</h4>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImages}
          />

          {images.length > 0 && (
            <div>
              {images.map((image) => (
                <div
                  key={image.id}
                  style={{
                    display: "inline-block",
                    margin: "5px",
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    width="120"
                  />

                  <br />

                  <button
                    onClick={() =>
                      removeImage(image.id)
                    }
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeLibrary === "movements" && (
            <>
              <h4>
                🎥 Vidéos de référence
              </h4>

              <input
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideos}
              />

              {videos.length > 0 && (
                <div>
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      style={{
                        margin: "10px 0",
                      }}
                    >
                      <video
                        src={video.url}
                        controls
                        width="300"
                      />

                      <br />

                      <button
                        onClick={() =>
                          removeVideo(
                            video.id
                          )
                        }
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <div
            className="form-actions"
            style={{
              marginTop: "20px",
            }}
          >
            <button onClick={resetForm}>
              Annuler
            </button>

            <button onClick={saveItem}>
              {editingItem
                ? "Enregistrer les modifications"
                : "Créer"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Libraries;
