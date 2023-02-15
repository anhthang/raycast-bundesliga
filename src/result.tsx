import { Action, ActionPanel, List, Icon, Color, Image } from "@raycast/api";
import groupBy from "lodash.groupby";
import { useState } from "react";
import Match from "./components/match";
import { useFixtures } from "./hooks";
import { convertToLocalTime } from "./utils";

export default function Fixture() {
  const [competition, setCompetition] = useState<string>("bundesliga");
  const [matchday, setMatchday] = useState<number>();

  const fixtures = useFixtures(competition, "2022-2023", matchday);

  const categories = fixtures
    ? groupBy(fixtures, (f) =>
        convertToLocalTime(f.plannedKickOff, "EEEE dd-MMM-yyyy")
      )
    : {};

  return (
    <List
      throttle
      isLoading={!fixtures}
      navigationTitle={
        !fixtures
          ? "Fixtures & Results"
          : `${fixtures[0].matchdayLabel} | Fixtures & Results`
      }
      searchBarAccessory={
        <List.Dropdown
          tooltip="Filter by Competition"
          value={competition}
          onChange={setCompetition}
        >
          <List.Dropdown.Item title="Bundesliga" value="bundesliga" />
          <List.Dropdown.Item title="2. Bundesliga" value="2bundesliga" />
        </List.Dropdown>
      }
    >
      {Object.entries(categories).map(([day, matches], key) => {
        return (
          <List.Section title={day} key={key}>
            {matches.map((match) => {
              const { teams, score, matchStatus } = match;

              let icon: Image.ImageLike;
              if (match.matchStatus.toLowerCase().includes("half")) {
                icon = { source: Icon.Livestream, tintColor: Color.Red };
              } else if (match.matchStatus.toLowerCase().includes("final")) {
                icon = { source: Icon.CheckCircle, tintColor: Color.Green };
              } else {
                icon = Icon.Clock;
              }

              const accessories: List.Item.Accessory[] = [
                { text: match.stadiumName },
                {
                  icon: {
                    source: {
                      dark: match.stadiumIconUrlWhite,
                      light: match.stadiumIconUrlBlack,
                    },
                  },
                },
              ];

              if (match.matchStatus.toLowerCase().includes("half")) {
                accessories.unshift({
                  tag: {
                    value: `${match.minuteOfPlay.minute}'00`,
                    color: Color.Red,
                  },
                });
              }

              return (
                <List.Item
                  key={match.seasonOrder}
                  icon={icon}
                  title={convertToLocalTime(match.plannedKickOff, "HH:mm")}
                  subtitle={
                    score
                      ? `${teams.home.nameFull} ${score.home.live} - ${score.away.live} ${teams.away.nameFull}`
                      : `${teams.home.nameFull} - ${teams.away.nameFull}`
                  }
                  accessories={accessories}
                  actions={
                    <ActionPanel>
                      {matchStatus === "PRE_MATCH" ? (
                        <Action.OpenInBrowser
                          title="Buy Ticket"
                          icon={Icon.Wallet}
                          url={teams.home.boxOfficeUrl}
                        />
                      ) : (
                        <Action.Push
                          title="Match Stats"
                          icon={Icon.Sidebar}
                          target={<Match {...match} />}
                        />
                      )}
                      <ActionPanel.Section title="Matchday">
                        {match.matchday > 1 && (
                          <Action
                            title={`Matchday ${match.matchday - 1}`}
                            icon={Icon.ArrowLeftCircle}
                            onAction={() => {
                              setMatchday(match.matchday - 1);
                            }}
                          />
                        )}
                        {match.matchday < 36 && (
                          <Action
                            title={`Matchday ${match.matchday + 1}`}
                            icon={Icon.ArrowRightCircle}
                            onAction={() => {
                              setMatchday(match.matchday + 1);
                            }}
                          />
                        )}
                      </ActionPanel.Section>
                    </ActionPanel>
                  }
                />
              );
            })}
          </List.Section>
        );
      })}
    </List>
  );
}
