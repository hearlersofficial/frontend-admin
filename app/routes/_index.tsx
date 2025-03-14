import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Hearlers Admin" },
    { name: "description", content: "히얼러스 화이팅" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Hearlers Admin</h1>
    </div>
  );
}
