"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectOverview } from "@/components/project-details/project-overview"
import { ProjectWorkstream } from "@/components/project-details/project-workstream"
import { ProjectDetailsSidebar } from "@/components/project-details/project-details-sidebar"
import { ArrowLeft, Sparkles, RefreshCw, X, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Project } from "@/lib/data/projects"
import { cn } from "@/lib/utils"

type ProjectDetailsViewProps = {
  project: Project
  onClose: () => void
}

export function ProjectDetailsView({ project, onClose }: ProjectDetailsViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-full w-full bg-background">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-background z-10">
          {/* Breadcrumb & Actions */}
          <div className="flex items-center justify-between px-6 py-3 border-b">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <button
                onClick={onClose}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
                data-testid="back-to-projects"
              >
                <ArrowLeft className="h-4 w-4" />
                Projects
              </button>
              <span>›</span>
              <span className="text-foreground font-medium">{project.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <Sparkles className="h-4 w-4" />
                AI Review
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground">Last sync Just now</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 ml-2"
                data-testid="close-project-details"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Project Title & Metadata */}
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold mb-3">{project.name}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Client */}
              {project.client && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {project.client}
                </div>
              )}

              {/* Type */}
              {project.typeLabel && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {project.typeLabel} {project.durationLabel}
                </div>
              )}

              {/* Priority */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" x2="12" y1="2" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                {project.priority}
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 px-2.5 py-1">
                <div className="relative h-10 w-10">
                  <svg className="transform -rotate-90" width="40" height="40">
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-muted"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray={`${project.progress * 100.53} 100.53`}
                      className="text-blue-600"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                    {project.progress}%
                  </div>
                </div>
              </div>

              {/* Owner Avatar */}
              {project.members && project.members.length > 0 && (
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatar-profile.jpg" />
                  <AvatarFallback>{project.members[0].split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              )}

              {/* Sidebar Toggle (Mobile) */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden ml-auto"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
            <TabsList className="h-auto p-0 bg-transparent border-b border-border w-full justify-start rounded-none">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                data-testid="tab-overview"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="workstream"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                data-testid="tab-workstream"
              >
                Workstream
              </TabsTrigger>
              <TabsTrigger
                value="tasks"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                data-testid="tab-tasks"
              >
                Tasks
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
              >
                Notes
              </TabsTrigger>
              <TabsTrigger
                value="files"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
              >
                Files
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
              >
                Comments
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="overview" className="m-0 h-full">
              <ProjectOverview project={project} />
            </TabsContent>
            <TabsContent value="workstream" className="m-0 h-full">
              <ProjectWorkstream project={project} />
            </TabsContent>
            <TabsContent value="tasks" className="m-0 p-6">
              <div className="text-muted-foreground">Tasks view coming soon...</div>
            </TabsContent>
            <TabsContent value="notes" className="m-0 p-6">
              <div className="text-muted-foreground">Notes view coming soon...</div>
            </TabsContent>
            <TabsContent value="files" className="m-0 p-6">
              <div className="text-muted-foreground">Files view coming soon...</div>
            </TabsContent>
            <TabsContent value="comments" className="m-0 p-6">
              <div className="text-muted-foreground">Comments view coming soon...</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        className={cn(
          "w-80 border-l border-border bg-background transition-all duration-300",
          isSidebarOpen ? "translate-x-0" : "translate-x-full absolute right-0 top-0 bottom-0 md:relative md:translate-x-0"
        )}
      >
        <ProjectDetailsSidebar
          project={project}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </div>
  )
}
