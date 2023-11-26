import { connectToDB } from "@utils/database";
import Project from "@models/project";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    const { id } = params;
    const { newTitle: title, newDescription: description, newProgress: progress, newUsers: users, newDeadline: deadline } = await req.json();
    await connectToDB();
    await Project.findByIdAndUpdate(id, {title, description, progress, users, deadline});
    return NextResponse.json({message: "file updated"}, {status: 200});
}

export async function GET(req, { params }) {
    const { id } = params;
    await connectToDB();
    const project = await Project.findOne({ _id: id });
    return NextResponse.json({ project }, { status:200 });
}

export async function PATCH(req, { params }) {
    const { id } = params;
    const { progress: progress } = await req.json();
    await connectToDB();
    await Project.findByIdAndUpdate(id, {progress});
    return NextResponse.json({message: "project progress updated"}, {status: 200});
}

