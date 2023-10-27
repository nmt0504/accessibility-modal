import { useState } from "react";
import Modal from "./components/Modal";

import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ModalBody = (
    <>
      <p>Content for test</p>
      <input type="text" />
      <input type="text" placeholder="address" />
    </>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h2>Click the button to open modal!</h2>
        <button
          className="App-link"
          aria-haspopup="true"
          rel="noopener noreferrer"
          aria-expanded={isModalOpen}
          onClick={(e) => openModal()}
        >
          Open Modal
        </button>
        <Modal
          isOpen={isModalOpen}
          title="Title"
          content={ModalBody}
          onClose={closeModal}
        />
      </header>
    </div>
  );
}

export default App;
