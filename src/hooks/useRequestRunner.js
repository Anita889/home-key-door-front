import { useState } from "react";

const initialResult = {
  title: "Ready",
  data: {
    message: "Select a route and run a backend action."
  }
};

export function useRequestRunner() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(initialResult);

  const run = async (title, request) => {
    setBusy(true);

    try {
      const data = await request();
      setResult({ title, data });
      return data;
    } catch (error) {
      setResult({
        title: `${title} Failed`,
        data: { error: error.message }
      });
      throw error;
    } finally {
      setBusy(false);
    }
  };

  return {
    busy,
    result,
    run
  };
}
