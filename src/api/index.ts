import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { showToast, Toast } from "@raycast/api";
import { ClubPerson, CompetitionClub, Players } from "../types";

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

export const getClubs = async (): Promise<Partial<CompetitionClub>> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: "https://wapp.bapi.bundesliga.com/club/?sort=editorialorder&seasonId=DFL-SEA-0001K5",
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

export const getPersons = async (club: string): Promise<Partial<Players>> => {
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
