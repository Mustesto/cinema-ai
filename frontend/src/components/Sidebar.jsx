function Sidebar({ onNewProject }) {
  return (
    <aside className="sidebar">
      <h2>🎬 Cinema AI</h2>

      <button
        className="new-project-button"
        onClick={onNewProject}
      >
        + Nouveau projet
      </button>

      <nav className="sidebar-nav">
        <p>📁 Mes projets</p>
      </nav>
    </aside>
  );
}

export default Sidebar;
