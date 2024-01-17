import MainLayout from "~/components/layouts/MainLayout";
import DetailMenfess from "~/components/organisms/menfess/DetailMenfess";
import { getAuthServer } from "~/lib/auth";

interface Props {
  params: {
    id: string;
  };
}

export default async function page({ params }: Props) {
  const session = await getAuthServer();

  return (
    <MainLayout>
      <DetailMenfess id={params.id} session={session} />
    </MainLayout>
  );
}
