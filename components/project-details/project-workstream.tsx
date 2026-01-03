"use client"

import type { Project } from "@/lib/data/projects"
import { Check, Circle, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type ProjectWorkstreamProps = {
  project: Project
}

type Workstream = {
  id: string
  name: string
  status: "completed" | "in-progress" | "todo"
  tasks: {
    id: string
    name: string
    completed: boolean
    assignee?: string
  }[]
}

const mockWorkstreams: Workstream[] = [
  {
    id: "1",
    name: "Research & Discovery",
    status: "completed",
    tasks: [
      { id: "1-1", name: "User interviews", completed: true, assignee: "Jason Duong" },
      { id: "1-2", name: "Competitive analysis", completed: true, assignee: "Sarah Chen" },
      { id: "1-3", name: "Flow audit", completed: true, assignee: "Jason Duong" },
    ],
  },
  {
    id: "2",
    name: "Design",
    status: "in-progress",
    tasks: [
      { id: "2-1", name: "Wireframes", completed: true, assignee: "Mitch Sato" },
      { id: "2-2", name: "High-fidelity mockups", completed: true, assignee: "Mitch Sato" },
      { id: "2-3", name: "Design system components", completed: false, assignee: "Emily Davis" },
      { id: "2-4", name: "Prototype", completed: false, assignee: "Mitch Sato" },
    ],
  },
  {
    id: "3",
    name: "Testing & Validation",
    status: "todo",
    tasks: [
      { id: "3-1", name: "Usability testing", completed: false, assignee: "Emily Davis" },
      { id: "3-2", name: "Iterate based on feedback", completed: false, assignee: "Jason Duong" },
    ],
  },
]

export function ProjectWorkstream({ project }: ProjectWorkstreamProps) {
  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Workstreams</h2>
        <p className="text-sm text-muted-foreground">
          Track progress across different phases of the project
        </p>
      </div>

      <div className="space-y-4">
        {mockWorkstreams.map((workstream, index) => {
          const completedTasks = workstream.tasks.filter(t => t.completed).length
          const totalTasks = workstream.tasks.length
          const progressPercent = Math.round((completedTasks / totalTasks) * 100)

          return (
            <div
              key={workstream.id}
              className="border rounded-lg overflow-hidden bg-background"
            >
              {/* Workstream Header */}
              <div className="p-4 border-b bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        workstream.status === "completed" && "bg-green-100",
                        workstream.status === "in-progress" && "bg-blue-100",
                        workstream.status === "todo" && "bg-gray-100"
                      )}
                    >
                      {workstream.status === "completed" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Circle
                          className={cn(
                            "h-4 w-4",
                            workstream.status === "in-progress" && "text-blue-600",
                            workstream.status === "todo" && "text-gray-400"
                          )}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{workstream.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {completedTasks} of {totalTasks} tasks completed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{progressPercent}%</div>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden mt-1">
                        <div
                          className={cn(
                            "h-full transition-all",
                            workstream.status === "completed" && "bg-green-500",
                            workstream.status === "in-progress" && "bg-blue-500",
                            workstream.status === "todo" && "bg-gray-300"
                          )}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Task List */}
              <div className="divide-y">
                {workstream.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded border-2 transition-colors",
                        task.completed
                          ? "bg-blue-600 border-blue-600"
                          : "border-gray-300"
                      )}
                    >
                      {task.completed && (
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span
                      className={cn(
                        "flex-1 text-sm",
                        task.completed && "text-muted-foreground line-through"
                      )}
                    >
                      {task.name}
                    </span>
                    {task.assignee && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/avatar-profile.jpg" />
                          <AvatarFallback className="text-xs">
                            {task.assignee.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{task.assignee}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
