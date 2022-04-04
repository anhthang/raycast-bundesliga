export interface Table {
  competition: Competition;
  creationDateTime: Date;
  entries: Entry[];
  matchday: Competition;
  qualifications: Qualification[];
  season: Competition;
}

export interface Competition {
  id: string;
  name: string;
}

export interface Entry {
  club: Club;
  draws: number;
  gamesPlayed: number;
  goalDifference: number;
  goalsAgainst: number;
  goalsScored: number;
  losses: number;
  points: number;
  qualification: string;
  rank: number;
  subRank: number;
  tendency: Tendency;
  wins: number;
  qualificationColor?: string;
}

export interface Club {
  dflDatalibraryClubId: string;
  id: string;
  logoUrl: string;
  nameFull: string;
  nameShort: string;
  slugifiedFull: string;
  slugifiedSmall: string;
  threeLetterCode: string;
}

export enum Tendency {
  Down = "DOWN",
  Stable = "STABLE",
  Up = "UP",
}

export interface Qualification {
  color: string;
  id: string;
  title: string;
}
