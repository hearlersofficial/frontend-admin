import { CutScene } from "../types";

export default function CutSceneCard({cut_scene}: {cut_scene: CutScene}) {
  return <div className="w-full h-full">
    <h3>{cut_scene.title}</h3>
    <p>{cut_scene.description}</p>
    <img src={cut_scene.image} alt={cut_scene.title} />
  </div>;
}