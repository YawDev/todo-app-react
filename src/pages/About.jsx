import "../styles/About.css";
export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-8 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        About Todo Task App
      </h1>
      <p className="text-lg mb-6">
        Todo Task App is a modern productivity solution designed to help you
        manage tasks efficiently and stay focused on your priorities. Whether
        you are working on personal goals, team projects, or simply keeping a
        daily checklist, our platform ensures that your workflow remains clear
        and organized.
      </p>

      <div className="bg-gray-100 p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Our Mission
        </h2>
        <p className="text-md">
          <strong>Make productivity simple and accessible.</strong> With tools
          for task filtering, quick editing, and progress tracking, Todo Task
          App empowers individuals and teams to focus on what matters most.
        </p>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        Why Choose Us?
      </h2>
      <ul className="list-disc list-inside space-y-2 text-md">
        <li>Streamlined interface for distraction-free task management</li>
        <li>Flexible features for both personal and professional use</li>
        <li>Secure and reliable performance to safeguard your data</li>
        <li>Commitment to continuous improvement and user feedback</li>
      </ul>
    </div>
  );
}
