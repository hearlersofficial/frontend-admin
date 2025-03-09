import { CutScene } from "../types";
import CutSceneCard from "./CutSceneCard";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

export default function CutSceneContainer({
  counselorId, 
  cutScenes
}: { 
  counselorId: number; 
  cutScenes: CutScene[];
}) {
  return (
    <ScrollArea className="h-[300px]">
      <div className="flex w-max space-x-4 p-4">
        {cutScenes.map((cutScene) => (
          <CutSceneCard key={cutScene.id} cut_scene={cutScene} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
