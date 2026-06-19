import "../styles/InfoPage.css";
import { FiMail, FiGithub, FiAlertCircle } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="info-page info-narrow">
      <span className="info-eyebrow">Get in touch</span>
      <h1 className="info-title">Contact</h1>
      <p className="info-lead">
        Todo Task App is a personal portfolio project. If you&apos;d like to talk
        through the code, the React/Go architecture, or anything else, here are
        the best ways to reach me.
      </p>

      <section className="info-section">
        <div className="info-grid">
          <article className="info-card is-interactive">
            <div className="info-card-icon">
              <FiMail />
            </div>
            <h3>Email</h3>
            <p>
              Questions or feedback about the project —{" "}
              <a href="mailto:jason.ampah.dev@gmail.com">
                jason.ampah.dev@gmail.com
              </a>
            </p>
          </article>

          <article className="info-card is-interactive">
            <div className="info-card-icon">
              <FiGithub />
            </div>
            <h3>Source code</h3>
            <p>
              Browse the Go REST API on{" "}
              <a
                href="https://github.com/YawDev/todo-web-api"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </article>

          <article className="info-card is-interactive">
            <div className="info-card-icon">
              <FiAlertCircle />
            </div>
            <h3>Found an issue?</h3>
            <p>
              Spotted a bug in the demo? Open an issue on the repository and I&apos;ll
              take a look.
            </p>
          </article>
        </div>
      </section>

      <div className="info-note">
        This is a demo, so there&apos;s no formal support team — but I read every
        message and usually reply within a few days.
      </div>
    </div>
  );
};

export default Contact;
