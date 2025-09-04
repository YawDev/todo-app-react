const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        We’d love to hear from you! Whether you have feedback, feature requests,
        or questions, please reach out.
      </p>
      <p className="mb-4">
        📧 Email:{" "}
        <a
          href="mailto:support@todotaskapp.com"
          className="text-blue-600 hover:underline"
        >
          support@todotaskapp.com
        </a>
      </p>
      <p>
        Our support team aims to respond within 24–48 hours. Thank you for
        helping us improve Todo Task App!
      </p>
    </div>
  );
};

export default Contact;
