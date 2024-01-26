import { format, isToday, isYesterday } from "date-fns";
import { SyntheticEvent } from "react";

export function preventBubbling(
  callback?: ((...args: never[]) => unknown) | null,
  noPreventDefault?: boolean,
) {
  return (e: SyntheticEvent): void => {
    e.stopPropagation();

    if (!noPreventDefault) e.preventDefault();
    if (callback) callback();
  };
}

export function getWordByPosition(text: string, pos: number) {
  const n = text.substring(pos).match(/^\S+/);
  const p = text.substring(0, pos).match(/\S+$/);
  const word = (p?.at(0) || "") + (n?.at(0) || "");

  return word;
}

export function formatDateChatDisplay(inputDate: string) {
  const date = new Date(inputDate);
  if (isToday(date)) return format(date, "HH:mm");
  if (isYesterday(date)) return "kemarin";
  return format(date, "yyyy/MM/dd");
}
