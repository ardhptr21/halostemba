import React, { useEffect } from "react";
import { useGetHashtagSugestionApi } from "~/apis/menfess/get-hashtag-sugestion-api";

interface Props {
  hashtag: string;
  open: boolean;
  onSelect: (hashtag: string) => void;
}

export default function HashtagsAutoComplete({
  hashtag,
  open,
  onSelect,
}: Props) {
  const { data, refetch } = useGetHashtagSugestionApi(
    {
      q: hashtag.replace("#", ""),
    },
    {
      enabled: false,
    },
  );

  useEffect(() => {
    if (hashtag) refetch();
  }, [hashtag, refetch]);

  if (!data?.length) return null;

  return (
    open && (
      <div className="absolute top-20 rounded-md left-0 z-50 bg-[#121215] bg-opacity-95 border-2 border-[#3E63DD] w-64 h-auto  max-h-64 overflow-y-auto ">
        {data?.map((hashtag) => (
          <button
            onClick={() => onSelect(hashtag.name)}
            key={hashtag.name}
            className="hover:bg-[#3E63DD] hover:bg-opacity-55 w-full py-2 px-5 text-left "
          >
            {`#${hashtag.name}`}
          </button>
        ))}
      </div>
    )
  );
}
