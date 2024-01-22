import { Link as RLink } from "@radix-ui/themes";
import Link from "next/link";

export default function useParseHashtags() {
  const rule = /(?:^|(?<=\s))([#＃][^\s#]+)(?=\s|$)/g;

  const parser = (text: string) => {
    return text.split(rule).map((chunk) => {
      if (chunk.match(rule)) {
        return (
          <RLink asChild color="indigo" underline="hover" key={chunk}>
            <Link href={`/explore?q=${encodeURIComponent(chunk)}`}>
              {chunk}
            </Link>
          </RLink>
        );
      }
      return chunk;
    });
  };

  return { parser };
}
