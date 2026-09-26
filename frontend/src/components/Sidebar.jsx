function Sidebar({ onNewProject }) {
  return (
    <aside>
      <h2>🎬 Cinema AI</h2>

      <button onClick={onNewProject}>
        + Nouveau projet
      </button>

      <nav>
        <p>Mes projets</p>
      </nav>
    </aside>
  );
}

export default Sidebar;
