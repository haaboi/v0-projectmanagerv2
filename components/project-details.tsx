"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MessageSquare, Users } from "lucide-react"
import Link from "next/link"
import { mockProjects, mockComments, mockEmployees } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProjectDetailsProps {
  projectId: string
}

type FilterType = "all" | "this-week" | "last-week" | "this-month" | "last-month" | "custom"

export function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const [filterType, setFilterType] = useState<FilterType>("all")
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")

  const project = mockProjects.find((p) => p.id === projectId)
  const allProjectComments = mockComments.filter((c) => c.projectId === projectId)

  // Filter comments based on selected timespan
  const filteredComments = useMemo(() => {
    if (filterType === "all") return allProjectComments

    const now = new Date()
    let startDate: Date
    let endDate: Date = now

    switch (filterType) {
      case "this-week":
        startDate = new Date(now)
        startDate.setDate(now.getDate() - now.getDay()) // Start of this week (Sunday)
        break
      case "last-week":
        endDate = new Date(now)
        endDate.setDate(now.getDate() - now.getDay() - 1) // End of last week (Saturday)
        startDate = new Date(endDate)
        startDate.setDate(endDate.getDate() - 6) // Start of last week (Sunday)
        break
      case "this-month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case "last-month":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        endDate = new Date(now.getFullYear(), now.getMonth(), 0)
        break
      case "custom":
        if (!customStartDate || !customEndDate) return allProjectComments
        startDate = new Date(customStartDate)
        endDate = new Date(customEndDate)
        endDate.setHours(23, 59, 59, 999) // Include the entire end date
        break
      default:
        return allProjectComments
    }

    return allProjectComments.filter((comment) => {
      const commentDate = new Date(comment.timestamp)
      return commentDate >= startDate && commentDate <= endDate
    })
  }, [filterType, customStartDate, customEndDate, allProjectComments])

  // Group comments by date
  const commentsByDate = useMemo(() => {
    const grouped: Record<string, typeof filteredComments> = {}
    filteredComments.forEach((comment) => {
      const dateKey = comment.date
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(comment)
    })
    return grouped
  }, [filteredComments])

  const sortedDates = Object.keys(commentsByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Project not found</h2>
          <Link href="/">
            <Button variant="outline">Back to Projects</Button>
          </Link>
        </div>
      </div>
    )
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-2 text-balance">{project.name}</h2>
              <p className="text-muted-foreground text-lg">{project.description}</p>
            </div>
            <Badge
              variant={
                project.status === "active" ? "default" : project.status === "completed" ? "secondary" : "outline"
              }
            >
              {project.status === "not-started"
                ? "Not Started"
                : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>

          {/* Project Stats */}
          <div className="flex gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>{allProjectComments.length} total comments</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{project.teamSize} team members</span>
            </div>
          </div>
        </div>

        {/* Comment Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">Filter by Timespan</label>
              <Select value={filterType} onValueChange={(value) => setFilterType(value as FilterType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filterType === "custom" && (
              <>
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">Start Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">End Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredComments.length}</span> of{" "}
              <span className="font-semibold text-foreground">{allProjectComments.length}</span> comments
            </div>
          </div>
        </Card>

        {/* Comments Timeline */}
        <div className="space-y-6">
          {sortedDates.length > 0 ? (
            sortedDates.map((date) => {
              const comments = commentsByDate[date]
              const formattedDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })

              return (
                <div key={date}>
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold text-foreground">{formattedDate}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {comments.length} {comments.length === 1 ? "comment" : "comments"}
                    </Badge>
                  </div>

                  <div className="space-y-3 ml-7">
                    {comments
                      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                      .map((comment) => {
                        const employee = mockEmployees.find((e) => e.name === comment.author)
                        return (
                          <Card key={comment.id} className="p-4 hover:border-primary/50 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-semibold text-primary">
                                  {comment.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-foreground">{comment.author}</span>
                                  {employee && (
                                    <>
                                      <span className="text-muted-foreground">•</span>
                                      <span className="text-sm text-muted-foreground">{employee.role}</span>
                                    </>
                                  )}
                                  <span className="text-muted-foreground">•</span>
                                  <span className="text-sm text-muted-foreground">
                                    {new Date(comment.timestamp).toLocaleTimeString("en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </div>
                                <p className="text-foreground">{comment.text}</p>
                              </div>
                            </div>
                          </Card>
                        )
                      })}
                  </div>
                </div>
              )
            })
          ) : (
            <Card className="p-12">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No comments found</h3>
                <p className="text-muted-foreground">
                  {filterType === "all"
                    ? "No comments have been added to this project yet."
                    : "No comments found for the selected timespan. Try adjusting your filters."}
                </p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
