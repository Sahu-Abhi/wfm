"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker } from "./DatePicker";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AddTask({ togglePopover, projectID }) {
  console.log(projectID);
  const router = useRouter();
  const [tag, setTag] = useState("Dev");
  const [submitting, setSubmitting] = useState(false);
  const [task, setTask] = useState({
    description: "",
    users: "",
    deadline: "",
    tag: "",
  });

  const addTask = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          projectID: projectID,
          description: task.description,
          users: task.users,
          deadline: task.deadline,
          tag: tag,
          status: "Todo",
        }),
      });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="text-left">
        <span className="blue_gradient">Task</span>
      </h1>

      <form
        onSubmit={addTask}
        className="mt-2 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span
            className="font-satoshi font-semibold text-base
                  text-gray-700">
            Task Description
          </span>
          <input
            type="text"
            value={task.description}
            onChange={(e) => {
              setTask({ ...task, description: e.target.value });
            }}
            placeholder="Enter task description..."
            required
            className="form_input"
          />
        </label>
        <label>
          <span
            className="font-satoshi font-semibold text-base
                  text-gray-700 mr-4">
            Tag
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{tag}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Tag</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={tag} onValueChange={setTag}>
                <DropdownMenuRadioItem value="Dev">Dev</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Design">
                  Design
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Copywriting">
                  Copywriting
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </label>
        <label>
          <span
            className="font-satoshi font-semibold text-base
                  text-gray-700">
            Link Users
          </span>
          <input
            type="text"
            value={task.users}
            onChange={(e) => {
              setTask({
                ...task,
                users: e.target.value,
              });
            }}
            placeholder="Add task members..."
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
              setTask({ ...task, deadline: date });
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
            Add Task
          </button>
        </div>
      </form>
    </section>
  );
}
