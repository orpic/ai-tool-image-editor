import { Button, styled } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../context";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  pointerEvents: "none",
  backgroundColor: "green",
});

export const ImageUpload = () => {
  const {
    setImageToUpload,

    setOperationToPerform,
    setOutputUrl,
  } = useContext(AppContext);

  function setImageToUploadHandler(file: File) {
    if (file) {
      const fileurl = URL.createObjectURL(file);
      const filename = file.name;

      setImageToUpload({
        name: filename,
        objectUrl: fileurl,
      });
      setOperationToPerform("");
      setOutputUrl("");
    }
  }
  const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setImageToUploadHandler(file);
  };

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files[0];
    setImageToUploadHandler(file);
  };

  return (
    <div
      onDrop={onDropHandler}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnter={(e) => {
        e.preventDefault();
      }}
      style={{
        width: "22rem",
        // height: "10rem",
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        border: "1px dotted gray",
        backgroundColor: "white",
      }}
    >
      <Button
        style={{
          backgroundColor: "#7d70ff",
        }}
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Drag & drop a file here
        <VisuallyHiddenInput
          accept=".jpg, .jpeg, .bmp, .png"
          onChange={onChangeHandler}
          type="file"
        />
      </Button>
      <p
        style={{
          fontSize: "0.8rem",
          fontWeight: "lighter",
          color: "gray",
        }}
      >
        Only JPG, PNG, JPEG, BMP Accepted
      </p>
    </div>
  );
};
