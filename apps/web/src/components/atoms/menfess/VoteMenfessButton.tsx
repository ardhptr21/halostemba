import { MenfessEntity } from "@halostemba/entities";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useVoteMenfess } from "~/apis/menfess/vote-menfess-api";

interface VoteMenfessButtonProps {
  menfess: Pick<MenfessEntity, "voted" | "score" | "id">;
}

export default function VoteMenfessButton({ menfess }: VoteMenfessButtonProps) {
  const { enqueueSnackbar: toast } = useSnackbar();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { mutate: handleVoteMenfess } = useVoteMenfess({
    onError: (error) => {
      const message =
        error.response?.data.error || "Gagal vote menfess, coba lagi.";
      toast(message, { variant: "error", autoHideDuration: 750 });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["list-menfess"],
      });
      queryClient.invalidateQueries({
        queryKey: ["detail-menfess", menfess.id],
      });
      const message = data.message || "Berhasil vote menfess.";
      toast(message, { variant: "success", autoHideDuration: 750 });
    },
  });

  const handleClick = (type: "UP" | "DOWN") => () => {
    handleVoteMenfess({
      menfessId: menfess.id,
      type,
      token: session?.token as string,
    });
  };

  return (
    <Flex align="center" gap="1">
      <Button
        size={"1"}
        variant="soft"
        color={menfess.voted === "UP" ? "iris" : "gray"}
        style={{
          cursor: "pointer",
        }}
        onClick={handleClick("UP")}
      >
        <TriangleUpIcon width={20} height={20} />
        <Text size="2">{menfess.score}</Text>
      </Button>
      <IconButton
        onClick={handleClick("DOWN")}
        size={"1"}
        variant="soft"
        color={menfess.voted === "DOWN" ? "iris" : "gray"}
        style={{
          cursor: "pointer",
        }}
      >
        <TriangleDownIcon width={20} height={20} />
      </IconButton>
    </Flex>
  );
}
