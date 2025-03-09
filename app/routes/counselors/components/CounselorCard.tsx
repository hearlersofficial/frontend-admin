import { Link } from "@remix-run/react";
import { Counselor } from "../types";

export default function CounselorCard({ counselor }: { counselor: Counselor }) {
  return (
    <Link to={`/counselors/${counselor.id}`}>
      <div className="w-40 h-40 bg-gray-200 rounded-md">
        <img src="https://placehold.co/300" alt={counselor.name} className="w-full h-full object-cover" />
      </div>
    </Link>
  );
}