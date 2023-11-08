import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../component/Spinner";
import ClientInfo from "../component/ClientInfo";
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
          <ClientInfo client={project?.client} />
        </div>
      )}
    </>
  );
};

export default Project;
