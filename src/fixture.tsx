import { Action, ActionPanel, List } from "@raycast/api";
import { useFixtures } from "./hooks";

export default function Fixture() {
  const { fixtures, loading } = useFixtures();

  return (
    <List throttle isLoading={loading}>
      <List.Section title={fixtures[0]?.matchdayLabel}>
        {fixtures.map((fixture) => {
          const { teams, score } = fixture;
          return (
            <List.Item
              key={fixture.seasonOrder}
              title={`${(teams.home.nameFull)} ${score.home.live} - ${score.away.live} ${teams.away.nameFull}`}
              accessories={[
                { text: fixture.stadiumName },
                {
                  icon: {
                    source: {
                      dark: fixture.stadiumIconUrlWhite,
                      light: fixture.stadiumIconUrlBlack,
                    },
                  },
                },
              ]}
              actions={
                <ActionPanel>
                  <Action.OpenInBrowser
                    url={`https://www.bundesliga.com/en/bundesliga/matchday/2021-2022/${fixture.matchday}/${fixture.slugs.slugLong}`}
                  />
                </ActionPanel>
              }
            />
          );
        })}
      </List.Section>
    </List>
  );
}
