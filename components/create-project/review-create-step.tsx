"use client"

import { useProjectForm } from "@/components/create-project-modal"
import { Separator } from "@/components/ui/separator"
import { Badge } from "lucide-react"
import { format } from "date-fns"

export function ReviewCreateStep() {
  const { formData } = useProjectForm()

  const InfoRow = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="flex justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value || "Not specified"}</span>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Review & Create</h2>
        <p className="text-sm text-muted-foreground">
          Review your project details before creating
        </p>
      </div>

      {/* Project Intent */}
      <div className="rounded-lg border p-4 space-y-2">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold">
            ✓
          </span>
          Project Intent
        </h3>
        <InfoRow label="Name" value={formData.name} />
        <InfoRow label="Client" value={formData.client} />
        <InfoRow label="Type" value={formData.projectType} />
        <InfoRow label="Status" value={formData.status} />
        <InfoRow label="Priority" value={formData.priority} />
        {formData.startDate && (
          <InfoRow label="Start Date" value={format(formData.startDate, "MMM dd, yyyy")} />
        )}
        {formData.endDate && (
          <InfoRow label="End Date" value={format(formData.endDate, "MMM dd, yyyy")} />
        )}
        {formData.description && (
          <div className="pt-2">
            <span className="text-sm text-muted-foreground">Description:</span>
            <p className="text-sm mt-1">{formData.description}</p>
          </div>
        )}
      </div>

      {/* Outcome & Success */}
      <div className="rounded-lg border p-4 space-y-2">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold">
            ✓
          </span>
          Outcome & Success
        </h3>
        <InfoRow label="Success Type" value={formData.successType} />
        {formData.successType === "metric" && formData.metrics.length > 0 && (
          <div className="pt-2">
            <span className="text-sm text-muted-foreground mb-2 block">Metrics:</span>
            <div className="space-y-2">
              {formData.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between text-sm bg-muted/50 p-2 rounded">
                  <span>{metric.name || "Unnamed metric"}</span>
                  <span className="font-medium">{metric.target}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {formData.deadline && (
          <InfoRow label="Deadline" value={format(formData.deadline, "MMM dd, yyyy")} />
        )}
      </div>

      {/* Ownership */}
      <div className="rounded-lg border p-4 space-y-2">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold">
            ✓
          </span>
          Ownership
        </h3>
        {formData.owners.length > 0 && (
          <div className="pt-2">
            <span className="text-sm text-muted-foreground mb-2 block">Project Owners:</span>
            <div className="space-y-1">
              {formData.owners.map((owner) => (
                <div key={owner.id} className="flex justify-between text-sm bg-muted/50 p-2 rounded">
                  <span>{owner.name}</span>
                  <span className="text-muted-foreground">{owner.accessLevel}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {formData.contributors.length > 0 && (
          <div className="pt-2">
            <span className="text-sm text-muted-foreground mb-2 block">Contributors:</span>
            <div className="space-y-1">
              {formData.contributors.map((contributor) => (
                <div key={contributor.id} className="flex justify-between text-sm bg-muted/50 p-2 rounded">
                  <span>{contributor.name}</span>
                  <span className="text-muted-foreground">{contributor.permission}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {formData.stakeholders.length > 0 && (
          <div className="pt-2">
            <span className="text-sm text-muted-foreground mb-2 block">Stakeholders:</span>
            <div className="space-y-1">
              {formData.stakeholders.map((stakeholder) => (
                <div key={stakeholder.id} className="flex justify-between text-sm bg-muted/50 p-2 rounded">
                  <span>{stakeholder.name}</span>
                  <span className="text-muted-foreground">{stakeholder.permission}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Work Structure */}
      <div className="rounded-lg border p-4 space-y-2">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold">
            ✓
          </span>
          Work Structure
        </h3>
        <InfoRow label="Workflow" value={formData.workflow} />
        <InfoRow label="Starter Tasks" value={formData.addStarterTasks ? "Yes" : "No"} />
      </div>

      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
        <p className="text-sm text-blue-900">
          <strong>Ready to create?</strong> Click "Create Project" below to add this project to your dashboard.
        </p>
      </div>
    </div>
  )
}
