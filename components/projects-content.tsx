"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ProjectHeader } from "@/components/project-header"
import { ProjectTimeline } from "@/components/project-timeline"
import { ProjectCardsView } from "@/components/project-cards-view"
import { ProjectBoardView } from "@/components/project-board-view"
import { ProjectSetupChoiceModal } from "@/components/project-setup-choice-modal"
import { QuickCreateModal } from "@/components/quick-create-modal"
import { CreateProjectModal } from "@/components/create-project-modal"
import { ProjectDetailsView } from "@/components/project-details/project-details-view"
import { CommandMenu } from "@/components/command-menu"
import { ActivityPanel } from "@/components/activity-panel"
import { SettingsModal } from "@/components/settings-modal"
import { computeFilterCounts, type Project } from "@/lib/data/projects"
import { DEFAULT_VIEW_OPTIONS, type FilterChip, type ViewOptions } from "@/lib/view-options"
import { chipsToParams, paramsToChips } from "@/lib/url/filters"
import { useProjects } from "@/lib/contexts/projects-context"
import { toast } from "sonner"

export function ProjectsContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { projects, addProject, exportProjects } = useProjects()

  const [viewOptions, setViewOptions] = useState<ViewOptions>(DEFAULT_VIEW_OPTIONS)
  const [filters, setFilters] = useState<FilterChip[]>([])
  const [isSetupChoiceOpen, setIsSetupChoiceOpen] = useState(false)
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false)
  const [isGuidedSetupOpen, setIsGuidedSetupOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false)
  const [showArchived, setShowArchived] = useState(false)
  const [isActivityOpen, setIsActivityOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const isSyncingRef = useRef(false)
  const prevParamsRef = useRef<string>("")

  const handleCreateProject = (newProject: Project) => {
    addProject(newProject)
    toast.success("Project created successfully!", {
      description: `${newProject.name} has been added to your dashboard.`,
    })
  }

  const handleAddProjectClick = () => {
    setIsSetupChoiceOpen(true)
  }

  const handleChooseQuick = () => {
    setIsSetupChoiceOpen(false)
    setIsQuickCreateOpen(true)
  }

  const handleChooseGuided = () => {
    setIsSetupChoiceOpen(false)
    setIsGuidedSetupOpen(true)
  }

  const handleExportProjects = () => {
    exportProjects("json")
    toast.success("Projects exported!", {
      description: "Download started...",
    })
  }

  const removeFilter = (key: string, value: string) => {
    const next = filters.filter((f) => !(f.key === key && f.value === value))
    setFilters(next)
    replaceUrlFromChips(next)
  }

  const applyFilters = (chips: FilterChip[]) => {
    setFilters(chips)
    replaceUrlFromChips(chips)
  }

  useEffect(() => {
    const currentParams = searchParams.toString()

    // Only sync if this is the first load or if params actually changed (not from our own update)
    if (prevParamsRef.current === currentParams) return

    // If we just made an update, skip this sync to avoid feedback loop
    if (isSyncingRef.current) {
      isSyncingRef.current = false
      return
    }

    prevParamsRef.current = currentParams
    const params = new URLSearchParams(searchParams.toString())
    const chips = paramsToChips(params)
    setFilters(chips)
  }, [searchParams])

  const replaceUrlFromChips = (chips: FilterChip[]) => {
    const params = chipsToParams(chips)
    const qs = params.toString()
    const url = qs ? `${pathname}?${qs}` : pathname

    isSyncingRef.current = true
    prevParamsRef.current = qs
    router.replace(url, { scroll: false })
  }
  const filteredProjects = useMemo(() => {
    let list = projects.slice()

    // Filter archived projects
    if (!showArchived) {
      list = list.filter((p) => !(p as any).archived)
    }

    // Apply showClosedProjects toggle
    if (!viewOptions.showClosedProjects) {
      list = list.filter((p) => p.status !== "completed" && p.status !== "cancelled")
    }

    // Build filter buckets from chips
    const statusSet = new Set<string>()
    const prioritySet = new Set<string>()
    const tagSet = new Set<string>()
    const memberSet = new Set<string>()

    for (const { key, value } of filters) {
      const k = key.trim().toLowerCase()
      const v = value.trim().toLowerCase()
      if (k.startsWith("status")) statusSet.add(v)
      else if (k.startsWith("priority")) prioritySet.add(v)
      else if (k.startsWith("tag")) tagSet.add(v)
      else if (k === "pic" || k.startsWith("member")) memberSet.add(v)
    }

    if (statusSet.size) list = list.filter((p) => statusSet.has(p.status.toLowerCase()))
    if (prioritySet.size) list = list.filter((p) => prioritySet.has(p.priority.toLowerCase()))
    if (tagSet.size) list = list.filter((p) => p.tags.some((t) => tagSet.has(t.toLowerCase())))
    if (memberSet.size) {
      const members = Array.from(memberSet)
      list = list.filter((p) => p.members.some((m) => members.some((mv) => m.toLowerCase().includes(mv))))
    }

    // Ordering
    const sorted = list.slice()
    if (viewOptions.ordering === "alphabetical") sorted.sort((a, b) => a.name.localeCompare(b.name))
    if (viewOptions.ordering === "date") sorted.sort((a, b) => (a.endDate?.getTime() || 0) - (b.endDate?.getTime() || 0))
    
    // Sort starred to top
    return sorted.sort((a, b) => ((b as any).starred ? 1 : 0) - ((a as any).starred ? 1 : 0))
  }, [filters, viewOptions, projects, showArchived])

  return (
    <>
      {selectedProject ? (
        <ProjectDetailsView
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : (
        <div className="flex flex-1 flex-col bg-background mx-2 my-2 border border-border rounded-lg min-w-0">
          <ProjectHeader
            filters={filters}
            onRemoveFilter={removeFilter}
            onFiltersChange={applyFilters}
            counts={computeFilterCounts(filteredProjects)}
            viewOptions={viewOptions}
            onViewOptionsChange={setViewOptions}
            onAddProject={handleAddProjectClick}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenActivity={() => setIsActivityOpen(true)}
          />
          {viewOptions.viewType === "timeline" && <ProjectTimeline />}
          {viewOptions.viewType === "list" && (
            <ProjectCardsView 
              projects={filteredProjects}
              onProjectClick={(project) => setSelectedProject(project)}
            />
          )}
          {viewOptions.viewType === "board" && (
            <ProjectBoardView
              projects={filteredProjects}
              onProjectClick={(project) => setSelectedProject(project)}
            />
          )}
        </div>
      )}
      
      <CommandMenu
        open={isCommandMenuOpen}
        onOpenChange={setIsCommandMenuOpen}
        onSelectProject={(project) => setSelectedProject(project)}
        onCreateProject={handleAddProjectClick}
        onExportProjects={handleExportProjects}
      />
      
      <ProjectSetupChoiceModal
        open={isSetupChoiceOpen}
        onOpenChange={setIsSetupChoiceOpen}
        onChooseQuick={handleChooseQuick}
        onChooseGuided={handleChooseGuided}
      />
      
      <QuickCreateModal
        open={isQuickCreateOpen}
        onOpenChange={setIsQuickCreateOpen}
        onCreateProject={handleCreateProject}
      />
      
      <CreateProjectModal
        open={isGuidedSetupOpen}
        onOpenChange={setIsGuidedSetupOpen}
        onCreateProject={handleCreateProject}
      />
      
      <ActivityPanel
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
      />
      
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  )
}
