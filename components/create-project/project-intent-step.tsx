"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProjectForm } from "@/components/create-project-modal"
import { Calendar } from "lucide-react"

export function ProjectIntentStep() {
  const { formData, updateFormData } = useProjectForm()

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">What's your project about?</h2>
        <p className="text-sm text-muted-foreground">
          Start by giving your project a name and describing what you want to achieve.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="project-name" className="text-sm font-medium">Project Name *</Label>
          <Input
            id="project-name"
            placeholder="e.g., Mobile App Redesign"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            data-testid="project-name-input"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-description" className="text-sm font-medium">Description</Label>
          <Textarea
            id="project-description"
            placeholder="Describe the project goals and objectives..."
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            rows={3}
            data-testid="project-description-input"
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client" className="text-sm font-medium">Client</Label>
            <Input
              id="client"
              placeholder="e.g., Acme Corp"
              value={formData.client}
              onChange={(e) => updateFormData({ client: e.target.value })}
              data-testid="project-client-input"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-type" className="text-sm font-medium">Project Type</Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => updateFormData({ projectType: value })}
            >
              <SelectTrigger id="project-type" data-testid="project-type-select" className="h-10">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MVP">MVP</SelectItem>
                <SelectItem value="Revamp">Revamp</SelectItem>
                <SelectItem value="Improvement">Improvement</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Audit">Audit</SelectItem>
                <SelectItem value="Phase 1">Phase 1</SelectItem>
                <SelectItem value="Refactor">Refactor</SelectItem>
                <SelectItem value="Experiment">Experiment</SelectItem>
                <SelectItem value="Polish">Polish</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-sm font-medium">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={formData.startDate?.toISOString().split('T')[0] || ''}
              onChange={(e) => updateFormData({ startDate: e.target.value ? new Date(e.target.value) : undefined })}
              data-testid="project-start-date"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date" className="text-sm font-medium">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={formData.endDate?.toISOString().split('T')[0] || ''}
              onChange={(e) => updateFormData({ endDate: e.target.value ? new Date(e.target.value) : undefined })}
              data-testid="project-end-date"
              className="h-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) => updateFormData({ status: value })}
            >
              <SelectTrigger id="status" className="h-10">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="backlog">Backlog</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value: any) => updateFormData({ priority: value })}
            >
              <SelectTrigger id="priority" className="h-10">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
