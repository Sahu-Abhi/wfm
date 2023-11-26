"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DatePicker } from "./DatePicker";

export default function AddProject({ togglePopover }) {
  const router = useRouter();
  const {data: session } = useSession(); 
  const [submitting, setSubmitting] = useState(false);
  const [project, setProject] = useState({
    title: "",
    description: "",
    users: "",
    deadline: "",
  });

  const addProject = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try{
      const response = await fetch('http://localhost:3000/api/projects',{
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          title: project.title,
          description: project.description,
          progress: '0',
          users: project.users,
          deadline: project.deadline
        })
      })
      if(response.ok) {
        router.refresh();
      }
    }catch(error){
      console.log(error);
    }finally{
      setSubmitting(false); 
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
    <h1 className="text-left">
      <span className="blue_gradient">Add Project</span>
    </h1>

    <form
      onSubmit={addProject}
      className="mt-2 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
      <label>
        <span
          className="font-satoshi font-semibold text-base
                  text-gray-700">
          Project Name
        </span>
        <input
          type="text"
          value={project.title}
          onChange={(e) => {
            setProject({ ...project, title: e.target.value });
            console.log(e.target.value);
          }}
          placeholder="Enter project name..."
          required
          className="form_input"
        />
      </label>
      <label>
        <span
          className="font-satoshi font-semibold text-base
                  text-gray-700">
          Description
        </span>
        <input
          type="text"
          value={project.description}
          onChange={(e) => {
            setProject({
              ...project,
              description: e.target.value,
            });
            console.log(e.target.value);
          }}
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
          onChange={(e) => {
            setProject({
              ...project,
              users: e.target.value,
            });
            console.log(e.target.value);
          }}
          placeholder="Add team members..."
          required
          className="form_input"
        />
      </label>
      <label>
        <span
          className="font-satoshi font-semibold text-base
                  text-gray-700 mr-4">
          Deadline
        </span>
        <DatePicker
          handleDeadline={(date) => {
            setProject({ ...project, deadline: date });
          }}
        />
      </label>
      <div className="flex-end mx-3 mb-5 gap-4">
        <button type="button" onClick={() => togglePopover((p) => !p)}>
          <span
            className="text-gray-500
          text-sm">
            Cancel
          </span>
        </button>

        <button
          type="submit"
          onClick={() => togglePopover((p) => !p)}
          disabled={submitting}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
          Add
        </button>
      </div>
    </form>
  </section>
  );
}
