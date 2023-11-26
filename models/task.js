import { Schema, model, models } from 'mongoose';

const taskSchema = new Schema( {
    projectID: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    description: {
        type: String, 
        required : [true, "task title is required!"],
    },
    users: String,
    deadline: String,
    tag: String,
    status: String,
    
},{
    timestamps: true
});

const Task = models.Task || model('Task', taskSchema);

export default Task;