import { connectToDB } from "@utils/database";
import Task from "@models/task";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    const { id } = params;
    const { updatedStatus: status } = await req.json();
    await connectToDB();
    await Task.findByIdAndUpdate(id, {status});
    return NextResponse.json({message: "task updated"}, {status: 200});
}

// export async function GET(req, { params }) {
//     const { id } = params;
//     await connectToDB();
//     const task = await Task.findById(id);
//     return NextResponse.json({ task }, { status:200 });
// }

export async function GET(req, { params }) {
    const { id } = params;

    try {
    await connectToDB();

    const tasks = await Task.find({projectID:id});
    const taskCount = await Task.count({projectID:id});
    
    const todo = await Task.find({status: "Todo", projectID:id});
    const todoCount = await Task.count({status: "Todo", projectID:id});

    const inProgress = await Task.find({status: "InProgress",projectID:id});
    const inProgressCount = await Task.count({status: "InProgress",projectID:id});

    const done = await Task.find({status: "Done",projectID:id});
    const doneCount = await Task.count({status: "Done",projectID:id});

    const backlog = await Task.find({status: "Backlog",projectID:id});
    const backlogCount = await Task.count({status: "Backlog",projectID:id});

    const cancelled = await Task.find({status: "Cancelled",projectID:id});
    const cancelledCount = await Task.count({status: "Cancelled",projectID:id});

    return NextResponse.json({
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
        cancelledCount}, {status: 200});
    }catch(error){
        return NextResponse.json({status: 500});
    }
}
