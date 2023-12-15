import { useContext, useState } from "react";
import { AppContext } from "../context";
import { BASE_URL, OPERATION_TO_PERFORM } from "../constants";
import { Loader2 } from "lucide-react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

export const DoImageOperations = () => {
  const {
    imageToUpload,
    operationToPerform,
    addBackgroundPromptValue,
    doTransparentBgRemoval,
    hdrPercentageForImageEnhancement,
    setOutputUrl,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const processImagehandler = async () => {
    setLoading(true);
    let data = {};
    let endpoint = "upload";

    const res = await fetch(imageToUpload.objectUrl);
    const blob = await res.blob();

    const imageFile = new File([blob], imageToUpload.name, {
      type: blob.type,
    });

    const formData = new FormData();
    formData.append("image", imageFile);

    if (operationToPerform === OPERATION_TO_PERFORM.REMOVE_BACKGROUND) {
      data = {
        operations: {
          background: {
            remove: true,
            color: doTransparentBgRemoval ? "transparent" : "#ffffff",
          },
        },
        output: {
          format: "png",
        },
      };
    }

    if (operationToPerform === OPERATION_TO_PERFORM.ENHANCE_IMAGE) {
      data = {
        operations: {
          adjustments: {
            hdr: hdrPercentageForImageEnhancement,
          },
        },
      };
    }

    if (operationToPerform === OPERATION_TO_PERFORM.ADD_BACKGROUND) {
      endpoint = "addbackground";
      data = {
        prompt: addBackgroundPromptValue.trim(),
      };
    }

    formData.append("data", JSON.stringify(data));
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data2 = await response.json();

        console.log(data2);
        setOutputUrl(data2?.temp_url);
      }
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error("An error occured");
    }
    setLoading(false);
  };
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "2rem",
      }}
    >
      {loading && (
        <div>
          <Loader2
            style={{
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}
      {!loading && (
        <Button
          onClick={processImagehandler}
          style={{
            backgroundColor: "#7d70ff",
          }}
          component="label"
          variant="contained"
        >
          Start Image processing
        </Button>
      )}
    </div>
  );
};
