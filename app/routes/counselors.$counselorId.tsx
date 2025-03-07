import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: { params: { counselorId: string } }) {
  // TODO: 실제 API 연동 - 상담사 상세 정보 가져옴
  const counselorId = parseInt(params.counselorId);
  return { counselorId };
}

export default function CounselorDetailPage() {
  const { counselorId } = useLoaderData<typeof loader>();

  return (
    <div className="p-4 border rounded-md">
      <div>counselorId: {counselorId}</div>
    </div>
  );
}

