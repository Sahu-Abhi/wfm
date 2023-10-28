import Link from "next/link";
import { DatePicker } from "./DatePicker";

export default function Form(
  type,
  project,
  SetProject,
  submitting,
  handleSubmit
) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Add Project</span>
      </h1>

      <form
        action=""
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span
            className="font-satoshi font-semibold text-base
                    text-gray-700">
            Project Name
          </span>
          <input
            type="text"
            value={project.name}
            onChange={(e) =>
              SetProject({
                ...project,
                name: e.target.value,
              })
            }
            placeholder="Enter project name..."
            required
            className="form_input"
          />
        </label>
        <label>
          <span
            className="font-satoshi font-semibold text-base
                    text-gray-700">
            Sub-Title
          </span>
          <input
            type="text"
            value={project.subTitle}
            onChange={(e) =>
              SetProject({
                ...project,
                subTitle: e.target.value,
              })
            }
            placeholder="Enter subtitle..."
            required
            className="form_input"
          />
        </label>
        <label>
          <span
            className="font-satoshi font-semibold text-base
                    text-gray-700">
            Add Members
          </span>
          <input
            type="text"
            value={project.users}
            onChange={(e) =>
              SetProject({
                ...project,
                users: e.target.value,
              })
            }
            placeholder="Add team members..."
            required
            className="form_input"
          />
        </label>
        <label>
        <span
            className="font-satoshi font-semibold text-base
                    text-gray-700 mr-4">
            Select deadline
          </span>
        <DatePicker />
        </label>
        
      </form>
    </section>
  );
}
