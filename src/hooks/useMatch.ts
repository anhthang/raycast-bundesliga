import { useEffect, useState } from "react";
import { getMatch } from "../api";
import { LiveBlogEntryItem } from "../types/firebase";

export const useMatch = (url: string) => {
  const [entries, setEntries] = useState<LiveBlogEntryItem[]>();

  useEffect(() => {
    getMatch(url).then((data) => {
      setEntries(data ? Object.values(data) : []);
    });
  }, [url]);

  return entries;
};
