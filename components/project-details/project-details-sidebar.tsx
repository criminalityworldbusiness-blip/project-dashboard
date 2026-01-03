"use client"

import type { Project } from "@/lib/data/projects"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Calendar, Users, Target, Link as LinkIcon, FileText, Clock, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type ProjectDetailsSidebarProps = {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailsSidebar({ project, isOpen, onClose }: ProjectDetailsSidebarProps) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Project Details</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onClose}
          data-testid="collapse-sidebar-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M15 3v18" />
            <path d="m9 9 3 3-3 3" />
          </svg>
        </Button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Status */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2">STATUS</div>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                project.status === "active" && "bg-green-500",
                project.status === "planned" && "bg-orange-500",
                project.status === "backlog" && "bg-gray-400",
                project.status === "completed" && "bg-blue-500",
                project.status === "cancelled" && "bg-red-500"
              )}
            />
            <span className="text-sm capitalize">{project.status}</span>
          </div>
        </div>

        {/* Priority */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2">PRIORITY</div>
          <div className="flex items-center gap-2">
            <AlertCircle
              className={cn(
                "h-4 w-4",
                project.priority === "urgent" && "text-red-500",
                project.priority === "high" && "text-orange-500",
                project.priority === "medium" && "text-yellow-500",
                project.priority === "low" && "text-gray-400"
              )}
            />
            <span className="text-sm capitalize">{project.priority}</span>
          </div>
        </div>

        {/* Dates */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2">TIMELINE</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Start:</span>
              <span>{format(new Date(project.startDate), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">End:</span>
              <span>{format(new Date(project.endDate), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Duration:</span>
              <span>{project.durationLabel}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2">PROGRESS</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{project.progress}% Complete</span>
              <span className="text-muted-foreground">{project.taskCount} tasks</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-3">TEAM</div>
          <div className="space-y-2">
            {project.members?.slice(0, 5).map((member, index) => (
              <div key={index} className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/avatar-profile.jpg" />
                  <AvatarFallback className="text-xs">
                    {member.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{member}</span>
              </div>
            ))}
            {project.members && project.members.length > 5 && (
              <button className="text-sm text-blue-600 hover:underline">
                +{project.members.length - 5} more
              </button>
            )}
          </div>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2">TAGS</div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-md bg-muted text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-3">QUICK LINKS</div>
          <div className="space-y-2">
            <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline w-full">
              <FileText className="h-4 w-4" />
              Project Brief
            </button>
            <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline w-full">
              <LinkIcon className="h-4 w-4" />
              Design Files
            </button>
            <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline w-full">
              <Target className="h-4 w-4" />
              Sprint Board
            </button>
            <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline w-full">
              <Users className="h-4 w-4" />
              Team Meeting Notes
            </button>
          </div>
        </div>

        {/* Client Info */}
        {project.client && (
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-2">CLIENT</div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs font-medium">
                  {project.client.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="text-sm">{project.client}</span>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      <div className="border-t p-4">
        <Button className="w-full" size="sm">
          <LinkIcon className="h-4 w-4 mr-2" />
          Share Project
        </Button>
      </div>
    </div>
  )
}
