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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">What's your project about?</h2>
        <p className="text-sm text-muted-foreground">
          Start by giving your project a name and describing what you want to achieve.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name *</Label>
          <Input
            id="project-name"
            placeholder="e.g., Mobile App Redesign"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            data-testid="project-name-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-description">Description</Label>
          <Textarea
            id="project-description"
            placeholder="Describe the project goals and objectives..."
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            rows={4}
            data-testid="project-description-input"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Input
              id="client"
              placeholder="e.g., Acme Corp"
              value={formData.client}
              onChange={(e) => updateFormData({ client: e.target.value })}
              data-testid="project-client-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-type">Project Type</Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => updateFormData({ projectType: value })}
            >
              <SelectTrigger id="project-type" data-testid="project-type-select">
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
            <Label htmlFor="start-date">Start Date</Label>
            <div className="relative">
              <Input
                id="start-date"
                type="date"
                value={formData.startDate?.toISOString().split('T')[0] || ''}
                onChange={(e) => updateFormData({ startDate: e.target.value ? new Date(e.target.value) : undefined })}
                data-testid="project-start-date"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <div className="relative">
              <Input
                id="end-date"
                type="date"
                value={formData.endDate?.toISOString().split('T')[0] || ''}
                onChange={(e) => updateFormData({ endDate: e.target.value ? new Date(e.target.value) : undefined })}
                data-testid="project-end-date"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) => updateFormData({ status: value })}
            >
              <SelectTrigger id="status">
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
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value: any) => updateFormData({ priority: value })}
            >
              <SelectTrigger id="priority">
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
