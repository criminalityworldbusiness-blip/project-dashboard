"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useProjectForm } from "@/components/create-project-modal"
import { ArrowRight, Flag, Workflow } from "lucide-react"
import { cn } from "@/lib/utils"

export function WorkStructureStep() {
  const { formData, updateFormData } = useProjectForm()

  const workflows = [
    {
      value: "linear",
      label: "Linear",
      description: "Sequential phases (e.g. Waterfall). One thing after another.",
      icon: ArrowRight,
      preview: ["Planning", "Design", "Build"],
    },
    {
      value: "milestone",
      label: "Milestone",
      description: "Key checkpoints or deadlines to hit along the way.",
      icon: Flag,
      preview: ["Milestone 1", "Milestone 2", "Milestone 3"],
    },
    {
      value: "multi-stream",
      label: "Multi-stream",
      description: "Parallel tracks of work happening simultaneously.",
      icon: Workflow,
      preview: ["Stream A", "Stream B", "Stream C"],
    },
  ]

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How should this project be structured?</h2>
        <p className="text-sm text-muted-foreground">
          Choose the workflow that fits your team best.
        </p>
      </div>

      {/* Workflow Options */}
      <div className="space-y-3">
        {workflows.map((workflow) => {
          const Icon = workflow.icon
          const isSelected = formData.workflow === workflow.value

          return (
            <button
              key={workflow.value}
              onClick={() => updateFormData({ workflow: workflow.value as any })}
              className={cn(
                "w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left",
                isSelected
                  ? "border-blue-500 bg-blue-50/50"
                  : "border-border hover:border-border/80 hover:bg-muted/30"
              )}
              data-testid={`workflow-${workflow.value}`}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  isSelected ? "bg-blue-100" : "bg-muted"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isSelected ? "text-blue-600" : "text-muted-foreground"
                  )}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{workflow.label}</h3>
                  {isSelected && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-8 rounded-full bg-blue-500" />
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <div className="h-2 w-8 rounded-full bg-blue-500" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{workflow.description}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Preview */}
      <div className="rounded-lg border bg-muted/30 p-4">
        <Label className="text-sm font-medium mb-3 block">Preview</Label>
        <div className="flex items-center gap-2">
          {workflows
            .find((w) => w.value === formData.workflow)
            ?.preview.map((phase, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-md bg-background border text-sm">
                  <span className="font-medium">{index + 1}</span> {phase}
                </div>
                {index < 2 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
        </div>
      </div>

      {/* Add Starter Tasks */}
      <div className="flex items-start justify-between p-4 rounded-lg border bg-muted/30">
        <div className="flex-1">
          <Label htmlFor="starter-tasks" className="text-sm font-medium block mb-1">
            Add starter tasks
          </Label>
          <p className="text-sm text-muted-foreground">
            Automatically add default tasks based on your selection.
          </p>
        </div>
        <Switch
          id="starter-tasks"
          checked={formData.addStarterTasks}
          onCheckedChange={(checked) => updateFormData({ addStarterTasks: checked })}
          data-testid="starter-tasks-toggle"
        />
      </div>
    </div>
  )
}
