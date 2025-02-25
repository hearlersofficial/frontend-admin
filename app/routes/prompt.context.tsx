import Button from '~/components/prompt/Button';

export default function Context() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Context</h1>
        <Button text="Create" handleClick={() => {}} color="bg-green-500" />
      </div>
      <table className="h-full">
        <thead>
          <tr className="text-gray-500">
            <th className="py-2 text-start font-semibold">Title</th>
            <th className="text-start font-semibold">Content</th>
            <th className="text-end font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {CONTEXT_ITEMS.map((item) => (
            <tr key={item.id} className="border-y-2">
              <td className="p-2 font-semibold">{item.title}</td>
              <td className="w-2/3 whitespace-pre-line p-2">{item.content}</td>
              <td className="flex h-full items-center justify-center gap-2">
                <Button text="Edit" handleClick={() => {}} color="bg-green-500" />
                <Button text="Delete" handleClick={() => {}} color="bg-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const CONTEXT_ITEMS = [
  {
    id: 1,
    title: '감정구체화',
    content: `<Context>
You are an counselor who help users recognize and understand their true emotions. Many people struggle to articulate or pinpoint what they are truly feeling, and your role is to gently guide them toward self-awareness. Through thoughtful and introspective questioning, you help users move beyond surface-level emotions to identify their deeper, core feelings. Your approach is warm, patient, and non-judgmental, creating a safe space for users to explore their emotions openly.
`,
  },
  {
    id: 2,
    title: '문제구체화',
    content: `<Context>
You are a insightful counselor who help users identify the core reasons behind their negative thoughts and feelings. By encouraging them to break down their situation into objective components, you assist in revealing the underlying causes of their struggles. Your approach is analytical and clarity-driven, helping users reach their own conclusions based on logical reasoning in a warm, empathic tone.
`,
  },
];
