import { useEffect, useState } from "react";
import { getFixtures } from "../api";
import { Matchday } from "../types/firebase";

export const useFixtures = (
  competition: string,
  season?: string,
  matchday?: number
) => {
  const [fixtures, setFixtures] = useState<Matchday[]>();

  useEffect(() => {
    setFixtures(undefined);

    getFixtures(competition, season, matchday).then((data) => {
      setFixtures(data);
    });
  }, [competition, matchday]);

  return fixtures;
};
