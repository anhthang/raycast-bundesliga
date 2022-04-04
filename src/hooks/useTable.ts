import { useEffect, useState } from "react";
import { getTable } from "../api";
import { Entry } from "../types/firebase";

export const useTable = () => {
  const [table, setTable] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTable([]);
    getTable().then((data) => {
      setTable(data);
      setLoading(false);
    });
  }, []);

  return { table, loading };
};
