export interface CompetitionClub {
  "2bundesliga": Club[];
  bundesliga: Club[];
}

export interface Club {
  id: string;
  name: Name;
  threeLetterCode: string;
  colors: Colors;
  stadium: Stadium;
  founded: string;
  contact: Contact;
  logos: Logo[];
  externalClubIds: ExternalClubIDS;
  playedMatches: PlayedMatch[];
}

export interface Colors {
  club: Club;
  jersey: Jersey;
}

export interface Club {
  primary: Primary;
  primaryText: Primary;
  secondary: Primary;
  secondaryText: Primary;
}

export interface Primary {
  hex: string;
}

export interface Jersey {
  home: Alternative;
  away: Alternative;
  alternative: Alternative;
}

export interface Alternative {
  primary: Primary;
  secondary: Primary;
  number: Primary;
}

export interface Contact {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
  fax: string;
  homepage: string;
  tickets: string;
  twitter: string;
  facebook: string;
  instagram?: string;
}

export interface ExternalClubIDS {
  dflDatalibraryClubId: string;
  deltatreId: string;
}

export interface Logo {
  id: ID;
  uri: string;
}

export enum ID {
  Standard = "standard",
}

export interface Name {
  alias: null | string;
  shortName: null;
  full: string;
  small: string;
  slugifiedFull: string;
  slugifiedShort: string;
  first: string;
  last: string;
  withFormOfCompany: string;
}

export interface PlayedMatch {
  matchId: string;
}

export interface Stadium {
  name: string;
  capacity: string;
  imageUrl: string;
  mapsUrl: string;
  stadiumIconUrlBlack: string;
  stadiumIconUrlWhite: string;
}

export interface ClubPerson {
  roles: Roles;
  players: Players;
}

export interface Players {
  MIDFIELD: Player[];
  DEFENSE: Player[];
  ATTACK: Player[];
  GOALKEEPER: Player[];
}

export interface Player {
  name: Name;
  nationality: Nationality;
  shirtNumber: string;
  externalPersonIds: ExternalPersonIDS;
  lastUpdate: Date;
  id: string;
  playerImages: PlayerImages;
}

export interface ExternalPersonIDS {
  dflDatalibraryPersonId: string;
}

export interface Nationality {
  firstNationality: string;
  firstNationalityCode: string;
  secondNationality: null | string;
  secondNationalityCode: null | string;
  thirdNationality: null | string;
  thirdNationalityCode: null | string;
}

export interface PlayerImages {
  FACE_CIRCLE: string;
}

export interface Roles {
  DL_OTHER_OFFICIAL: DL[];
  DL_HEAD_COACH: DL[];
  DL_ASSISTANT_HEAD_COACH: DL[];
}

export interface DL {
  name: Name;
  externalPersonIds: ExternalPersonIDS;
  id: string;
}
