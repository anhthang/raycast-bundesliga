import { useEffect, useState } from "react";
import { getResults } from "../api";
import { Matchday } from "../types/firebase";

export const useFixtures = () => {
  const [fixtures, setFixtures] = useState<Matchday[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setFixtures([]);

    getResults().then((data) => {
      setFixtures(data);
      setLoading(false);
    });
  }, []);

  return { fixtures, loading };
};
