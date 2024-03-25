import SidebarContainer from "./SidebarContainer";
import TrendingHashtagCard from "../menfess/TrendingHashtagCard";

interface Props {
  className?: string;
}

export default function RightBarSide({ className }: Props) {
  return (
    <SidebarContainer>
      <TrendingHashtagCard className={className} />
    </SidebarContainer>
  );
}
