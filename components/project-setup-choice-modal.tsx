"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Zap, Target } from "lucide-react"
import { cn } from "@/lib/utils"

type ProjectSetupChoiceModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onChooseQuick: () => void
  onChooseGuided: () => void
}

export function ProjectSetupChoiceModal({
  open,
  onOpenChange,
  onChooseQuick,
  onChooseGuided,
}: ProjectSetupChoiceModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!max-w-2xl w-[600px] p-8 gap-0"
        showCloseButton={false}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              Choose how you'd like to set up your project
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Quick Create */}
            <button
              onClick={onChooseQuick}
              className={cn(
                "relative flex flex-col items-start p-6 rounded-xl border-2 transition-all",
                "hover:border-blue-500 hover:bg-blue-50/50 group"
              )}
              data-testid="quick-create-option"
            >
              <div className="mb-4 p-3 rounded-lg bg-gray-100 group-hover:bg-blue-100">
                <Zap className="h-6 w-6 text-gray-700 group-hover:text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick create</h3>
              <p className="text-sm text-muted-foreground text-left">
                Create a project with minimal setup
              </p>
            </button>

            {/* Guided Setup */}
            <button
              onClick={onChooseGuided}
              className={cn(
                "relative flex flex-col items-start p-6 rounded-xl border-2 transition-all",
                "border-green-500 bg-green-50/50"
              )}
              data-testid="guided-setup-option"
            >
              <div className="absolute top-4 right-4">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
              <div className="mb-4 p-3 rounded-lg bg-green-100">
                <Target className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Guided Setup</h3>
              <p className="text-sm text-muted-foreground text-left">
                Define Goal, ownership, and structure
              </p>
            </button>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              data-testid="cancel-setup-choice"
            >
              Cancel
            </Button>
            <Button
              onClick={onChooseGuided}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="continue-guided-setup"
            >
              Continue
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
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
