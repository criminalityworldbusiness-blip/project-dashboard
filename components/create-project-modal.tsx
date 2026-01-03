"use client"

import { useState, createContext, useContext } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ArrowLeft, ArrowRight } from "lucide-react"
import { ProjectIntentStep } from "@/components/create-project/project-intent-step"
import { OutcomeSuccessStep } from "@/components/create-project/outcome-success-step"
import { OwnershipStep } from "@/components/create-project/ownership-step"
import { WorkStructureStep } from "@/components/create-project/work-structure-step"
import { ReviewCreateStep } from "@/components/create-project/review-create-step"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/data/projects"

export type ProjectFormData = {
  // Step 1: Project Intent
  name: string
  description: string
  client: string
  projectType: string
  startDate: Date | undefined
  endDate: Date | undefined
  
  // Step 2: Outcome & Success
  successType: "deliverable" | "metric" | "not-defined"
  metrics: Array<{ name: string; target: string }>
  projectBrief: {
    goal: string
    scope: string
    inScope: string
    outOfScope: string
    keyFeature: string
    expectedOutcomes: string
  }
  deadline: Date | undefined
  
  // Step 3: Ownership
  owners: Array<{ id: string; name: string; accessLevel: string }>
  contributors: Array<{ id: string; name: string; permission: string }>
  stakeholders: Array<{ id: string; name: string; permission: string }>
  
  // Step 4: Work Structure
  workflow: "linear" | "milestone" | "multi-stream"
  addStarterTasks: boolean
  
  // Additional
  status: "backlog" | "planned" | "active" | "cancelled" | "completed"
  priority: "urgent" | "high" | "medium" | "low"
  tags: string[]
}

const initialFormData: ProjectFormData = {
  name: "",
  description: "",
  client: "",
  projectType: "MVP",
  startDate: undefined,
  endDate: undefined,
  successType: "not-defined",
  metrics: [],
  projectBrief: {
    goal: "",
    scope: "",
    inScope: "",
    outOfScope: "",
    keyFeature: "",
    expectedOutcomes: "",
  },
  deadline: undefined,
  owners: [],
  contributors: [],
  stakeholders: [],
  workflow: "linear",
  addStarterTasks: false,
  status: "planned",
  priority: "medium",
  tags: [],
}

type ProjectFormContextType = {
  formData: ProjectFormData
  updateFormData: (data: Partial<ProjectFormData>) => void
}

const ProjectFormContext = createContext<ProjectFormContextType | null>(null)

export const useProjectForm = () => {
  const context = useContext(ProjectFormContext)
  if (!context) {
    throw new Error("useProjectForm must be used within ProjectFormProvider")
  }
  return context
}

type CreateProjectModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateProject: (project: Project) => void
}

export function CreateProjectModal({ open, onOpenChange, onCreateProject }: CreateProjectModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData)

  const updateFormData = (data: Partial<ProjectFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const steps = [
    { number: 1, label: "Project intent", completed: currentStep > 1 },
    { number: 2, label: "Outcome & success", completed: currentStep > 2 },
    { number: 3, label: "Ownership", completed: currentStep > 3 },
    { number: 4, label: "Work structure", completed: currentStep > 4 },
    { number: 5, label: "Review & create", completed: false },
  ]

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Create project with complete data
      const now = new Date()
      const newProject: Project = {
        id: String(Date.now()),
        name: formData.name || "Untitled Project",
        taskCount: formData.addStarterTasks ? 3 : 0,
        progress: 0,
        startDate: formData.startDate || now,
        endDate: formData.endDate || new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        status: formData.status,
        priority: formData.priority,
        tags: formData.tags.length > 0 ? formData.tags : ["new"],
        members: [
          ...formData.owners.map(o => o.name),
          ...formData.contributors.map(c => c.name),
        ],
        client: formData.client,
        typeLabel: formData.projectType,
        durationLabel: formData.endDate && formData.startDate 
          ? `${Math.ceil((formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24))} days`
          : "TBD",
        tasks: formData.addStarterTasks ? [
          {
            id: `${Date.now()}-1`,
            name: "Project Setup",
            assignee: formData.owners[0]?.name || "Unassigned",
            status: "todo",
            startDate: formData.startDate || now,
            endDate: new Date((formData.startDate || now).getTime() + 7 * 24 * 60 * 60 * 1000),
          },
          {
            id: `${Date.now()}-2`,
            name: "Initial Planning",
            assignee: formData.owners[0]?.name || "Unassigned",
            status: "todo",
            startDate: formData.startDate || now,
            endDate: new Date((formData.startDate || now).getTime() + 7 * 24 * 60 * 60 * 1000),
          },
          {
            id: `${Date.now()}-3`,
            name: "Kick-off Meeting",
            assignee: formData.owners[0]?.name || "Unassigned",
            status: "todo",
            startDate: formData.startDate || now,
            endDate: new Date((formData.startDate || now).getTime() + 7 * 24 * 60 * 60 * 1000),
          },
        ] : [],
      }
      onCreateProject(newProject)
      handleClose()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleClose = () => {
    setCurrentStep(1)
    setFormData(initialFormData)
    onOpenChange(false)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ProjectIntentStep />
      case 2:
        return <OutcomeSuccessStep />
      case 3:
        return <OwnershipStep />
      case 4:
        return <WorkStructureStep />
      case 5:
        return <ReviewCreateStep />
      default:
        return null
    }
  }

  return (
    <ProjectFormContext.Provider value={{ formData, updateFormData }}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="!max-w-6xl w-[90vw] h-[90vh] p-0 gap-0 overflow-hidden"
          showCloseButton={false}
        >
          <div className="flex h-full">
            {/* Left Sidebar - Stepper */}
            <div className="w-72 bg-muted/20 border-r border-border p-6 flex flex-col">
              <div className="mb-8">
                <h2 className="text-xl font-semibold">New Project</h2>
              </div>
              <div className="space-y-3 flex-1">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all",
                        currentStep === step.number &&
                          "bg-blue-600 text-white",
                        step.completed &&
                          "bg-green-500 text-white",
                        currentStep !== step.number &&
                          !step.completed &&
                          "bg-muted text-muted-foreground border border-border"
                      )}
                    >
                      {step.completed ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm",
                        currentStep === step.number
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 flex flex-col">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-8 py-6">
                {renderStep()}
              </div>

              {/* Footer */}
              <div className="border-t border-border px-8 py-4 flex items-center justify-between bg-muted/10">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  data-testid="create-project-back-btn"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  data-testid="create-project-next-btn"
                >
                  {currentStep === 5 ? "Create Project" : "Next"}
                  {currentStep < 5 && <ArrowRight className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ProjectFormContext.Provider>
  )
}
