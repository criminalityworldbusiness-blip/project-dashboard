"use client"

import { useTheme } from "@/lib/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Moon, Sun, Monitor, X } from "lucide-react"
import { cn } from "@/lib/utils"

type SettingsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme, isDark } = useTheme()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md bg-background rounded-lg shadow-lg border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Settings</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Theme Section */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                  theme === "light"
                    ? "border-blue-600 bg-blue-50"
                    : "border-border hover:border-border/80"
                )}
              >
                <Sun className="h-5 w-5" />
                <span className="text-sm font-medium">Light</span>
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                  theme === "dark"
                    ? "border-blue-600 bg-blue-50"
                    : "border-border hover:border-border/80"
                )}
              >
                <Moon className="h-5 w-5" />
                <span className="text-sm font-medium">Dark</span>
              </button>

              <button
                onClick={() => setTheme("system")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                  theme === "system"
                    ? "border-blue-600 bg-blue-50"
                    : "border-border hover:border-border/80"
                )}
              >
                <Monitor className="h-5 w-5" />
                <span className="text-sm font-medium">System</span>
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Currently using: {isDark ? "Dark" : "Light"} mode
            </p>
          </div>

          {/* Keyboard Shortcuts Info */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Keyboard Shortcuts</Label>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <span className="text-muted-foreground">Open command menu</span>
                <kbd className="px-2 py-1 rounded bg-background border text-xs font-mono">⌘K</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <span className="text-muted-foreground">New project</span>
                <kbd className="px-2 py-1 rounded bg-background border text-xs font-mono">⌘N</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <span className="text-muted-foreground">Search</span>
                <kbd className="px-2 py-1 rounded bg-background border text-xs font-mono">⌘F</kbd>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="pt-4 border-t">
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Build:</strong> Production</p>
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
