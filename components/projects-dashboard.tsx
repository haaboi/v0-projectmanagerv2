"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Users, MessageSquare } from "lucide-react"
import Link from "next/link"
import { mockProjects } from "@/lib/mock-data"

type ProjectStatus = "active" | "completed" | "not-started"

export function ProjectsDashboard() {
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "all">("all")

  const filteredProjects =
    selectedStatus === "all" ? mockProjects : mockProjects.filter((p) => p.status === selectedStatus)

  const statusCounts = {
    active: mockProjects.filter((p) => p.status === "active").length,
    completed: mockProjects.filter((p) => p.status === "completed").length,
    "not-started": mockProjects.filter((p) => p.status === "not-started").length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-semibold text-foreground">Project Manager</h1>
              <nav className="flex gap-6">
                <Link href="/" className="text-sm font-medium text-foreground border-b-2 border-primary pb-1">
                  Projects
                </Link>
                <Link
                  href="/calendar"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Calendar
                </Link>
                <Link
                  href="/employees"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Employees
                </Link>
              </nav>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Status Filter */}
        <div className="flex gap-3 mb-8">
          <Button
            variant={selectedStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("all")}
          >
            All Projects ({mockProjects.length})
          </Button>
          <Button
            variant={selectedStatus === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("active")}
          >
            Active ({statusCounts.active})
          </Button>
          <Button
            variant={selectedStatus === "not-started" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("not-started")}
          >
            Not Started ({statusCounts["not-started"]})
          </Button>
          <Button
            variant={selectedStatus === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("completed")}
          >
            Completed ({statusCounts.completed})
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="p-5 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-balance">{project.name}</h3>
                  <Badge
                    variant={
                      project.status === "active" ? "default" : project.status === "completed" ? "secondary" : "outline"
                    }
                    className="text-xs"
                  >
                    {project.status === "not-started"
                      ? "Not Started"
                      : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{project.commentCount} comments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>{project.teamSize} members</span>
                  </div>
                </div>

                {project.recentComments.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Recent Activity</p>
                    <div className="space-y-2">
                      {project.recentComments.slice(0, 2).map((comment) => (
                        <div key={comment.id} className="text-xs">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{comment.author}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-muted-foreground line-clamp-1">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
