import { useContext } from "react";
import { AppContext } from "./context";
import { EditingProperties, ImageComparison, ImageUpload } from "./components";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { imageToUpload, outputUrl } = useContext(AppContext);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={20000}
        hideProgressBar={false}
        newestOnTop={true}
        transition={Slide}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        // limit={2}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ImageUpload />
        {imageToUpload.name && <p>Image: {imageToUpload.name}</p>}
        {imageToUpload.name && imageToUpload.objectUrl && <EditingProperties />}
        {outputUrl && imageToUpload.name && imageToUpload.objectUrl && (
          <ImageComparison
            imageAfter={outputUrl}
            imageBeforeObjectUrl={imageToUpload.objectUrl}
          />
        )}
      </div>
    </>
  );
}

export default App;
