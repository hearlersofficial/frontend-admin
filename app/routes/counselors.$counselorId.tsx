import { useLoaderData } from "@remix-run/react";
import CutSceneContainer from "./counselors/components/CutSceneContainer";
import { CutScene } from "./counselors/types";

export async function loader({ params }: { params: { counselorId: string } }) {
  // TODO: 실제 API 연동 - 상담사 상세 정보 가져옴
  const counselorId = parseInt(params.counselorId);
  const cutScenes: CutScene[] = [
    {
      id: "1",
      title: "컷 씬 1",
      description: "컷 씬 1 설명",
      image: "https://placehold.co/200"
    },
    {
      id: "2",
      title: "컷 씬 2",
      description: "컷 씬 2 설명",
      image: "https://placehold.co/200"
    },
    {
      id: "3",
      title: "컷 씬 3",
      description: "컷 씬 3 설명",
      image: "https://placehold.co/200"
    },
    {
      id: "4",
      title: "컷 씬 4",
      description: "컷 씬 4 설명",
      image: "https://placehold.co/200"
    },
    {
      id: "5",
      title: "컷 씬 5",
      description: "컷 씬 5 설명",
      image: "https://placehold.co/200"
    },
  ];
  return { counselorId, cutScenes };
}

export default function CounselorDetailPage() {
  const { counselorId, cutScenes } = useLoaderData<typeof loader>();

  return (
    <div className="p-4 border rounded-md">
      <div>counselorId: {counselorId}</div>
      <CutSceneContainer counselorId={counselorId} cutScenes={cutScenes} />
    </div>
  );
}

