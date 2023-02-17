import { useEffect, useState } from "react";
import { getBroadcasters, getFixtures } from "../api";
import { Broadcast } from "../types";
import { Matchday } from "../types/firebase";

export const useFixtures = (
  competition: string,
  season?: string,
  matchday?: number
) => {
  const [fixtures, setFixtures] = useState<Matchday[]>();
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>();

  useEffect(() => {
    setFixtures(undefined);

    getFixtures(competition, season, matchday).then((data) => {
      setFixtures(data);

      const {
        dflDatalibraryCompetitionId,
        dflDatalibrarySeasonId,
        dflDatalibraryMatchdayId,
      } = data[0];
      getBroadcasters(
        dflDatalibraryCompetitionId,
        dflDatalibrarySeasonId,
        dflDatalibraryMatchdayId
      ).then(setBroadcasts);
    });
  }, [competition, matchday]);

  return { fixtures, broadcasts };
};
