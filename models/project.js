import { Schema, model, models } from 'mongoose';

const projectSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String, 
        required : [true, "Project name is required!"],
    },
    description: {
        type: String,
        required: [true, "Deadline is required!"],
    },
    progress: String,
    users: String,
    deadline: String,
},{
    timestamps: true
});

const Project = models.Project || model('Project', projectSchema);

export default Project;