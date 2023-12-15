import { Box, Slider, TextField } from "@mui/material";
import { OPERATION_TO_PERFORM } from "../constants";
import React, { useContext } from "react";
import { AppContext } from "../context";

export const SubOperationSelection = () => {
  const {
    operationToPerform,
    addBackgroundPromptValue,
    setAddBackgroundPromptValue,
    doTransparentBgRemoval,
    setDoTransparentBgRemoval,
    hdrPercentageForImageEnhancement,
    setHdrPercentageForImageEnhancement,
  } = useContext(AppContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      {operationToPerform !== "" && (
        <p
          style={{
            marginTop: "-1rem",
            fontSize: "1.2rem",
            fontWeight: "bolder",
          }}
        >
          Sub Operation
        </p>
      )}
      {operationToPerform === OPERATION_TO_PERFORM.ADD_BACKGROUND && (
        <React.Fragment>
          <p>Give a prompt for your background generation</p>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              value={addBackgroundPromptValue}
              onChange={(e) => {
                setAddBackgroundPromptValue(e.target.value);
              }}
              id="outlined-basic"
              label="Promt"
              variant="outlined"
              style={{
                width: "350px",
              }}
            />
          </Box>
        </React.Fragment>
      )}
      {operationToPerform === OPERATION_TO_PERFORM.REMOVE_BACKGROUND && (
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <div
            style={{
              backgroundColor: doTransparentBgRemoval ? "#7d70ff" : "white",
              padding: "1rem 0",
              color: doTransparentBgRemoval ? "white" : "black",
              fontWeight: "bold",
              width: "150px",
              textAlign: "center",
              boxShadow: "inset 0 0 0 2px #7d70ff",
              cursor: "pointer",
            }}
            onClick={() => {
              setDoTransparentBgRemoval(true);
            }}
          >
            Transparent BG
          </div>
          <div
            style={{
              backgroundColor: !doTransparentBgRemoval ? "#7d70ff" : "white",
              padding: "1rem ",
              color: !doTransparentBgRemoval ? "white" : "black",
              fontWeight: "bold",
              width: "150px",
              textAlign: "center",
              boxShadow: "inset 0 0 0 2px #7d70ff",
              cursor: "pointer",
            }}
            onClick={() => {
              setDoTransparentBgRemoval(false);
            }}
          >
            White BG
          </div>
        </div>
      )}
      {operationToPerform === OPERATION_TO_PERFORM.ENHANCE_IMAGE && (
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Box sx={{ width: 300 }}>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.4rem",
              }}
            >
              HDR Percentage{" "}
              <span
                style={{
                  fontSize: "1.1rem",
                  display: "block",
                }}
              >
                (For best result keep it 100)
              </span>
            </p>
            <Slider
              value={hdrPercentageForImageEnhancement}
              onChange={(e) => {
                // console.log(e);
                setHdrPercentageForImageEnhancement(e.target.value);
              }}
              defaultValue={100}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </Box>
        </div>
      )}
    </div>
  );
};
