
import { connectToDB } from "@utils/database";
import Project from "@models/project";
import { NextResponse } from "next/server";

export async function POST(req){
    const { userId, title, description, progress, users, deadline } = await req.json();

    try {
        await connectToDB();
        await Project.create({
            creator: userId,
            title,
            description,
            progress,
            users,
            deadline
        });

        return NextResponse.json({message: "created!"}, { status: 201 });

    } catch (error) {
        return NextResponse.json("Failed to create Project", { status: 500 });
    }
}

export async function GET() {
    try{
        await connectToDB();
        const projects = await Project.find({}).populate('creator');
        const projectCount = await Project.count();
        return NextResponse.json({ projects, projectCount }, {status: 200});
    }catch(error){
        return NextResponse.json({status: 500});
    }
}

export async function DELETE(req) {
    try{
        const id = req.nextUrl.searchParams.get("id");
        await connectToDB();
        await Project.findByIdAndDelete(id);
        return NextResponse.json({message: "Project Deleted"}, {status: 200});
    }catch(error){
        return NextResponse.json({status: 500});
    }
}