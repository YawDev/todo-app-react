import "../styles/InfoPage.css";
import {
  FiCheckSquare,
  FiFilter,
  FiLayers,
  FiShield,
  FiMonitor,
  FiServer,
} from "react-icons/fi";

export default function About() {
  const endpoints = [
    { method: "post", path: "/Register", desc: "Create account" },
    { method: "post", path: "/Login", desc: "Start session" },
    { method: "get", path: "/AuthStatus", desc: "Restore session" },
    { method: "get", path: "/GetList/{userID}", desc: "Fetch list + tasks" },
    { method: "post", path: "/CreateTask/{listID}", desc: "Add task" },
    { method: "put", path: "/UpdateTask/{taskID}", desc: "Edit task" },
    { method: "put", path: "/TaskCompleted/{taskID}", desc: "Toggle status" },
    { method: "delete", path: "/DeleteTask/{taskID}", desc: "Remove task" },
  ];

  return (
    <div className="info-page">
      <span className="info-eyebrow">Demo Project</span>
      <h1 className="info-title">About Todo Task App</h1>
      <p className="info-lead">
        A full-stack demo built to show a clean React front end talking to a
        dedicated Go REST API. The interface you&apos;re using is a React 19
        single-page app; everything it persists — accounts, sessions, and tasks
        — lives in a separate Go (Gin) service.
      </p>

      <section className="info-section">
        <h2 className="info-h2">What it does</h2>
        <div className="info-grid">
          <article className="info-card is-interactive">
            <div className="info-card-icon">
              <FiCheckSquare />
            </div>
            <h3>Task management</h3>
            <p>
              Create, edit, complete, and delete tasks on a personal list — one
              list per user.
            </p>
          </article>
          <article className="info-card is-interactive">
            <div className="info-card-icon">
              <FiFilter />
            </div>
            <h3>Filter &amp; search</h3>
            <p>
              Search by title and filter by completion state, with client-side
              pagination over the list.
            </p>
          </article>
          <article className="info-card is-interactive">
            <div className="info-card-icon">
              <FiShield />
            </div>
            <h3>Cookie-based auth</h3>
            <p>
              Register and sign in against the Go API. Sessions use HttpOnly JWT
              cookies handled entirely by the backend.
            </p>
          </article>
        </div>
      </section>

      <section className="info-section">
        <h2 className="info-h2">How it&apos;s built</h2>
        <div className="info-split">
          <div className="info-card">
            <p className="info-stack-title">
              <FiMonitor /> Front end
            </p>
            <ul className="info-stack-list">
              <li>
                <span>
                  <strong>React 19</strong> + Vite, client-side routing with
                  React Router 7
                </span>
              </li>
              <li>
                <span>
                  <strong>React Context</strong> for session &amp; UI state — no
                  Redux
                </span>
              </li>
              <li>
                <span>
                  Native <strong>fetch</strong> with{" "}
                  <code>credentials: &quot;include&quot;</code> on every request
                </span>
              </li>
              <li>
                <span>Styled with Tailwind 4, Bootstrap 5, and custom CSS</span>
              </li>
            </ul>
          </div>
          <div className="info-card">
            <p className="info-stack-title">
              <FiServer /> Back end
            </p>
            <ul className="info-stack-list">
              <li>
                <span>
                  <strong>Go</strong> with the <strong>Gin</strong> web
                  framework
                </span>
              </li>
              <li>
                <span>
                  <strong>GORM</strong> ORM over SQLite / MySQL
                </span>
              </li>
              <li>
                <span>
                  JWT access &amp; refresh tokens issued as HttpOnly cookies
                </span>
              </li>
              <li>
                <span>
                  Served at <code>localhost:8080/api/v1</code>, CORS-locked to
                  the SPA origin
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2 className="info-h2">API surface</h2>
        <p style={{ marginBottom: "18px" }}>
          The front end never touches a database directly — it calls these Go
          endpoints through two thin client modules.
        </p>
        <div className="endpoint-list">
          {endpoints.map((e) => (
            <div className="endpoint" key={e.path}>
              <span className={`method ${e.method}`}>
                {e.method.toUpperCase()}
              </span>
              <code>{e.path}</code>
              <span className="endpoint-desc">{e.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="info-note">
        <FiLayers style={{ verticalAlign: "-2px", marginRight: "6px" }} />
        This is a portfolio demo project, not a commercial product. The Go API
        source lives at{" "}
        <a
          className="info-link"
          href="https://github.com/YawDev/todo-web-api"
          target="_blank"
          rel="noreferrer"
        >
          github.com/YawDev/todo-web-api
        </a>
        .
      </div>
    </div>
  );
}
