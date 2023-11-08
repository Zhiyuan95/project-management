import AddClientModal from "../component/AddClientModal";
import AddProjectModal from "../component/AddProjectModa";
import Client from "../component/Client";
import Project from "../component/Project";

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Project />
      <hr />
      <Client />
    </>
  );
};

export default Home;
