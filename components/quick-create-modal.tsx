"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Sparkles } from "lucide-react"
import { users } from "@/lib/data/users"
import type { Project } from "@/lib/data/projects"

type QuickCreateModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateProject: (project: Project) => void
}

export function QuickCreateModal({
  open,
  onOpenChange,
  onCreateProject,
}: QuickCreateModalProps) {
  const [projectTitle, setProjectTitle] = useState("")
  const [description, setDescription] = useState("")
  const [owner, setOwner] = useState(users[0].id)
  const [startDate, setStartDate] = useState("")
  const [client, setClient] = useState("")
  const [status, setStatus] = useState<"backlog" | "planned" | "active">("planned")
  const [sprintType, setSprintType] = useState("2-week")
  const [workstreams, setWorkstreams] = useState("1")
  const [priority, setPriority] = useState<"urgent" | "high" | "medium" | "low">("medium")
  const [tag, setTag] = useState("frontend")

  const handleCreate = () => {
    const now = new Date()
    const selectedUser = users.find(u => u.id === owner)
    
    const newProject: Project = {
      id: String(Date.now()),
      name: projectTitle || "Untitled Project",
      taskCount: 0,
      progress: 0,
      startDate: startDate ? new Date(startDate) : now,
      endDate: new Date((startDate ? new Date(startDate) : now).getTime() + 14 * 24 * 60 * 60 * 1000),
      status,
      priority,
      tags: [tag],
      members: selectedUser ? [selectedUser.name] : [],
      client: client,
      typeLabel: "Quick",
      durationLabel: sprintType,
      tasks: [],
    }

    onCreateProject(newProject)
    handleClose()
  }

  const handleClose = () => {
    setProjectTitle("")
    setDescription("")
    setOwner(users[0].id)
    setStartDate("")
    setClient("")
    setStatus("planned")
    setSprintType("2-week")
    setWorkstreams("1")
    setPriority("medium")
    setTag("frontend")
    onOpenChange(false)
  }

  const selectedUser = users.find(u => u.id === owner)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!max-w-3xl w-[800px] p-0 gap-0"
        showCloseButton={false}
      >
        <div className="flex flex-col h-[600px]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Quick Create Project</h2>
            <button
              onClick={handleClose}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="quick-title" className="text-sm font-medium">Project title *</Label>
              <Input
                id="quick-title"
                placeholder="e.g., Redesign mobile app"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="h-11 text-base"
                data-testid="quick-project-title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quick-description" className="text-sm font-medium">Brief description</Label>
              <Textarea
                id="quick-description"
                placeholder="What's this project about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="resize-none"
                data-testid="quick-project-description"
              />
            </div>

            {/* Quick fields grid */}
            <div className="grid grid-cols-4 gap-3 pt-4">
              {/* Owner */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Owner</Label>
                <Select value={owner} onValueChange={setOwner}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-xs">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{user.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Start date</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-9"
                  data-testid="quick-start-date"
                />
              </div>

              {/* Client */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Client</Label>
                <Input
                  placeholder="Client name"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="h-9"
                  data-testid="quick-client"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Status</Label>
                <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backlog">Backlog</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sprint Type */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Sprint Type</Label>
                <Select value={sprintType} onValueChange={setSprintType}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-week">1 week</SelectItem>
                    <SelectItem value="2-week">2 weeks</SelectItem>
                    <SelectItem value="3-week">3 weeks</SelectItem>
                    <SelectItem value="4-week">4 weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Workstreams */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Workstreams</Label>
                <Select value={workstreams} onValueChange={setWorkstreams}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Priority</Label>
                <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tag */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Tag</Label>
                <Select value={tag} onValueChange={setTag}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="feature">Feature</SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t bg-muted/10">
            <Button
              variant="outline"
              className="gap-2"
              data-testid="ai-review-btn"
            >
              <Sparkles className="h-4 w-4" />
              AI Review
            </Button>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={handleClose}
                data-testid="quick-cancel-btn"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!projectTitle}
                data-testid="quick-create-btn"
              >
                Create Project
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
