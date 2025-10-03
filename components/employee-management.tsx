"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Mail } from "lucide-react"
import Link from "next/link"
import { mockEmployees } from "@/lib/mock-data"
import { AddEmployeeDialog } from "@/components/add-employee-dialog"

export function EmployeeManagement() {
  const [employees, setEmployees] = useState(mockEmployees)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleDeleteEmployee = (id: string) => {
    // This would delete from database in production
    console.log("[v0] Deleting employee:", id)
    setEmployees(employees.filter((e) => e.id !== id))
  }

  const handleAddEmployee = (employee: { name: string; email: string; role: string }) => {
    // This would save to database in production
    const newEmployee = {
      id: String(Date.now()),
      ...employee,
    }
    console.log("[v0] Adding employee:", newEmployee)
    setEmployees([...employees, newEmployee])
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
                <Link
                  href="/calendar"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Calendar
                </Link>
                <Link href="/employees" className="text-sm font-medium text-foreground border-b-2 border-primary pb-1">
                  Employees
                </Link>
              </nav>
            </div>
            <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Team Members</h2>
          <p className="text-muted-foreground">Manage your team members and their roles</p>
        </div>

        {/* Employee Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Employees</div>
            <div className="text-3xl font-semibold text-foreground">{employees.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Developers</div>
            <div className="text-3xl font-semibold text-foreground">
              {employees.filter((e) => e.role === "Developer").length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Other Roles</div>
            <div className="text-3xl font-semibold text-foreground">
              {employees.filter((e) => e.role !== "Developer").length}
            </div>
          </Card>
        </div>

        {/* Employee List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <Card key={employee.id} className="p-5 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{employee.name}</h3>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {employee.role}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Mail className="h-4 w-4" />
                <span className="truncate">{employee.email}</span>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View Activity
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteEmployee(employee.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {employees.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No employees added yet</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Employee
              </Button>
            </div>
          </Card>
        )}
      </main>

      <AddEmployeeDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddEmployee} />
    </div>
  )
}
