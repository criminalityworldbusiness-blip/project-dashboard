"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { projects as initialProjects, type Project } from "@/lib/data/projects"

type Activity = {
  id: string
  type: "create" | "update" | "delete" | "complete" | "archive" | "star"
  projectId: string
  projectName: string
  timestamp: Date
  description: string
}

type ProjectsContextType = {
  projects: Project[]
  activities: Activity[]
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  duplicateProject: (id: string) => void
  toggleStarProject: (id: string) => void
  toggleArchiveProject: (id: string) => void
  exportProjects: (format: "json" | "csv") => void
}

const ProjectsContext = createContext<ProjectsContextType | null>(null)

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [activities, setActivities] = useState<Activity[]>([])

  const addActivity = (activity: Omit<Activity, "id" | "timestamp">) => {
    const newActivity: Activity = {
      ...activity,
      id: String(Date.now()),
      timestamp: new Date()
    }
    setActivities(prev => [newActivity, ...prev].slice(0, 50)) // Keep last 50
  }

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev])
    addActivity({
      type: "create",
      projectId: project.id,
      projectName: project.name,
      description: `Created project "${project.name}"`
    })
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          addActivity({
            type: "update",
            projectId: id,
            projectName: p.name,
            description: `Updated project "${p.name}"`
          })
          return { ...p, ...updates }
        }
        return p
      })
    )
  }

  const deleteProject = (id: string) => {
    const project = projects.find(p => p.id === id)
    if (project) {
      setProjects((prev) => prev.filter((p) => p.id !== id))
      addActivity({
        type: "delete",
        projectId: id,
        projectName: project.name,
        description: `Deleted project "${project.name}"`
      })
    }
  }

  const duplicateProject = (id: string) => {
    const project = projects.find(p => p.id === id)
    if (project) {
      const newProject: Project = {
        ...project,
        id: String(Date.now()),
        name: `${project.name} (Copy)`,
        progress: 0,
        tasks: []
      }
      setProjects((prev) => [newProject, ...prev])
      addActivity({
        type: "create",
        projectId: newProject.id,
        projectName: newProject.name,
        description: `Duplicated project "${project.name}"`
      })
    }
  }

  const toggleStarProject = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const isStarred = !(p as any).starred
          addActivity({
            type: "star",
            projectId: id,
            projectName: p.name,
            description: `${isStarred ? "Starred" : "Unstarred"} project "${p.name}"`
          })
          return { ...p, starred: isStarred } as Project
        }
        return p
      })
    )
  }

  const toggleArchiveProject = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const isArchived = !(p as any).archived
          addActivity({
            type: "archive",
            projectId: id,
            projectName: p.name,
            description: `${isArchived ? "Archived" : "Unarchived"} project "${p.name}"`
          })
          return { ...p, archived: isArchived } as Project
        }
        return p
      })
    )
  }

  const exportProjects = (format: "json" | "csv") => {
    if (format === "json") {
      const dataStr = JSON.stringify(projects, null, 2)
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
      const exportFileDefaultName = `projects-export-${new Date().toISOString().split('T')[0]}.json`
      
      const linkElement = document.createElement("a")
      linkElement.setAttribute("href", dataUri)
      linkElement.setAttribute("download", exportFileDefaultName)
      linkElement.click()
    } else if (format === "csv") {
      const headers = ["ID", "Name", "Status", "Priority", "Progress", "Client", "Start Date", "End Date"]
      const rows = projects.map(p => [
        p.id,
        p.name,
        p.status,
        p.priority,
        `${p.progress}%`,
        p.client || "",
        new Date(p.startDate).toISOString().split('T')[0],
        new Date(p.endDate).toISOString().split('T')[0]
      ])
      
      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
      ].join("\n")
      
      const dataUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent)
      const exportFileDefaultName = `projects-export-${new Date().toISOString().split('T')[0]}.csv`
      
      const linkElement = document.createElement("a")
      linkElement.setAttribute("href", dataUri)
      linkElement.setAttribute("download", exportFileDefaultName)
      linkElement.click()
    }
  }

  return (
    <ProjectsContext.Provider value={{ 
      projects, 
      activities,
      addProject, 
      updateProject, 
      deleteProject,
      duplicateProject,
      toggleStarProject,
      toggleArchiveProject,
      exportProjects
    }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider")
  }
  return context
}
