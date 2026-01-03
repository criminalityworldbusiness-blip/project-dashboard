"use client"

import { useState } from "react"
import type { Project } from "@/lib/data/projects"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, MoreVertical, Trash2, Edit2, GripVertical, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Task = {
  id: string
  name: string
  completed: boolean
  dueDate?: string
  assignee?: {
    name: string
    avatar?: string
  }
}

type Workstream = {
  id: string
  name: string
  order: number
  tasks: Task[]
  isExpanded: boolean
}

type ProjectWorkstreamProps = {
  project: Project
}

export function ProjectWorkstream({ project }: ProjectWorkstreamProps) {
  const [workstreams, setWorkstreams] = useState<Workstream[]>([
    {
      id: "1",
      name: "Processing documents for signing the deal",
      order: 1,
      isExpanded: true,
      tasks: [
        {
          id: "1-1",
          name: "Processing documents for signing the deal",
          completed: true,
          dueDate: "Today",
          assignee: { name: "JD", avatar: "/avatar-profile.jpg" }
        },
        {
          id: "1-2",
          name: "Internal approval & sign-off",
          completed: false,
          dueDate: "Today",
          assignee: { name: "JD", avatar: "/avatar-profile.jpg" }
        },
        {
          id: "1-3",
          name: "Send contract to client",
          completed: false,
          dueDate: "Tomorrow",
          assignee: { name: "JD", avatar: "/avatar-profile.jpg" }
        },
        {
          id: "1-4",
          name: "Track client signature",
          completed: false,
          dueDate: "Feb 26",
          assignee: { name: "JD", avatar: "/avatar-profile.jpg" }
        },
      ]
    },
    {
      id: "2",
      name: "Client onboarding setup",
      order: 2,
      isExpanded: false,
      tasks: [
        {
          id: "2-1",
          name: "Setup client account",
          completed: true,
          dueDate: "Today"
        },
        {
          id: "2-2",
          name: "Configure permissions",
          completed: true,
          dueDate: "Today"
        },
        {
          id: "2-3",
          name: "Schedule kickoff meeting",
          completed: true,
          dueDate: "Tomorrow"
        },
        {
          id: "2-4",
          name: "Send welcome package",
          completed: false,
          dueDate: "Feb 26"
        },
        {
          id: "2-5",
          name: "Training session",
          completed: false,
          dueDate: "Feb 28"
        }
      ]
    },
    {
      id: "3",
      name: "Product wireframe & review",
      order: 3,
      isExpanded: false,
      tasks: []
    },
  ])

  const [editingWorkstreamId, setEditingWorkstreamId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editTaskValue, setEditTaskValue] = useState("")
  const [newWorkstreamName, setNewWorkstreamName] = useState("")
  const [addingTaskToWorkstream, setAddingTaskToWorkstream] = useState<string | null>(null)
  const [newTaskName, setNewTaskName] = useState("")

  const toggleWorkstream = (id: string) => {
    setWorkstreams(workstreams.map(w => 
      w.id === id ? { ...w, isExpanded: !w.isExpanded } : w
    ))
  }

  const handleStartEditWorkstream = (workstream: Workstream) => {
    setEditingWorkstreamId(workstream.id)
    setEditValue(workstream.name)
  }

  const handleSaveEditWorkstream = (id: string) => {
    if (editValue.trim()) {
      setWorkstreams(workstreams.map(w => 
        w.id === id ? { ...w, name: editValue.trim() } : w
      ))
    }
    setEditingWorkstreamId(null)
    setEditValue("")
  }

  const handleDeleteWorkstream = (id: string) => {
    setWorkstreams(workstreams.filter(w => w.id !== id))
  }

  const handleAddWorkstream = () => {
    if (newWorkstreamName.trim()) {
      const newWorkstream: Workstream = {
        id: String(Date.now()),
        name: newWorkstreamName.trim(),
        order: workstreams.length + 1,
        tasks: [],
        isExpanded: true
      }
      setWorkstreams([...workstreams, newWorkstream])
      setNewWorkstreamName("")
    }
  }

  const handleToggleTask = (workstreamId: string, taskId: string) => {
    setWorkstreams(workstreams.map(w => {
      if (w.id === workstreamId) {
        return {
          ...w,
          tasks: w.tasks.map(t => 
            t.id === taskId ? { ...t, completed: !t.completed } : t
          )
        }
      }
      return w
    }))
  }

  const handleAddTask = (workstreamId: string) => {
    if (newTaskName.trim()) {
      setWorkstreams(workstreams.map(w => {
        if (w.id === workstreamId) {
          const newTask: Task = {
            id: `${workstreamId}-${Date.now()}`,
            name: newTaskName.trim(),
            completed: false
          }
          return { ...w, tasks: [...w.tasks, newTask] }
        }
        return w
      }))
      setNewTaskName("")
      setAddingTaskToWorkstream(null)
    }
  }

  const handleDeleteTask = (workstreamId: string, taskId: string) => {
    setWorkstreams(workstreams.map(w => {
      if (w.id === workstreamId) {
        return { ...w, tasks: w.tasks.filter(t => t.id !== taskId) }
      }
      return w
    }))
  }

  const handleStartEditTask = (task: Task) => {
    setEditingTaskId(task.id)
    setEditTaskValue(task.name)
  }

  const handleSaveEditTask = (workstreamId: string, taskId: string) => {
    if (editTaskValue.trim()) {
      setWorkstreams(workstreams.map(w => {
        if (w.id === workstreamId) {
          return {
            ...w,
            tasks: w.tasks.map(t => 
              t.id === taskId ? { ...t, name: editTaskValue.trim() } : t
            )
          }
        }
        return w
      }))
    }
    setEditingTaskId(null)
    setEditTaskValue("")
  }

  const getCompletedCount = (workstream: Workstream) => {
    return workstream.tasks.filter(t => t.completed).length
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Workstreams</h2>
        <p className="text-sm text-muted-foreground">
          Organize your project into distinct workstreams with tasks
        </p>
      </div>

      {/* Workstreams List */}
      <div className="space-y-2">
        {workstreams.map((workstream) => {
          const completedCount = getCompletedCount(workstream)
          const totalCount = workstream.tasks.length
          const progressColor = completedCount === totalCount && totalCount > 0 ? "text-green-600" : "text-orange-600"

          return (
            <div
              key={workstream.id}
              className="border border-border rounded-lg overflow-hidden bg-background"
              data-testid={`workstream-${workstream.id}`}
            >
              {/* Workstream Header */}
              <div className="group flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors">
                {/* Expand/Collapse Button */}
                <button
                  onClick={() => toggleWorkstream(workstream.id)}
                  className="shrink-0"
                  data-testid={`toggle-workstream-${workstream.id}`}
                >
                  {workstream.isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>

                {/* Workstream Name (Editable) */}
                {editingWorkstreamId === workstream.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEditWorkstream(workstream.id)
                        if (e.key === "Escape") setEditingWorkstreamId(null)
                      }}
                      className="h-9"
                      autoFocus
                      data-testid={`edit-workstream-input-${workstream.id}`}
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSaveEditWorkstream(workstream.id)}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingWorkstreamId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1 font-medium">{workstream.name}</span>

                    {/* Add Task Button */}
                    <button
                      onClick={() => setAddingTaskToWorkstream(workstream.id)}
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid={`add-task-btn-${workstream.id}`}
                    >
                      <Plus className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>

                    {/* Progress Count */}
                    <span className={cn("text-sm font-medium", progressColor)}>
                      {completedCount}/{totalCount}
                    </span>

                    {/* Progress Indicator */}
                    <div className="h-2 w-2 rounded-full bg-current" />

                    {/* Actions Menu */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          data-testid={`workstream-actions-${workstream.id}`}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 p-2" align="end">
                        <div className="space-y-1">
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                            onClick={() => handleStartEditWorkstream(workstream)}
                          >
                            <Edit2 className="h-4 w-4" />
                            Rename
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted text-red-600 transition-colors"
                            onClick={() => handleDeleteWorkstream(workstream.id)}
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

              {/* Tasks List (Collapsible) */}
              {workstream.isExpanded && (
                <div className="border-t border-border bg-muted/10">
                  {workstream.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="group flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors border-b border-border/50 last:border-0"
                      data-testid={`task-${task.id}`}
                    >
                      {/* Drag Handle */}
                      <button className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                      </button>

                      {/* Checkbox */}
                      <button
                        onClick={() => handleToggleTask(workstream.id, task.id)}
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                          task.completed
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 hover:border-blue-400"
                        )}
                        data-testid={`toggle-task-${task.id}`}
                      >
                        {task.completed && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>

                      {/* Task Name */}
                      {editingTaskId === task.id ? (
                        <div className="flex-1 flex items-center gap-2">
                          <Input
                            value={editTaskValue}
                            onChange={(e) => setEditTaskValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveEditTask(workstream.id, task.id)
                              if (e.key === "Escape") setEditingTaskId(null)
                            }}
                            className="h-8"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={() => handleSaveEditTask(workstream.id, task.id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingTaskId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <span
                          className={cn(
                            "flex-1 text-sm",
                            task.completed && "text-muted-foreground line-through"
                          )}
                        >
                          {task.name}
                        </span>
                      )}

                      {/* Due Date */}
                      {task.dueDate && (
                        <span className={cn(
                          "text-xs shrink-0",
                          task.dueDate === "Today" ? "text-red-600" :
                          task.dueDate === "Tomorrow" ? "text-yellow-600" :
                          "text-muted-foreground"
                        )}>
                          {task.dueDate}
                        </span>
                      )}

                      {/* Assignee */}
                      {task.assignee && (
                        <Avatar className="h-6 w-6 shrink-0">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback className="text-xs">
                            {task.assignee.name}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      {/* Task Actions */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 p-2" align="end">
                          <div className="space-y-1">
                            <button
                              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-md hover:bg-muted transition-colors"
                              onClick={() => handleStartEditTask(task)}
                            >
                              <Edit2 className="h-3 w-3" />
                              Edit
                            </button>
                            <button
                              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded-md hover:bg-muted text-red-600 transition-colors"
                              onClick={() => handleDeleteTask(workstream.id, task.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  ))}

                  {/* Add New Task Input */}
                  {addingTaskToWorkstream === workstream.id && (
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-blue-50/30">
                      <div className="w-5 shrink-0" />
                      <div className="w-5 shrink-0" />
                      <Input
                        placeholder="Task name..."
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddTask(workstream.id)
                          if (e.key === "Escape") setAddingTaskToWorkstream(null)
                        }}
                        className="flex-1 h-8"
                        autoFocus
                        data-testid={`new-task-input-${workstream.id}`}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAddTask(workstream.id)}
                        disabled={!newTaskName.trim()}
                      >
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setAddingTaskToWorkstream(null)
                          setNewTaskName("")
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  {/* Empty State for Tasks */}
                  {workstream.tasks.length === 0 && addingTaskToWorkstream !== workstream.id && (
                    <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                      No tasks yet. Click the + button to add one.
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {/* Add New Workstream */}
        <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-border hover:border-blue-300 hover:bg-blue-50/30 transition-all">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
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
    </div>
  )
}
