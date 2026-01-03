import { Suspense } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ProjectsContent } from "@/components/projects-content"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ProjectsProvider } from "@/lib/contexts/projects-context"
import { ThemeProvider } from "@/lib/contexts/theme-context"

export default function Page() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}
