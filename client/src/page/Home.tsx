import AddClientModal from "../component/AddClientModal";
import Client from "../component/Client";
import Project from "../component/Project";

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
      </div>
      <Project />
      <hr />
      <Client />
    </>
  );
};

export default Home;
