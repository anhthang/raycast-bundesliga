import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import * as cheerio from "cheerio";
import { ClubPerson, CompetitionClub, Player, Players } from "../types";
import { Entry, LiveBlogEntries, Matchday } from "../types/firebase";

const { apikey } = getPreferenceValues();

function showFailureToast() {
  showToast(
    Toast.Style.Failure,
    "Something went wrong",
    "Please try again later"
  );
}

const headers = {
  "x-api-key": apikey,
};

function load(html: string) {
  const $ = cheerio.load(html);
  const state = $("#serverApp-state").html();

  let data: any = {};
  if (state) {
    try {
      data = JSON.parse(state.replace(/&q;/g, '"').replace(/&s;/g, "'"));
    } catch (error) {
      // nothing to do
    }
  }

  const key = Object.keys(data).find((k) =>
    k.startsWith("_getDataFromFirebase")
  );

  return key ? data[key] : {};
}

export const getClubs = async (): Promise<CompetitionClub> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: "https://wapp.bapi.bundesliga.com/club",
    params: {
      // sort: "editorialorder",
      seasonId: "DFL-SEA-0001K5",
    },
    headers,
  };

  try {
    const { data }: AxiosResponse<CompetitionClub> = await axios(config);

    return data;
  } catch (e) {
    showFailureToast();

    return {};
  }
};

export const getPersons = async (club: string): Promise<Players> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `https://wapp.bapi.bundesliga.com/person/personsbyclub/${club}`,
    headers,
  };

  try {
    const { data }: AxiosResponse<ClubPerson> = await axios(config);

    return data.players;
  } catch (e) {
    showFailureToast();

    return {};
  }
};

export const getPerson = async (slug: string): Promise<Player | undefined> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `https://wapp.bapi.bundesliga.com/person/personbyslug/${slug}`,
    headers,
  };

  try {
    const { data }: AxiosResponse<Player> = await axios(config);

    return data;
  } catch (e) {
    showFailureToast();

    return undefined;
  }
};

export const getTable = async (competition: string): Promise<Entry[]> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `https://www.bundesliga.com/en/${competition}/table`,
  };

  try {
    const resp = await axios(config);
    const data = load(resp.data);

    return data.entries || [];
  } catch (e) {
    showFailureToast();

    return [];
  }
};

export const getFixtures = async (
  competition: string,
  season?: string,
  matchday?: number
): Promise<Matchday[]> => {
  const url =
    season && matchday
      ? `https://www.bundesliga.com/en/${competition}/matchday/${season}/${matchday}`
      : `https://www.bundesliga.com/en/${competition}/matchday`;

  const config: AxiosRequestConfig = {
    method: "get",
    url,
  };

  try {
    const resp = await axios(config);
    const data = load(resp.data);

    return data || [];
  } catch (e) {
    showFailureToast();

    return [];
  }
};

export const getMatch = async (
  url: string
): Promise<LiveBlogEntries | undefined> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url,
  };

  try {
    const resp = await axios(config);
    const data: Matchday = load(resp.data);

    return data.liveBlogEntries;
  } catch (e) {
    showFailureToast();

    return undefined;
  }
};
