import { ProjectDetails } from "@/components/project-details"

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectDetails projectId={params.id} />
}
