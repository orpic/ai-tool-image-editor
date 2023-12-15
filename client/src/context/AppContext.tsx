import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type ContextType = {
  imageToUpload: {
    name: string;
    objectUrl: string;
  };
  setImageToUpload: React.Dispatch<
    React.SetStateAction<{
      name: string;
      objectUrl: string;
    }>
  >;
  operationToPerform: string;
  setOperationToPerform: Dispatch<SetStateAction<string>>;
  addBackgroundPromptValue: string;
  setAddBackgroundPromptValue: Dispatch<SetStateAction<string>>;
  doTransparentBgRemoval: boolean;
  setDoTransparentBgRemoval: Dispatch<SetStateAction<boolean>>;
  hdrPercentageForImageEnhancement: number;
  setHdrPercentageForImageEnhancement: Dispatch<SetStateAction<number>>;
  outputUrl: string;
  setOutputUrl: Dispatch<SetStateAction<string>>;
};

export const AppContext = createContext<ContextType>({
  imageToUpload: { name: "", objectUrl: "" },
  setImageToUpload: () => {},
  operationToPerform: "",
  setOperationToPerform: () => {},
  addBackgroundPromptValue: "",
  setAddBackgroundPromptValue: () => {},
  doTransparentBgRemoval: false,
  setDoTransparentBgRemoval: () => {},
  hdrPercentageForImageEnhancement: 100,
  setHdrPercentageForImageEnhancement: () => {},
  outputUrl: "",
  setOutputUrl: () => {},
});

type Props = {
  children: ReactNode;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [imageToUpload, setImageToUpload] = useState({
    name: "",
    objectUrl: "",
  });
  const [operationToPerform, setOperationToPerform] = useState("");
  const [addBackgroundPromptValue, setAddBackgroundPromptValue] = useState("");
  const [doTransparentBgRemoval, setDoTransparentBgRemoval] = useState(false);
  const [
    hdrPercentageForImageEnhancement,
    setHdrPercentageForImageEnhancement,
  ] = useState(100);

  const [outputUrl, setOutputUrl] = useState("");

  return (
    <AppContext.Provider
      value={{
        imageToUpload,
        setImageToUpload,
        operationToPerform,
        setOperationToPerform,
        addBackgroundPromptValue,
        setAddBackgroundPromptValue,
        doTransparentBgRemoval,
        setDoTransparentBgRemoval,
        hdrPercentageForImageEnhancement,
        setHdrPercentageForImageEnhancement,
        outputUrl,
        setOutputUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
