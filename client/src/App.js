import { useState } from "react";
import Modal from "./Modal";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

const OTHER_CONTENT_STYLES = {
  position: "relative",
  zIndex: 2,
  backgroundColor: "red",
  padding: "10px",
};

export default function App() {
  const [isOpen, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const formData = new FormData();
  formData.append("file", file);

  const PostData = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("/submit-pdf", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const GetPdf = async() => {
    const fun = async () => {
      try {
        const res = await fetch("/view-pdf");
        const response = await res.blob();
        return response;
      } catch (error) {
        console.error(error);
      }
    };
    try {
      const response = await fun();
      const x = URL.createObjectURL(response);
      const newWindow = window.open("", "_blank");
      newWindow.location.href = x;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div style={BUTTON_WRAPPER_STYLES}>
        <button onClick={() => setOpen(true)}>Open Modal</button>
      </div>
      <Modal p={isOpen} q={() => setOpen(false)} />
      {/* <div style={OTHER_CONTENT_STYLES}>Other Content</div> */}
      <form encType="multipart/form-data">
        <a href="/">Home</a>
        <h2>Upload pdf</h2>
        <input
          type="file"
          required="required"
          name="file"
          onChange={handleFileChange}
        />
        <button type="submit" onClick={PostData}>
          submit
        </button>
      </form>
      <button onClick={GetPdf}>view pdf</button>
    </>
  );
}
