import { useState } from "react";
import { useFetchData } from "../../hooks/useFetchData";
import "./index.css";
const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);

  const { loading, error, message, fetchData } = useFetchData(
    "http://localhost:3001/api/upload",
    "POST",
    "multipart/form-data"
  );

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    fetchData(formData);
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Enviando..." : "Upload"}
      </button>
      {error && <p>Erro: {error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadForm;
