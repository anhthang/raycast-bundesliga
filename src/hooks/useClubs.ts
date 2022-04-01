import { useEffect, useState } from "react";
import { getClubs, getPersons } from "../api";
import { CompetitionClub, Players } from "../types";

export const useClubs = () => {
  const [clubs, setClubs] = useState<Partial<CompetitionClub>>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getClubs().then((data) => {
      setClubs(data);
      setLoading(false);
    });
  }, []);

  return { clubs, loading };
};

export const usePersons = (club: string) => {
  const [players, setPlayers] = useState<Partial<Players>>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPersons(club).then((data) => {
      setPlayers(data);
      setLoading(false);
    });
  }, [club]);

  return { players, loading };
};
