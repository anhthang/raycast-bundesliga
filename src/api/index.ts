import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { showToast, Toast } from "@raycast/api";
import * as cheerio from "cheerio";
import { ClubPerson, CompetitionClub, Player, Players } from "../types";
import { Entry, Matchday } from "../types/firebase";

function showFailureToast() {
  showToast(
    Toast.Style.Failure,
    "Something went wrong",
    "Please try again later"
  );
}

const headers = {
  "x-api-key": "60ETUJ4j5YagIHdu-PROD",
};

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
    const { data } = await axios(config);

    const $ = cheerio.load(data);
    const state = $("#my-app-state").html();
    if (state) {
      const fbData = JSON.parse(state.replace(/&q;/g, '"'));
      const key = Object.keys(fbData).find((k) =>
        k.startsWith("_getDataFromFirebase")
      );

      return key ? fbData[key].entries : [];
    }

    return [];
  } catch (e) {
    showFailureToast();

    return [];
  }
};

export const getResults = async (competition: string): Promise<Matchday[]> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `https://www.bundesliga.com/en/${competition}/matchday`,
  };

  try {
    const { data } = await axios(config);

    const $ = cheerio.load(data);
    const state = $("#my-app-state").html();
    if (state) {
      const fbData = JSON.parse(state.replace(/&q;/g, '"'));
      const key = Object.keys(fbData).find((k) =>
        k.startsWith("_getDataFromFirebase")
      );

      return key ? fbData[key] : [];
    }

    return [];
  } catch (e) {
    showFailureToast();

    return [];
  }
};
