import { Link } from "@remix-run/react";
import { Counselor } from "../types";

export default function CounselorContainer({
  counselors,   
}: {
  counselors: Counselor[];
}) {
  return (
    <div>
      {counselors.map((counselor) => (
        <Link key={counselor.id} to={`/counselors/${counselor.id}`}>
          <h2>{counselor.name}</h2>
        </Link>
      ))}
    </div>
  );
}
