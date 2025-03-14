import { useLoaderData } from "@remix-run/react";
import { Counselor } from "./counselors/types";
import CounselorContainer from "./counselors/components/CounselorContainer";
export async function loader() {
  // TODO: 실제 API 연동 - 상담사 목록만 가져옴
  const counselors: Counselor[] = [
    {
      id: "1",
      tone_id: "1",
      name: "상담사1",
      gender: "남성",
      description: "상담사1 설명",
      intro_message: "마음의 어려움을 함께 해결해요",
      response_option: "1",
      response_option2: "2",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: ""
    },
    {
      id: "2",
      tone_id: "2",
      name: "상담사2",
      gender: "여성",
      description: "상담사2 설명",
      intro_message: "마음의 어려움을 함께 해결해요",
      response_option: "1",
      response_option2: "2",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: ""
    }
  ];
  
  return { counselors };
}

export default function CounselorsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">상담사 목록</h1>
      <CounselorContainer counselors={data.counselors} />
    </div>
  );
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}