"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProjectForm } from "@/components/create-project-modal"
import { users } from "@/lib/data/users"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, X, Users as UsersIcon, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

type TeamMember = {
  id: string
  name: string
  accessLevel: string
}

export function OwnershipStep() {
  const { formData, updateFormData } = useProjectForm()
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addOwner = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (user && !formData.owners.find((o) => o.id === userId)) {
      updateFormData({
        owners: [...formData.owners, { id: user.id, name: user.name, accessLevel: "Full access" }],
      })
    }
    setSearchQuery("")
    setShowSuggestions(false)
  }

  const addContributor = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (user && !formData.contributors.find((c) => c.id === userId)) {
      updateFormData({
        contributors: [...formData.contributors, { id: user.id, name: user.name, permission: "Can edit" }],
      })
    }
    setSearchQuery("")
    setShowSuggestions(false)
  }

  const addStakeholder = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (user && !formData.stakeholders.find((s) => s.id === userId)) {
      updateFormData({
        stakeholders: [...formData.stakeholders, { id: user.id, name: user.name, permission: "Can view" }],
      })
    }
    setSearchQuery("")
    setShowSuggestions(false)
  }

  const removeOwner = (id: string) => {
    updateFormData({
      owners: formData.owners.filter((o) => o.id !== id),
    })
  }

  const removeContributor = (id: string) => {
    updateFormData({
      contributors: formData.contributors.filter((c) => c.id !== id),
    })
  }

  const removeStakeholder = (id: string) => {
    updateFormData({
      stakeholders: formData.stakeholders.filter((s) => s.id !== id),
    })
  }

  const updateOwnerAccess = (id: string, accessLevel: string) => {
    updateFormData({
      owners: formData.owners.map((o) => (o.id === id ? { ...o, accessLevel } : o)),
    })
  }

  const updateContributorPermission = (id: string, permission: string) => {
    updateFormData({
      contributors: formData.contributors.map((c) => (c.id === id ? { ...c, permission } : c)),
    })
  }

  const updateStakeholderPermission = (id: string, permission: string) => {
    updateFormData({
      stakeholders: formData.stakeholders.map((s) => (s.id === id ? { ...s, permission } : s)),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Who is responsible for this project?</h2>
        <p className="text-sm text-muted-foreground">
          Assign project owners, contributors, and stakeholders
        </p>
      </div>

      {/* Project Owners */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Project Owners</Label>
        </div>
        {formData.owners.map((owner) => (
          <div key={owner.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={users.find(u => u.id === owner.id)?.avatar} />
                <AvatarFallback>{owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{owner.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Select value={owner.accessLevel} onValueChange={(value) => updateOwnerAccess(owner.id, value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full access">Full access</SelectItem>
                  <SelectItem value="Can edit">Can edit</SelectItem>
                  <SelectItem value="Can view">Can view</SelectItem>
                </SelectContent>
              </Select>
              <Button size="icon-sm" variant="ghost" onClick={() => removeOwner(owner.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Contributors and Team Members */}
      <div className="space-y-3">
        <Label className="text-sm text-muted-foreground">Assign contributors and team members</Label>
        <div className="relative">
          <div className="flex gap-2">
            <Input
              placeholder="Enter teams, name or email address"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSuggestions(e.target.value.length > 0)
              }}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              data-testid="add-member-input"
            />
            <Button
              variant="outline"
              size="sm"
              disabled={!searchQuery}
              onClick={() => {
                if (filteredUsers.length > 0) {
                  addContributor(filteredUsers[0].id)
                }
              }}
              data-testid="add-member-btn"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          {showSuggestions && filteredUsers.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left"
                  onClick={() => {
                    addContributor(user.id)
                  }}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contributors */}
      {formData.contributors.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Contributors</Label>
          </div>
          {formData.contributors.map((contributor) => (
            <div key={contributor.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={users.find(u => u.id === contributor.id)?.avatar} />
                  <AvatarFallback>{contributor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{contributor.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Select value={contributor.permission} onValueChange={(value) => updateContributorPermission(contributor.id, value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Can edit">Can edit</SelectItem>
                    <SelectItem value="Can view">Can view</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="icon-sm" variant="ghost" onClick={() => removeContributor(contributor.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stakeholders */}
      {formData.stakeholders.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Stakeholders</Label>
          </div>
          {formData.stakeholders.map((stakeholder) => (
            <div key={stakeholder.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={users.find(u => u.id === stakeholder.id)?.avatar} />
                  <AvatarFallback>{stakeholder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{stakeholder.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Select value={stakeholder.permission} onValueChange={(value) => updateStakeholderPermission(stakeholder.id, value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Can view">Can view</SelectItem>
                    <SelectItem value="Can edit">Can edit</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="icon-sm" variant="ghost" onClick={() => removeStakeholder(stakeholder.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => addOwner(users[0].id)}
          disabled={formData.owners.some(o => o.id === users[0].id)}
          data-testid="add-owner-quick"
        >
          <Plus className="h-4 w-4" />
          Add as Owner
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addStakeholder(users[2].id)}
          disabled={formData.stakeholders.some(s => s.id === users[2].id)}
          data-testid="add-stakeholder-quick"
        >
          <Plus className="h-4 w-4" />
          Add as Stakeholder
        </Button>
      </div>
    </div>
  )
}
