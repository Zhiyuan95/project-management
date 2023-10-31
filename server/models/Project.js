import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Process", "Completed"],
  },
  clientId: {
    //it means clientId equals to client schema's id
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;