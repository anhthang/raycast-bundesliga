import { Action, ActionPanel, Detail, Icon, List } from "@raycast/api";
import json2md from "json2md";
import { useClubs } from "./hooks";
import { Club } from "./types";

const competitionMap: { [competition: string]: string } = {
  bundesliga: "Bundesliga",
  "2bundesliga": "2. Bundesliga",
};

function ClubDetails(team: Club) {
  return (
    <Detail
      markdown={json2md([
        { h1: team.name.full },
        { img: { source: team.logos[0].uri } },
      ])}
      metadata={
        team && (
          <Detail.Metadata>
            <Detail.Metadata.Label title="Founded" text={team.founded} />
            <Detail.Metadata.Label title="Stadium" text={team.stadium.name} />
            <Detail.Metadata.Label
              title="Capacity"
              text={team.stadium.capacity}
            />
            <Detail.Metadata.Link
              title="Official Website"
              text={team.contact.homepage}
              target={team.contact.homepage}
            />
            <Detail.Metadata.Separator />
            {team.contact.twitter && (
              <Detail.Metadata.Link
                title="Twitter"
                text={team.contact.twitter}
                target={team.contact.twitter}
              />
            )}
            {team.contact.facebook && (
              <Detail.Metadata.Link
                title="Facebook"
                text={team.contact.facebook}
                target={team.contact.facebook}
              />
            )}
            {team.contact.instagram && (
              <Detail.Metadata.Link
                title="Instagram"
                text={team.contact.instagram}
                target={team.contact.instagram}
              />
            )}
          </Detail.Metadata>
        )
      }
      actions={
        team && (
          <ActionPanel>
            <Action.OpenInBrowser
              url={`https://www.bundesliga.com/en/bundesliga/clubs/${team.name.slugifiedFull}`}
            />
          </ActionPanel>
        )
      }
    />
  );
}

export default function Club() {
  const club = useClubs();

  return (
    <List throttle isLoading={club.loading}>
      {Object.entries(club.clubs).map(([competition, clubs]) => {
        return (
          <List.Section key={competition} title={competitionMap[competition]}>
            {clubs.map((team) => {
              return (
                <List.Item
                  key={team.id}
                  title={team.name.full}
                  subtitle={team.threeLetterCode}
                  icon={{
                    source: `https://www.bundesliga.com/assets/clublogo/${team.id}.svg`,
                    // source: team.logos[0].uri,
                    fallback: "player-missing.png",
                  }}
                  accessories={[
                    {
                      text: team.stadium.name,
                    },
                    {
                      icon: {
                        source: {
                          dark: team.stadium.stadiumIconUrlWhite,
                          light: team.stadium.stadiumIconUrlBlack,
                        },
                      },
                    },
                  ]}
                  actions={
                    <ActionPanel>
                      <Action.Push
                        title="Show Details"
                        icon={Icon.Sidebar}
                        target={<ClubDetails {...team} />}
                      />
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
