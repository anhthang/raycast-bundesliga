import { useEffect, useState } from "react";
import { getClubs } from "../api";
import { Club } from "../types";

export const useClubs = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getClubs().then((data) => {
      setClubs(data);
      setLoading(false);
    });
  });

  return { clubs, loading };
};
