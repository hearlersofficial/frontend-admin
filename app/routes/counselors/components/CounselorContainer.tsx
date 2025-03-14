import { Link } from "@remix-run/react";
import { Counselor } from "../types";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import CounselorCard from "./CounselorCard";

export default function CounselorContainer({
  counselors,
}: {
  counselors: Counselor[];
}) {
  return (
    <ScrollArea className="h-[500px]">
      <div className="flex w-max space-x-4 p-4">
        {counselors.map((counselor) => (
          <CounselorCard key={counselor.id} counselor={counselor} />
        ))}
      </div>
    </ScrollArea>
  );
}
