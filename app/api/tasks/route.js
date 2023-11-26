
import { connectToDB } from "@utils/database";
import Task from "@models/task";
import { NextResponse } from "next/server";

export async function POST(req){
    const { projectID, description, tag, status, users, deadline } = await req.json();

    try {
        await connectToDB();
        await Task.create({
            projectID,
            description,
            users,
            deadline,
            tag,
            status
        });

        return NextResponse.json({message: "Task created!"}, { status: 201 });

    } catch (error) {
        return NextResponse.json("Failed to create Task", { status: 500 });
    }
}

export async function GET() {
    try{
        await connectToDB();
        const tasks = await Task.find({});
        const taskCount = await Task.count({});
        
        const todo = await Task.find({status: "Todo"});
        const todoCount = await Task.count({status: "Todo"});

        const inProgress = await Task.find({status: "InProgress"});
        const inProgressCount = await Task.count({status: "InProgress"});

        const done = await Task.find({status: "Done"});
        const doneCount = await Task.count({status: "Done"});

        const backlog = await Task.find({status: "Backlog"});
        const backlogCount = await Task.count({status: "Backlog"});

        const cancelled = await Task.find({status: "Cancelled"});
        const cancelledCount = await Task.count({status: "Cancelled"});
        
        
        
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


export async function DELETE(req) {
    try{
        const id = req.nextUrl.searchParams.get("id");
        await connectToDB();
        await Task.findByIdAndDelete(id);
        return NextResponse.json({message: "Project Deleted"}, {status: 200});
    }catch(error){
        return NextResponse.json({status: 500});
    }
}