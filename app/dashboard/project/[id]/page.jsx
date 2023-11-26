"use client";
import Dashboard_Nav from "@components/Dashboard_Nav";
import TaskCard from "@components/TaskCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const getTasks = async (id) => {
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading Tasks...", error);
  }
};

const updateStatus = async (taskId, status, projectId, progress, setIsUpdated) => {
  
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
      updatedStatus: status
      }),
    });
    await updateProgress(projectId, progress);
    if(response.ok){
      setIsUpdated(true);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}

const updateProgress = async (projectId, progress, setIsUpdated) => {
  
  try {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify({
      progress: Math.ceil(progress),
      }),
    });
    if(response.ok){
      setIsUpdated(true);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}


export default function ProjectPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [task, settask] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  if(isUpdated){
    router.refresh();
  }
  const getData = async () => {
    const result = await getTasks(id);
    settask(result);
  }
  
  useEffect(() => {
    getData();
    setIsUpdated(false);
  }, [isUpdated])

    let progress = task && task?.doneCount / (task?.taskCount - task?.cancelledCount) * 100;

    const dragingOverInProgress = (e) => {
      e.preventDefault();
      console.log("draging over InProgress!");
    }

    const handleDropInProgress = async (e) => {
      let transferedTaskId = e.dataTransfer.getData("taskId");
      console.log("you have dropped id:" + transferedTaskId);
      await updateStatus(transferedTaskId, "InProgress", id, progress, setIsUpdated);
      await updateProgress(id, progress, setIsUpdated);
    }

    const dragingOverTodo = (e) => {
      e.preventDefault();
      console.log("draging over Todo!");
    }

    const handleDropInTodo = async (e) => {
      let transferedTaskId = e.dataTransfer.getData("taskId");
      console.log("you have dropped id:" + transferedTaskId);
      await updateStatus(transferedTaskId, "Todo", id, progress, setIsUpdated);
      await updateProgress(id, progress, setIsUpdated);
    }

    const dragingOverBacklog = (e) => {
      e.preventDefault();
      console.log("draging over Backlog!");
    }

    const handleDropInBacklog = async (e) => {
      let transferedTaskId = e.dataTransfer.getData("taskId");
      console.log("you have dropped id:" + transferedTaskId);
      await updateStatus(transferedTaskId, "Backlog", id, progress, setIsUpdated);
      await updateProgress(id, progress, setIsUpdated);
    }

    const dragingOverDone = (e) => {
      e.preventDefault();
      console.log("draging over Done!");
    }

    const handleDropInDone = async (e) => {
      let transferedTaskId = e.dataTransfer.getData("taskId");
      console.log("you have dropped id:" + transferedTaskId);
      await updateStatus(transferedTaskId, "Done", id, progress, setIsUpdated);
      await updateProgress(id, progress, setIsUpdated);
    }

    const dragingOverCancelled = (e) => {
      e.preventDefault();
      console.log("draging over Cancelled!");
    }

    const handleDropInCancelled = async (e) => {
      let transferedTaskId = e.dataTransfer.getData("taskId");
      console.log("you have dropped id:" + transferedTaskId);
      await updateStatus(transferedTaskId, "Cancelled", id, progress, setIsUpdated);
      await updateProgress(id, progress, setIsUpdated);
    }

  return (
    <div>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        
        <Dashboard_Nav isInsideProjectCard={true} projectID = {id}/>
        
        <div className="px-10 mt-6">
          <h1 className="text-2xl font-bold"> Team Project Board</h1>
        </div>
        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
          <div className="flex flex-col flex-shrink-0 w-72">
            <div className="flex items-center flex-shrink-0 h-10 px-2">
              <span className="block text-sm font-semibold">Backlog</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {task && task.backlogCount}
              </span>
              
            </div>
            <div className="flex flex-col pb-2 overflow-auto" onDragOver={(e) => dragingOverBacklog(e)} onDrop={(e) => handleDropInBacklog(e)}>
            {task && task.backlog.map((t)=>{
                return (<TaskCard 
                  key={t._id}
                  id={t._id}
                  description={t.description}
                  tag={t.tag}
                  deadline={t.deadline}
                />);
              })}
            </div>
          </div>

          {/* In Progress Section */}

          <div className="flex flex-col flex-shrink-0 w-72">
            <div className="flex items-center flex-shrink-0 h-10 px-2">
              <span className="block text-sm font-semibold">In Progress</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {task && task.inProgressCount}
              </span>
              
            </div>
            <div onDragOver={(e) => dragingOverInProgress(e)} onDrop={(e) => handleDropInProgress(e)} className="flex flex-col pb-2 overflow-auto">
            {task && task.inProgress.map((t)=>{
                return (<TaskCard 
                  key={t._id}
                  id={t._id}
                  description={t.description}
                  tag={t.tag}
                  deadline={t.deadline}
                />);
              })}
            </div>
          </div>

          {/* Todo Section */}
          <div className="flex flex-col flex-shrink-0 w-72">
            <div className="flex items-center flex-shrink-0 h-10 px-2">
              <span className="block text-sm font-semibold">Todo</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {task && task.todoCount}
              </span>
              
            </div>
            <div className="flex flex-col pb-2 overflow-auto" onDragOver={(e) => dragingOverTodo(e)} onDrop={(e) => handleDropInTodo(e)}>
              {task && task.todo.map((t)=>{
                return (<TaskCard 
                  key={t._id}
                  id={t._id}
                  description={t.description}
                  tag={t.tag}
                  deadline={t.deadline}
                />);
              })}
              
            </div>
          </div>

          {/* Done Section */}
          <div className="flex flex-col flex-shrink-0 w-72">
            <div className="flex items-center flex-shrink-0 h-10 px-2">
              <span className="block text-sm font-semibold">Done</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {task && task.doneCount}
              </span>
              
            </div>
            <div className="flex flex-col pb-2 overflow-auto" onDragOver={(e) => dragingOverDone(e)} onDrop={(e) => handleDropInDone(e)}>
            {task && task.done.map((t)=>{
                return (<TaskCard 
                  key={t._id}
                  id={t._id}
                  description={t.description}
                  tag={t.tag}
                  deadline={t.deadline}
                />);
              })}
            </div>
          </div>

          {/* Cancelled Section */}
          <div className="flex flex-col flex-shrink-0 w-72">
            <div className="flex items-center flex-shrink-0 h-10 px-2">
              <span className="block text-sm font-semibold">Cancelled</span>
              <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
                {task && task.cancelledCount}
              </span>
              
            </div>
            <div className="flex flex-col pb-2 overflow-auto" onDragOver={(e) => dragingOverCancelled(e)} onDrop={(e) => handleDropInCancelled(e)}>
            {task && task.cancelled.map((t)=>{
                return (<TaskCard 
                  key={t._id}
                  id={t._id}
                  description={t.description}
                  tag={t.tag}
                  deadline={t.deadline}
                />);
              })}
            </div>
          </div>
          
          <div className="flex-shrink-0 w-6"></div>
        </div>
      </div>
    </div>
  );
}
