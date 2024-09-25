import { Color, Icon, Image, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { useState } from "react";
import { getTable } from "./api";

const qualificationMap: Record<string, string> = {
  UEFA_CHAMPIONS_LEAGUE: "UEFA Champions League",
  UEFA_EUROPA_LEAGUE: "UEFA Europa League",
  UEFA_EUROPA_LEAGUE_QUALIFICATION: "UEFA Europa Conference League",
  PLAY_OFF: "Play-Offs",
  RELEGATION: "Relegation",
};

export default function Table() {
  const [competition, setCompetition] = useState<string>("bundesliga");

  const { data: table, isLoading } = usePromise(getTable, [competition]);

  return (
    <List
      throttle
      isLoading={isLoading}
      isShowingDetail={true}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Filter by Competition"
          value={competition}
          onChange={setCompetition}
        >
          <List.Dropdown.Item
            title="Bundesliga"
            value="bundesliga"
            icon="bundesliga.svg"
          />
          <List.Dropdown.Item
            title="2. Bundesliga"
            value="2bundesliga"
            icon="2bundesliga.svg"
          />
        </List.Dropdown>
      }
    >
      {table?.map((entry) => {
        let icon: Image.ImageLike = {
          source: Icon.Dot,
          tintColor: Color.SecondaryText,
        };

        if (entry.tendency === "UP") {
          icon = {
            source: Icon.ChevronUpSmall,
            tintColor: Color.Green,
          };
        } else if (entry.tendency === "DOWN") {
          icon = {
            source: Icon.ChevronDownSmall,
            tintColor: Color.Red,
          };
        }

        const accessories: List.Item.Accessory[] = [
          {
            text: {
              color: Color.PrimaryText,
              value: entry.points.toString(),
            },
          },
          {
            icon,
          },
        ];

        return (
          <List.Item
            key={entry.club.id}
            icon={entry.club.logoUrl}
            title={entry.rank.toString()}
            subtitle={entry.club.nameFull}
            keywords={[entry.club.nameFull, entry.club.nameShort]}
            accessories={accessories}
            detail={
              <List.Item.Detail
                metadata={
                  <List.Item.Detail.Metadata>
                    <List.Item.Detail.Metadata.TagList title="Qualification">
                      <List.Item.Detail.Metadata.TagList.Item
                        text={qualificationMap[entry.qualification]}
                        color={entry.qualificationColor}
                      />
                    </List.Item.Detail.Metadata.TagList>

                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label
                      title="Played"
                      text={entry.gamesPlayed.toString()}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Won"
                      text={entry.wins.toString()}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Drawn"
                      text={entry.draws.toString()}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Lost"
                      text={entry.losses.toString()}
                    />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label
                      title="Goals For"
                      text={entry.goalsScored.toString()}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Goals Against"
                      text={entry.goalsAgainst.toString()}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Goal Difference"
                      text={entry.goalDifference.toString()}
                    />
                  </List.Item.Detail.Metadata>
                }
              />
            }
          />
        );
      })}
    </List>
  );
}
