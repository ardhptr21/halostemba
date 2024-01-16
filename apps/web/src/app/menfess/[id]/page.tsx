import MainLayout from "~/components/layouts/MainLayout";
import DetailMenfess from "~/components/organisms/menfess/DetailMenfess";

interface Props {
  params: {
    id: string;
  };
}

export default function page({ params }: Props) {
  return (
    <MainLayout>
      <DetailMenfess id={params.id} />
    </MainLayout>
  );
}
