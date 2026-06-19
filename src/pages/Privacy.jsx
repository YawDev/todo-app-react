import "../styles/InfoPage.css";

const Privacy = () => {
  return (
    <div className="info-page info-narrow">
      <span className="info-eyebrow">Privacy</span>
      <h1 className="info-title">Privacy Policy</h1>
      <p className="info-lead">
        Todo Task App is a portfolio demo. This page explains, in plain terms,
        the small amount of data the app handles and how the Go back end stores
        it.
      </p>
      <p className="info-meta">Last updated June 19, 2026</p>

      <section className="info-section">
        <h2 className="info-h2">What we store</h2>
        <p>
          Only what&apos;s needed to run the app: your <strong>username</strong>{" "}
          and a securely hashed <strong>password</strong> for your account, plus
          the <strong>tasks</strong> you create (title, description, and
          completion status). No names, phone numbers, or payment details are
          collected.
        </p>
      </section>

      <section className="info-section">
        <h2 className="info-h2">How it&apos;s stored</h2>
        <p>
          Data is persisted by a separate Go (Gin) API using the GORM ORM over a
          SQLite or MySQL database. The React front end keeps nothing of value on
          your device — it only holds session and UI state in memory while the
          tab is open.
        </p>
      </section>

      <section className="info-section">
        <h2 className="info-h2">Authentication &amp; sessions</h2>
        <p>
          Sign-in issues JWT access and refresh tokens as <strong>HttpOnly</strong>{" "}
          cookies set by the back end. The browser sends them automatically; the
          app itself never reads or stores tokens in JavaScript or localStorage,
          which keeps them out of reach of page scripts.
        </p>
      </section>

      <section className="info-section">
        <h2 className="info-h2">What we don&apos;t do</h2>
        <p>
          No third-party sharing, no advertising or analytics trackers, and no
          selling of data. Your tasks are scoped to your own account and
          aren&apos;t visible to other users.
        </p>
      </section>

      <div className="info-note">
        Because this is a demonstration project, please don&apos;t store
        sensitive or real personal information in it. Demo data may be reset
        without notice.
      </div>
    </div>
  );
};

export default Privacy;
