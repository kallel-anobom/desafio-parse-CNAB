import { useCallback, useState } from "react";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export const useFetchData = <T>(
  url: string,
  methodType: Method = "GET",
  contentType?: string
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchData = useCallback(
    async (body?: any) => {
      setLoading(true);
      setError(null);

      try {
        const headersConfig: HeadersInit = {};

        if (contentType && contentType !== "multipart/form-data") {
          headersConfig["Content-Type"] = contentType;
        }

        const response = await fetch(url, {
          method: methodType,
          headers: headersConfig,
          body: body
            ? contentType === "application/json"
              ? JSON.stringify(body)
              : body
            : undefined,
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const json: T = await response.json();
        setData(json);
        setMessage("Dados enviados com sucesso!");
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [url, methodType, contentType]
  );

  return { data, loading, error, message, fetchData };
};
