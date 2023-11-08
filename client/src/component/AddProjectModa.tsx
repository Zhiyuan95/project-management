import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/clientMutations";
import GET_CLIENTS from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutation";
import { GET_PROJECTS } from "../queries/projectQueries";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name: name, description: description, clientId: clientId },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name === "" || description === "" || clientId === "")
      return alert("Please fill in all fields");
    addProject();
    setName("");
    setClientId("");
    setDescription("");
    console.log(name, description, clientId);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div className="font-weight-bold">Add Project</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Client Id</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
