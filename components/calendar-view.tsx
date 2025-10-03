"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"
import { mockWorkLogs, mockEmployees, mockProjects } from "@/lib/mock-data"
import { AddWorkLogDialog } from "@/components/add-work-log-dialog"

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Get calendar days for current month
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getWorkLogsForDate = (dateStr: string) => {
    return mockWorkLogs.filter((log) => log.date === dateStr)
  }

  const days = []
  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-32 p-2 border border-border bg-muted/20" />)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(day)
    const workLogs = getWorkLogsForDate(dateStr)
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()

    days.push(
      <div
        key={day}
        className={`min-h-32 p-2 border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer ${
          isToday ? "ring-2 ring-primary" : ""
        }`}
        onClick={() => setSelectedDate(dateStr)}
      >
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${isToday ? "text-primary" : "text-foreground"}`}>{day}</span>
          {workLogs.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {workLogs.length}
            </Badge>
          )}
        </div>
        <div className="space-y-1">
          {workLogs.slice(0, 2).map((log) => {
            const employee = mockEmployees.find((e) => e.id === log.employeeId)
            const project = mockProjects.find((p) => p.id === log.projectId)
            return (
              <div key={log.id} className="text-xs p-1.5 bg-primary/10 rounded border border-primary/20">
                <div className="font-medium text-foreground truncate">{employee?.name}</div>
                <div className="text-muted-foreground truncate">{project?.name}</div>
              </div>
            )
          })}
          {workLogs.length > 2 && (
            <div className="text-xs text-muted-foreground pl-1.5">+{workLogs.length - 2} more</div>
          )}
        </div>
      </div>,
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
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </Link>
                <Link href="/calendar" className="text-sm font-medium text-foreground border-b-2 border-primary pb-1">
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
            <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Work Log
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {monthNames[month]} {year}
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mb-8">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-px mb-px">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground bg-muted">
                {day}
              </div>
            ))}
          </div>
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-px">{days}</div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Work Logs for{" "}
                {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDate(null)}>
                Close
              </Button>
            </div>

            <div className="space-y-4">
              {getWorkLogsForDate(selectedDate).map((log) => {
                const employee = mockEmployees.find((e) => e.id === log.employeeId)
                const project = mockProjects.find((p) => p.id === log.projectId)

                return (
                  <div key={log.id} className="border border-border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-foreground">{employee?.name}</div>
                        <div className="text-sm text-muted-foreground">{employee?.role}</div>
                      </div>
                      <Badge variant="outline">{project?.name}</Badge>
                    </div>

                    <div className="space-y-2">
                      {log.comments.map((comment) => (
                        <div key={comment.id} className="text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.timestamp).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-foreground">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              {getWorkLogsForDate(selectedDate).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No work logs for this date</div>
              )}
            </div>
          </Card>
        )}
      </main>

      <AddWorkLogDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  )
}
