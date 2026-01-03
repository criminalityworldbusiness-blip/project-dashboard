"use client"

import { useState } from "react"
import type { Project } from "@/lib/data/projects"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, MoreVertical, Trash2, Edit2, GripVertical } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type Workstream = {
  id: string
  name: string
  order: number
}

type ProjectWorkstreamProps = {
  project: Project
}

export function ProjectWorkstream({ project }: ProjectWorkstreamProps) {
  const [workstreams, setWorkstreams] = useState<Workstream[]>([
    { id: "1", name: "Research & Discovery", order: 1 },
    { id: "2", name: "Design", order: 2 },
    { id: "3", name: "Development", order: 3 },
    { id: "4", name: "Testing & QA", order: 4 },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [newWorkstreamName, setNewWorkstreamName] = useState("")

  const handleStartEdit = (workstream: Workstream) => {
    setEditingId(workstream.id)
    setEditValue(workstream.name)
  }

  const handleSaveEdit = (id: string) => {
    if (editValue.trim()) {
      setWorkstreams(workstreams.map(w => 
        w.id === id ? { ...w, name: editValue.trim() } : w
      ))
    }
    setEditingId(null)
    setEditValue("")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditValue("")
  }

  const handleDelete = (id: string) => {
    setWorkstreams(workstreams.filter(w => w.id !== id))
  }

  const handleAddWorkstream = () => {
    if (newWorkstreamName.trim()) {
      const newWorkstream: Workstream = {
        id: String(Date.now()),
        name: newWorkstreamName.trim(),
        order: workstreams.length + 1
      }
      setWorkstreams([...workstreams, newWorkstream])
      setNewWorkstreamName("")
    }
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Workstreams</h2>
        <p className="text-sm text-muted-foreground">
          Organize your project into distinct workstreams or phases
        </p>
      </div>

      {/* Workstreams List */}
      <div className="space-y-3">
        {workstreams.map((workstream) => (
          <div
            key={workstream.id}
            className="group flex items-center gap-3 p-4 rounded-lg border border-border bg-background hover:shadow-sm transition-all"
            data-testid={`workstream-${workstream.id}`}
          >
            {/* Drag Handle */}
            <button
              className="cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
              data-testid={`drag-workstream-${workstream.id}`}
            >
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* Workstream Number */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              {workstream.order}
            </div>

            {/* Workstream Name (Editable) */}
            {editingId === workstream.id ? (
              <div className="flex-1 flex items-center gap-2">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit(workstream.id)
                    if (e.key === "Escape") handleCancelEdit()
                  }}
                  className="h-9"
                  autoFocus
                  data-testid={`edit-input-${workstream.id}`}
                />
                <Button
                  size="sm"
                  onClick={() => handleSaveEdit(workstream.id)}
                  data-testid={`save-edit-${workstream.id}`}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCancelEdit}
                  data-testid={`cancel-edit-${workstream.id}`}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <span className="flex-1 font-medium">{workstream.name}</span>

                {/* Actions Menu */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid={`actions-${workstream.id}`}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2" align="end">
                    <div className="space-y-1">
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                        onClick={() => handleStartEdit(workstream)}
                        data-testid={`rename-${workstream.id}`}
                      >
                        <Edit2 className="h-4 w-4" />
                        Rename
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted text-red-600 transition-colors"
                        onClick={() => handleDelete(workstream.id)}
                        data-testid={`delete-${workstream.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            )}
          </div>
        ))}

        {/* Add New Workstream */}
        <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-border hover:border-blue-300 hover:bg-blue-50/50 transition-all">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            placeholder="Add new workstream..."
            value={newWorkstreamName}
            onChange={(e) => setNewWorkstreamName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddWorkstream()
            }}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            data-testid="new-workstream-input"
          />
          <Button
            size="sm"
            onClick={handleAddWorkstream}
            disabled={!newWorkstreamName.trim()}
            data-testid="add-workstream-btn"
          >
            Add
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {workstreams.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">No workstreams yet</h3>
          <p className="text-sm text-muted-foreground">
            Add your first workstream to organize your project
          </p>
        </div>
      )}
    </div>
  )
}
