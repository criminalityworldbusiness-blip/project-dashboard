import { Suspense } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ProjectsContent } from "@/components/projects-content"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ProjectsProvider } from "@/lib/contexts/projects-context"

export default function Page() {
  return (
    <ProjectsProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Suspense fallback={null}>
            <ProjectsContent />
          </Suspense>
        </SidebarInset>
      </SidebarProvider>
    </ProjectsProvider>
  )
}
