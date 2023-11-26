"use client";
import Dashboard_Nav from "@components/Dashboard_Nav";
import TaskCard from "@components/TaskCard";
import { useRouter } from "next/navigation";
import { useState } from "react";


const getTasks = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
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

const updateStatus = async (taskId, status, projectId, progress) => {
  
  try {
    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
      updatedStatus: status
      }),
    });
    await updateProgress(projectId, progress);
    return response;
  } catch (error) {
    console.log(error);
  }
}

const updateProgress = async (projectId, progress) => {
  
  try {
    const response = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify({
      progress: progress,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}


export default async function ProjectPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const {
    tasks,
    taskCount, 
    todo, 
    todoCount,
    inProgress, 
    inProgressCount,
    done,
    doneCount,
    backlog,
    backlogCount,
    cancelled,
    cancelledCount} = await getTasks(id);

    let progress = (doneCount / (taskCount - cancelledCount)) * 100;

    const dragingOverInProgress = (e) => {
      e.preventDefault();
      console.log("draging over InProgress!");
    }

    const handleDropInProgress = async (e) => {
      let transferedTaskId = e.dataTransfer.getData("taskId");
      console.log("you have dropped id:" + transferedTaskId);
      let response = await updateStatus(transferedTaskId, "InProgress", id, progress);
      await updateProgress(id, progress);
      if(response.ok){
        router.refresh();
      }
    }

    const dragingOverTodo = (e) => {
      e.preventDefault();
      console.log("draging over Todo!");
    }

    const handleDropInTodo = async (e) => {
      let transferedTaskId = e.dataTransfer.getData("taskId");
      console.log("you have dropped id:" + transferedTaskId);
      let response = await updateStatus(transferedTaskId, "Todo", id, progress);
      if(response.ok){
        router.refresh();
      }
    }

    const dragingOverBacklog = (e) => {
      e.preventDefault();
      console.log("draging over Backlog!");
    }

    const handleDropInBacklog = async (e) => {
      let transferedTaskId = e.dataTransfer.getData("taskId");
      console.log("you have dropped id:" + transferedTaskId);
      let response = await updateStatus(transferedTaskId, "Backlog", id, progress);
      if(response.ok){
        router.refresh();
      }
    }

    const dragingOverDone = (e) => {
      e.preventDefault();
      console.log("draging over Done!");
    }

    const handleDropInDone = async (e) => {
      let transferedTaskId = e.dataTransfer.getData("taskId");
      console.log("you have dropped id:" + transferedTaskId);
      let response = await updateStatus(transferedTaskId, "Done", id, progress);
      if(response.ok){
        router.refresh();
      }
    }

    const dragingOverCancelled = (e) => {
      e.preventDefault();
      console.log("draging over Cancelled!");
    }

    const handleDropInCancelled = async (e) => {
      let transferedTaskId = e.dataTransfer.getData("taskId");
      console.log("you have dropped id:" + transferedTaskId);
      let response = await updateStatus(transferedTaskId, "Cancelled", id, progress);
      if(response.ok){
        router.refresh();
      }
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
                {backlogCount}
              </span>
              
            </div>
            <div className="flex flex-col pb-2 overflow-auto" onDragOver={(e) => dragingOverBacklog(e)} onDrop={(e) => handleDropInBacklog(e)}>
            {backlog.map((t)=>{
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
                {inProgressCount}
              </span>
              
            </div>
            <div onDragOver={(e) => dragingOverInProgress(e)} onDrop={(e) => handleDropInProgress(e)} className="flex flex-col pb-2 overflow-auto">
            {inProgress.map((t)=>{
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
                {todoCount}
              </span>
              
            </div>
            <div className="flex flex-col pb-2 overflow-auto" onDragOver={(e) => dragingOverTodo(e)} onDrop={(e) => handleDropInTodo(e)}>
              {todo.map((t)=>{
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
                {doneCount}
              </span>
              
            </div>
            <div className="flex flex-col pb-2 overflow-auto" onDragOver={(e) => dragingOverDone(e)} onDrop={(e) => handleDropInDone(e)}>
            {done.map((t)=>{
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
                {cancelledCount}
              </span>
              
            </div>
            <div className="flex flex-col pb-2 overflow-auto" onDragOver={(e) => dragingOverCancelled(e)} onDrop={(e) => handleDropInCancelled(e)}>
            {cancelled.map((t)=>{
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
