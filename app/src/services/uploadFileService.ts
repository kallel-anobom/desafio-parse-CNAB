const uploadFileService = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:3001/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Falha ao fazer upload do arquivo.");
  }

  return await response.json();
};

export default uploadFileService;
