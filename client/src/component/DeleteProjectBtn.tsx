import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../mutations/projectMutation";
import { useNavigate } from "react-router-dom";
import { GET_PROJECTS } from "../queries/projectQueries";

const DeleteProjectBtn = ({ projectId }: any) => {
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  const handleClick = () => {
    deleteProject();
  };
  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={handleClick}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectBtn;
