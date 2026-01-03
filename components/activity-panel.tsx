"use client"

import { useProjects } from "@/lib/contexts/projects-context"
import { formatDistanceToNow } from "date-fns"
import { X, FileText, Star, Archive, Trash2, Edit, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ActivityPanelProps = {
  isOpen: boolean
  onClose: () => void
}

export function ActivityPanel({ isOpen, onClose }: ActivityPanelProps) {
  const { activities } = useProjects()

  const getIcon = (type: string) => {
    switch (type) {
      case "create":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "update":
        return <Edit className="h-4 w-4 text-orange-600" />
      case "delete":
        return <Trash2 className="h-4 w-4 text-red-600" />
      case "star":
        return <Star className="h-4 w-4 text-yellow-600" />
      case "archive":
        return <Archive className="h-4 w-4 text-gray-600" />
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div
      className={cn(
        "fixed right-0 top-0 bottom-0 w-80 bg-background border-l border-border shadow-lg transition-transform duration-300 z-50",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Recent Activity</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Activity List */}
        <div className="flex-1 overflow-y-auto p-4">
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background">
                    {getIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.projectName}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <p className="text-xs text-muted-foreground text-center">
            Showing last {activities.length} {activities.length === 1 ? "action" : "actions"}
          </p>
        </div>
      </div>
    </div>
  )
}
