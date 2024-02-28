import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import WithMetaResponseType from "~/types/with-meta-response-type";

interface PaginationProps {
  meta: WithMetaResponseType<any>["meta"];
  param?: string;
  maxVisible?: number;
  path?: string;
}

export default function Pagination({
  meta,
  param = "page",
  maxVisible = 5,
  path = "",
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = meta.currentPage || Number(searchParams.get(param)) || 1;

  const getPagesNumber = () => {
    if (meta.totalPages <= maxVisible) {
      return Array.from({ length: meta.totalPages }, (_, i) => i + 1);
    }

    const middlePage = Math.floor(maxVisible / 2);
    const startPage = Math.min(
      Math.max(1, page - middlePage),
      meta.totalPages - maxVisible + 1,
    );

    const pages = [startPage];
    if (startPage > 1) {
      pages.push(0);
    }

    for (let i = startPage + 1; i < startPage + maxVisible - 1; i++) {
      pages.push(i);
    }

    if (startPage + maxVisible - 2 < meta.totalPages) {
      pages.push(0);
    }

    pages.push(meta.totalPages);

    return pages;
  };

  const handlePrevPage = () => {
    if (page === 1) return;
    change(page - 1);
  };

  const handleNextPage = () => {
    if (page === meta.totalPages) return;
    change(page + 1);
  };

  const change = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(param, String(p));
    router.push(`${path}?${params.toString()}`);
  };

  if (meta.totalPages <= 1) return null;

  return (
    <Flex align="center" gap="2">
      {page !== 1 && (
        <>
          <IconButton className="cursor-pointer" onClick={handlePrevPage}>
            <ChevronLeftIcon />
          </IconButton>
        </>
      )}
      {getPagesNumber().map((p, i) =>
        p === 0 ? (
          <IconButton
            key={i}
            className="cursor-pointer"
            variant="outline"
            disabled
          >
            ...
          </IconButton>
        ) : (
          <IconButton
            key={i}
            className="cursor-pointer"
            variant={meta.currentPage === p ? "solid" : "outline"}
            onClick={() => change(p)}
          >
            {p}
          </IconButton>
        ),
      )}
      {page !== meta.totalPages && (
        <>
          <IconButton
            className="cursor-pointer"
            variant="surface"
            onClick={handleNextPage}
          >
            <ChevronRightIcon />
          </IconButton>
        </>
      )}
    </Flex>
  );
}
