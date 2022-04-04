import { Action, ActionPanel, Color, Icon, Image, List } from "@raycast/api";
import { useState } from "react";
import json2md from "json2md";
import { useTable } from "./hooks";
import { Entry } from "./types/firebase";

export default function Table() {
  const { table, loading } = useTable();
  const [showStats, setShowStats] = useState<boolean>(false);

  const clubStats = (entry: Entry): json2md.DataObject => {
    return [
      { h1: entry.club.nameFull },
      { h2: "Stats" },
      {
        p: [
          `Played: ${entry.gamesPlayed}`,
          `Won: ${entry.wins}`,
          `Drawn: ${entry.draws}`,
          `Lost: ${entry.losses}`,
          `Goals For: ${entry.goalsScored}`,
          `Goals Against: ${entry.goalsAgainst}`,
          `Goal Difference: ${entry.goalDifference}`,
        ],
      },
    ];
  };

  return (
    <List throttle isLoading={loading} isShowingDetail={showStats}>
      {table.map((entry) => {
        let icon: Image.ImageLike = {
          source: Icon.Dot,
          tintColor: Color.SecondaryText,
        };

        if (entry.tendency === "UP") {
          icon = {
            source: Icon.ChevronUp,
            tintColor: Color.Green,
          };
        } else if (entry.tendency === "DOWN") {
          icon = {
            source: Icon.ChevronDown,
            tintColor: Color.Red,
          };
        }

        return (
          <List.Item
            key={entry.rank}
            title={`${entry.rank}. ${entry.club.nameFull}`}
            icon={{
              source: entry.club.logoUrl,
              fallback: "default_clublogo.svg",
            }}
            accessories={[
              { text: entry.points.toString() },
              { icon }
            ]}
            detail={<List.Item.Detail markdown={json2md(clubStats(entry))} />}
            actions={
              <ActionPanel>
                <Action
                  title="Show Stats"
                  onAction={() => setShowStats(!showStats)}
                />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
