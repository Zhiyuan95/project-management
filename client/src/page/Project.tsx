import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../component/Spinner";
import ClientInfo from "../component/ClientInfo";
import DeleteProjectBtn from "../component/DeleteProjectBtn";
import EditProjectForm from "../component/EditProjectForm";
// import EditProjectForm from "../component/EditProjectForm";
// import DeleteProjectButton from "../component/DeleteProjectButton";

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;
  const project = data.project;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1> {project.name} </h1>
          <p>{project.description} </p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{project.status}</p>
          <ClientInfo client={project?.client} />
          <EditProjectForm project={project} />
          <DeleteProjectBtn projectId={project?.id} />
        </div>
      )}
    </>
  );
};

export default Project;
