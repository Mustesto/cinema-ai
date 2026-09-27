import { useState } from "react";

function Libraries({ project, onUpdateProject }) {
  const [activeLibrary, setActiveLibrary] =
    useState("characters");

  const [showForm, setShowForm] = useState(false);

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

  function createItem() {
    if (!name.trim()) return;

    const item = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      images,
      videos,
    };

    const updatedProject = {
      ...project,
      [activeLibrary]: [
        ...(project[activeLibrary] || []),
        item,
      ],
    };

    onUpdateProject(updatedProject);

    setName("");
    setDescription("");
    setImages([]);
    setVideos([]);
    setShowForm(false);
  }

  const items = project[activeLibrary] || [];

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
                setShowForm(false);
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
                  {item.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.url}
                      alt={image.name}
                      width="120"
                      style={{
                        margin: "5px",
                      }}
                    />
                  ))}
                </div>
              )}

              {item.videos?.length > 0 && (
                <div>
                  {item.videos.map((video) => (
                    <video
                      key={video.id}
                      src={video.url}
                      controls
                      width="250"
                      style={{
                        margin: "5px",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setShowForm(true)}
      >
        + Ajouter
      </button>

      {showForm && (
        <div className="form-container">
          <h3>
            Ajouter dans{" "}
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
            placeholder="Description / texte"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
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

          {activeLibrary === "movements" && (
            <>
              <h4>🎥 Vidéos de référence</h4>

              <input
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideos}
              />
            </>
          )}

          <div className="form-actions">
            <button
              onClick={() =>
                setShowForm(false)
              }
            >
              Annuler
            </button>

            <button onClick={createItem}>
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Libraries;
