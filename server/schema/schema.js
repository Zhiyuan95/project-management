// import { projects, clients } from "../sampleData.js";
import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
//bring in Mongo models
import Project from "../models/Project.js";
import Client from "../models/Client.js";

//clients type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//project type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parentValue, args) {
        Client.findById(parentValue.clientId);
      },
    },
  }),
});

//Query
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parentValue, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return Client.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parentValue, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return Project.findById(args.id);
      },
    },
  },
});

//Mutation
const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //add a client to the DB
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        const newClient = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        //save to the DB
        return newClient.save();
      },
    },
    //delete a client
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return Client.findByIdAndRemove(args.id);
      },
    },
    //add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        clientId: { type: GraphQLNonNull(GraphQLID) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              complete: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
      },
      resolve(parentValue, args) {
        const newProject = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return newProject.save();
      },
    },
    //delete a project
    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },
    //update a project
    updateProject: {
      type: ProjectType,
      args: {
        //we remove GraphQLNoNull, as users can update name or description or clientId
        name: { type: GraphQLString },
        id: { type: GraphQLNonNull(GraphQLID) },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdated",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              complete: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parentValue, args) {
        const projectToUpdate = Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
        return projectToUpdate;
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: RootMutation });
