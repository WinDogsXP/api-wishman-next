export default function ViewBugPage({
  params,
}: {
  params: { id: string; bugId: string };
}) {
  return (
    <>
      <span>Bug ID: {params.bugId}</span>
    </>
  );
}
