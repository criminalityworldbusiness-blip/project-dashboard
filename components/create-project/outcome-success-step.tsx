"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useProjectForm } from "@/components/create-project-modal"
import { Plus, GripVertical, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function OutcomeSuccessStep() {
  const { formData, updateFormData } = useProjectForm()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const successTypes = [
    { value: "deliverable", label: "Deliverable-based" },
    { value: "metric", label: "Metric-based" },
    { value: "not-defined", label: "Not defined yet" },
  ]

  const addMetric = () => {
    updateFormData({
      metrics: [...formData.metrics, { name: "", target: "" }],
    })
  }

  const removeMetric = (index: number) => {
    const newMetrics = formData.metrics.filter((_, i) => i !== index)
    updateFormData({ metrics: newMetrics })
  }

  const updateMetric = (index: number, field: "name" | "target", value: string) => {
    const newMetrics = [...formData.metrics]
    newMetrics[index][field] = value
    updateFormData({ metrics: newMetrics })
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const briefSections = [
    { key: "goal", label: "Goal" },
    { key: "scope", label: "Scope" },
    { key: "inScope", label: "In scope" },
    { key: "expectedOutcomes", label: "Expected Outcomes" },
    { key: "outOfScope", label: "Out of scope" },
    { key: "keyFeature", label: "Key feature" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">How do you define success?</h2>
        <p className="text-sm text-muted-foreground">
          Help your team understand what success looks like
        </p>
      </div>

      {/* Success Type Selection */}
      <div className="flex gap-3">
        {successTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => updateFormData({ successType: type.value as any })}
            className={cn(
              "flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all",
              formData.successType === type.value
                ? "border-green-500 bg-green-50 text-green-900"
                : "border-border bg-background hover:border-border/80"
            )}
            data-testid={`success-type-${type.value}`}
          >
            {type.label}
            {formData.successType === type.value && (
              <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-white text-xs">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Metric-based Section */}
      {formData.successType === "metric" && (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Metrics</Label>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={addMetric}
                data-testid="add-metric-btn"
              >
                <Plus className="h-4 w-4" />
                Add Metric
              </Button>
            </div>

            {formData.metrics.map((metric, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Metric name"
                  value={metric.name}
                  onChange={(e) => updateMetric(index, "name", e.target.value)}
                  className="flex-1"
                  data-testid={`metric-name-${index}`}
                />
                <Input
                  placeholder="Target"
                  value={metric.target}
                  onChange={(e) => updateMetric(index, "target", e.target.value)}
                  className="w-32"
                  data-testid={`metric-target-${index}`}
                />
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => removeMetric(index)}
                  data-testid={`remove-metric-${index}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Project Brief */}
          <div className="space-y-3">
            <Label>Project Brief</Label>
            <Textarea
              placeholder="Project brief, / for AI"
              rows={3}
              className="bg-muted/30"
            />

            {/* Expandable Sections */}
            <div className="space-y-2">
              {briefSections.map((section) => (
                <div key={section.key} className="border rounded-lg">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.key)}
                    className="w-full flex items-center justify-between p-3 text-sm font-medium hover:bg-muted/50 transition-colors"
                    data-testid={`brief-section-${section.key}`}
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {section.label}
                    </span>
                  </button>
                  {expandedSections.has(section.key) && (
                    <div className="p-3 pt-0">
                      <Textarea
                        placeholder={`Enter ${section.label.toLowerCase()}...`}
                        value={formData.projectBrief[section.key as keyof typeof formData.projectBrief]}
                        onChange={(e) =>
                          updateFormData({
                            projectBrief: {
                              ...formData.projectBrief,
                              [section.key]: e.target.value,
                            },
                          })
                        }
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Deadline */}
      <div className="space-y-4">
        <Label>Deadline</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="deadline-type" className="text-sm text-muted-foreground">Type</Label>
            <Input id="deadline-type" value="Target date" disabled className="bg-muted/30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline-date" className="text-sm text-muted-foreground">Pick a date</Label>
            <Input
              id="deadline-date"
              type="date"
              value={formData.deadline?.toISOString().split('T')[0] || ''}
              onChange={(e) => updateFormData({ deadline: e.target.value ? new Date(e.target.value) : undefined })}
              data-testid="deadline-date"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
