"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, FileText, Plus, Archive, Star, Download } from "lucide-react"
import { useProjects } from "@/lib/contexts/projects-context"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/data/projects"

type CommandMenuProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectProject: (project: Project) => void
  onCreateProject: () => void
  onExportProjects: () => void
}

export function CommandMenu({ 
  open, 
  onOpenChange, 
  onSelectProject,
  onCreateProject,
  onExportProjects 
}: CommandMenuProps) {
  const { projects } = useProjects()
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(0)

  const commands = [
    { id: "create", label: "Create New Project", icon: Plus, action: onCreateProject },
    { id: "export", label: "Export Projects", icon: Download, action: onExportProjects },
  ]

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.client?.toLowerCase().includes(search.toLowerCase())
  )

  const allItems = [...commands, ...filteredProjects.map(p => ({
    id: p.id,
    label: p.name,
    icon: FileText,
    subtitle: p.client,
    action: () => onSelectProject(p)
  }))]

  const filteredItems = search 
    ? allItems.filter(item => 
        item.label.toLowerCase().includes(search.toLowerCase())
      )
    : allItems

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
      
      if (open) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelected((prev) => (prev + 1) % filteredItems.length)
        }
        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelected((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
        }
        if (e.key === "Enter") {
          e.preventDefault()
          filteredItems[selected]?.action()
          onOpenChange(false)
          setSearch("")
        }
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, selected, filteredItems, onOpenChange])

  useEffect(() => {
    if (!open) {
      setSearch("")
      setSelected(0)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-2xl p-0 gap-0 overflow-hidden" showCloseButton={false}>
        <div className="flex items-center border-b px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects or commands..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setSelected(0)
            }}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            ESC
          </kbd>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action()
                      onOpenChange(false)
                      setSearch("")
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-left",
                      selected === index && "bg-accent"
                    )}
                    onMouseEnter={() => setSelected(index)}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.label}</div>
                      {item.subtitle && (
                        <div className="text-xs text-muted-foreground">{item.subtitle}</div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="border-t px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Navigate with ↑↓, select with ↵</span>
            <span className="flex items-center gap-2">
              <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px]">
                ⌘K
              </kbd>
              to open
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
