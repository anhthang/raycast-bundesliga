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
  full: string;
  small: string;
  slugifiedFull: string;
  slugifiedSmall: string;
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
