import React from "react";
import Client from "./Client";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import DELETE_CLIENT from "../mutations/clientMutations";
import GET_CLIENTS from "../queries/clientQueries";

interface ClientRowProps {
  client: Client; // Define the prop type
}

const ClientRow: React.FC<ClientRowProps> = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });

  const handleDeleteClient = () => {
    // execute deleteClient mutation
    deleteClient();
    console.log("id is", client.id, client.name);
  };

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          //   type="button"
          className="btn btn-danger btn-sm"
          onClick={handleDeleteClient}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
