import { MenfessEntity } from "@halostemba/entities";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useVoteMenfess } from "~/apis/menfess/vote-menfess-api";
import { preventBubbling } from "~/lib/utils";
import MustBeLoginModal from "../modals/auth/MustBeLoginModal";

interface VoteMenfessButtonProps {
  menfess: Pick<MenfessEntity, "voted" | "score" | "id">;
}

export default function VoteMenfessButton({ menfess }: VoteMenfessButtonProps) {
  const [vote, setVote] = useState<"UP" | "DOWN" | null>(menfess.voted);
  const [score, setScore] = useState(menfess.score);
  const [showMustLogin, setShowMustLogin] = useState(false);
  const { enqueueSnackbar: toast } = useSnackbar();
  const { data: session } = useSession();

  const { mutate: handleVoteMenfess } = useVoteMenfess({
    onError: (error) => {
      setVote(menfess.voted);
      const message =
        error.response?.data.error || "Gagal vote menfess, coba lagi.";
      toast(message, { variant: "error", autoHideDuration: 750 });
    },
    onSuccess: (data) => {
      const message = data.message || "Berhasil vote menfess.";
      toast(message, { variant: "success", autoHideDuration: 750 });
    },
    onMutate: (data) => {
      if (data.type === vote) {
        setVote(null);
        if (data.type === "UP") return setScore(score - 1);
        setScore(score + 1);
      } else {
        setVote(data.type);
        const scored = vote !== null ? 2 : 1;
        if (data.type === "UP") return setScore(score + scored);
        setScore(score - scored);
      }
    },
  });

  const handleClick = (type: "UP" | "DOWN") => () => {
    if (!session) return setShowMustLogin(true);

    handleVoteMenfess({
      menfessId: menfess.id,
      type,
      token: session?.token as string,
    });
  };

  return (
    <>
      <MustBeLoginModal open={showMustLogin} onOpenChange={setShowMustLogin} />
      <Flex align="center" gap="1">
        <Button
          size="1"
          variant="soft"
          color={vote === "UP" ? "iris" : "gray"}
          style={{
            cursor: "pointer",
          }}
          onClick={preventBubbling(handleClick("UP"))}
        >
          <TriangleUpIcon width={20} height={20} />
          <Text size="2">{score}</Text>
        </Button>
        <IconButton
          onClick={preventBubbling(handleClick("DOWN"))}
          size="1"
          variant="soft"
          color={vote === "DOWN" ? "iris" : "gray"}
          style={{
            cursor: "pointer",
          }}
        >
          <TriangleDownIcon width={20} height={20} />
        </IconButton>
      </Flex>
    </>
  );
}
