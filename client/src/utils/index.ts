export const getOriginalImage = async (name: string, objectUrl: string) => {
  if (name === "" || objectUrl === "") {
    return undefined;
  }
  const res = await fetch(objectUrl);
  const blob = await res.blob();

  const imageFile = new File([blob], name, {
    type: blob.type,
  });

  return imageFile;
};
