import { useContext } from "react";
import { DoImageOperations, SubOperationSelection } from ".";
import { OPERATION_TO_PERFORM } from "../constants";
import { AppContext } from "../context";

export const EditingProperties = () => {
  const { operationToPerform, setOperationToPerform } = useContext(AppContext);

  return (
    <>
      <div style={{}}>
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.6rem",
          }}
        >
          Select the operation you want to perform
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3rem",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor:
                operationToPerform === OPERATION_TO_PERFORM.ADD_BACKGROUND
                  ? "#7d70ff"
                  : "white",
              padding: "1rem 1rem",
              color:
                operationToPerform === OPERATION_TO_PERFORM.ADD_BACKGROUND
                  ? "white"
                  : "black",
              fontWeight: "bold",
              width: "150px",
              textAlign: "center",
              boxShadow: "inset 0 0 0 2px #7d70ff",
              cursor: "pointer",
            }}
            onClick={() => {
              setOperationToPerform(OPERATION_TO_PERFORM.ADD_BACKGROUND);
            }}
          >
            Add Background
          </div>
          <div
            style={{
              backgroundColor:
                operationToPerform === OPERATION_TO_PERFORM.REMOVE_BACKGROUND
                  ? "#7d70ff"
                  : "white",
              padding: "1rem 1rem",
              color:
                operationToPerform === OPERATION_TO_PERFORM.REMOVE_BACKGROUND
                  ? "white"
                  : "black",
              fontWeight: "bold",
              width: "150px",
              textAlign: "center",
              boxShadow: "inset 0 0 0 2px #7d70ff",
              cursor: "pointer",
            }}
            onClick={() => {
              setOperationToPerform(OPERATION_TO_PERFORM.REMOVE_BACKGROUND);
            }}
          >
            Remove Background
          </div>
          <div
            style={{
              backgroundColor:
                operationToPerform === OPERATION_TO_PERFORM.ENHANCE_IMAGE
                  ? "#7d70ff"
                  : "white",
              padding: "1rem 1rem",
              color:
                operationToPerform === OPERATION_TO_PERFORM.ENHANCE_IMAGE
                  ? "white"
                  : "black",
              fontWeight: "bold",
              width: "150px",
              textAlign: "center",
              boxShadow: "inset 0 0 0 2px #7d70ff",
              cursor: "pointer",
            }}
            onClick={() => {
              setOperationToPerform(OPERATION_TO_PERFORM.ENHANCE_IMAGE);
            }}
          >
            Enhance Image
          </div>
        </div>
        {/*  */}
        {operationToPerform !== "" && <SubOperationSelection />}
        {operationToPerform !== "" && <DoImageOperations />}
      </div>
    </>
  );
};
