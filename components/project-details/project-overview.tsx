"use client"

import type { Project } from "@/lib/data/projects"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight, Search, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ProjectOverviewProps = {
  project: Project
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  // Generate week dates starting from project start date
  const startDate = new Date(project.startDate)
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    return date
  })

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      {/* Goals */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Goals</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Redesign the core user flows of our fintech mobile app to improve usability, reduce friction in key actions (onboarding, payments, transaction history), and align the UI with modern design standards. Focus on quick wins and research-backed improvements.
        </p>
      </div>

      {/* In scope */}
      <div>
        <h2 className="text-lg font-semibold mb-3">In scope</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>UX research (existing users, light interviews)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Core flows redesign (Onboarding, Payment, Transaction history)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Design system (starter components)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Usability fixes for critical flows</span>
          </li>
        </ul>
      </div>

      {/* Out of scope */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Out of scope:</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>New feature ideation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>Backend logic changes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-muted-foreground/50 mt-1">•</span>
            <span>Marketing landing pages</span>
          </li>
        </ul>
      </div>

      {/* Expected Outcomes */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Expected Outcomes</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">•</span>
            <span>Reduce payment flow steps from 6 → 4</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">•</span>
            <span>Increase task success rate (usability test) from 70% → 90%</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">•</span>
            <span>Deliver production-ready UI for MVP build</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">•</span>
            <span>Enable dev handoff without design clarification loops</span>
          </li>
        </ul>
      </div>

      {/* Expected Timeline */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Expected Timeline</h2>
        <div className="border rounded-lg overflow-hidden">
          {/* Timeline Header */}
          <div className="flex items-center justify-between p-3 border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8">
                Today
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm font-medium">
              {format(startDate, 'MMMM yyyy')}
            </div>
            <div className="flex items-center gap-2">
              <select className="h-8 px-2 rounded border bg-background text-sm">
                <option>Week</option>
                <option>Month</option>
                <option>Quarter</option>
              </select>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/20">
                  <th className="text-left p-3 text-sm font-medium min-w-[200px] sticky left-0 bg-muted/20 z-10">
                    Name
                  </th>
                  {weekDates.map((date, i) => (
                    <th
                      key={i}
                      className={cn(
                        "text-center p-3 text-xs font-medium min-w-[80px]",
                        i === 0 && "bg-blue-50"
                      )}
                    >
                      <div>{days[i]}</div>
                      <div className="text-muted-foreground">{date.getDate()}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Task 1 */}
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3 text-sm sticky left-0 bg-background z-10">
                    Audit existing flows
                  </td>
                  <td colSpan={2} className="relative p-0">
                    <div className="h-10 mx-1 my-2 bg-green-100 border border-green-500 rounded flex items-center justify-center text-xs text-green-900">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </td>
                  <td colSpan={5}></td>
                </tr>

                {/* Task 2 */}
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3 text-sm sticky left-0 bg-background z-10">
                    Redesign onboarding & pay...
                  </td>
                  <td colSpan={2}></td>
                  <td colSpan={3} className="relative p-0">
                    <div className="h-10 mx-1 my-2 bg-blue-100 border border-blue-500 rounded"></div>
                  </td>
                  <td colSpan={2}></td>
                </tr>

                {/* Task 3 */}
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3 text-sm sticky left-0 bg-background z-10">
                    Usability testing
                  </td>
                  <td colSpan={4}></td>
                  <td colSpan={2} className="relative p-0">
                    <div className="h-10 mx-1 my-2 bg-orange-100 border border-orange-500 rounded"></div>
                  </td>
                  <td></td>
                </tr>

                {/* Task 4 */}
                <tr className="hover:bg-muted/50">
                  <td className="p-3 text-sm sticky left-0 bg-background z-10">
                    Iterate based on feedback
                  </td>
                  <td colSpan={5}></td>
                  <td colSpan={2} className="relative p-0">
                    <div className="h-10 mx-1 my-2 bg-purple-100 border border-purple-500 rounded"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
