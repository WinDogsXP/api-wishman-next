import EndpointEditForm from "@/templates/EndpointEdit";

export default function NewEndpoint({ params }: { params: { id: string } }) {
  return <EndpointEditForm appId={params.id} />;
}
