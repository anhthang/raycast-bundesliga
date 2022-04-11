import { Action, ActionPanel, Detail } from "@raycast/api";
import json2md from "json2md";
import { useMatchday } from "../hooks";
import { LiveBlogEntryItem, Matchday } from "../types/firebase";

function convert(entry: LiveBlogEntryItem) {
  const time = entry.playtime.injuryTime
    ? `${entry.playtime.minute}'+${entry.playtime.injuryTime}`
    : entry.playtime.minute;

  switch (entry.entryType) {
    case "sub":
      return [
        { h2: `${time} - Substitution` },
        {
          p: [
            `**In:** ${entry.detail.in.name}`,
            `**Out:** ${entry.detail.out.name}`,
          ],
        },
      ];
    case "goal":
      return [
        { h2: `${time} - Goal` },
        {
          img: {
            source: entry.detail.scorer.imageUrl,
            title: entry.detail.scorer.name,
          },
        },
        {
          p: [
            `**${entry.detail.scorer.name}**`,
            `${entry.detail.score.home} - ${entry.detail.score.away}`,
          ],
        },
      ];
    case "yellowCard":
      return [
        { h2: `${time} - Yellow Card` },
        { p: `🟨 ${entry.detail.person.name}` },
      ];
    case "yellowRedCard":
      return [
        { h2: `${time} - Second Yellow Card` },
        { p: `🟨🟨 ${entry.detail.person.name}` },
      ];
    case "redCard":
      return [
        { h2: `${time} - Red Card` },
        { p: `🟥 ${entry.detail.person.name}` },
      ];
    // case "video":
    // case "embed":
    case "freetext":
      return [
        { h2: `${time} - ${entry.detail.headline}` },
        { p: entry.detail.text },
      ];
    case "image":
      return [
        { h2: `${time} - ${entry.detail.headline}` },
        { p: entry.detail.text },
        {
          img: {
            source: entry.detail.url,
            title: entry.detail.copyright,
          },
        },
      ];
    // case "stats":
    //   return [
    //     { h2: `${time} - ${entry.detail.headline}` },
    //     { p: entry.detail.text }
    //   ]
    case "videoAssistant":
      return [
        { h2: time },
        {
          img: {
            source: "https://www.bundesliga.com/assets/liveticker/var.png",
            title: "VAR",
          },
        },
        {
          p: [
            `Situation: ${entry.detail.situation}`,
            `Review: ${entry.detail.review}`,
            `Decision: **${entry.detail.decision}**`,
          ],
        },
      ];
    case "end_firstHalf":
    case "end_secondHalf":
    case "finalWhistle":
    case "start_firstHalf":
    case "start_secondHalf":
    default:
      return entry.entryType;
  }
}

export default function Matchday(props: Matchday) {
  const entries = useMatchday(props.liveBlogUrl);

  const dataObject: json2md.DataObject = entries
    ? [
        { h1: "Highlights" },
        ...entries
          .sort((a, b) => b.order - a.order)
          .map((entry) => convert(entry)),
      ]
    : [];

  return (
    <Detail
      navigationTitle={`${props.teams.home.nameFull} - ${props.teams.away.nameFull} | ${props.matchdayLabel}`}
      isLoading={!entries}
      markdown={json2md(dataObject)}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={props.liveBlogUrl} />
        </ActionPanel>
      }
    />
  );
}
