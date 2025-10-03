export interface Comment {
  id: string
  author: string
  date: string
  text: string
  projectId: string
  timestamp: Date
}

export interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "not-started"
  commentCount: number
  teamSize: number
  recentComments: Comment[]
}

export interface Employee {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export interface WorkLog {
  id: string
  date: string
  employeeId: string
  projectId: string
  comments: Comment[]
}

export const mockEmployees: Employee[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@company.com", role: "Project Manager" },
  { id: "2", name: "Michael Chen", email: "michael@company.com", role: "Developer" },
  { id: "3", name: "Emma Wilson", email: "emma@company.com", role: "Designer" },
  { id: "4", name: "James Brown", email: "james@company.com", role: "Developer" },
]

export const mockComments: Comment[] = [
  {
    id: "c1",
    author: "Sarah Johnson",
    date: "2025-03-10",
    text: "Completed the initial wireframes and user flow diagrams",
    projectId: "p1",
    timestamp: new Date("2025-03-10T10:30:00"),
  },
  {
    id: "c2",
    author: "Michael Chen",
    date: "2025-03-10",
    text: "Set up the authentication system with JWT tokens",
    projectId: "p1",
    timestamp: new Date("2025-03-10T14:20:00"),
  },
  {
    id: "c3",
    author: "Emma Wilson",
    date: "2025-03-09",
    text: "Finalized the color palette and typography system",
    projectId: "p1",
    timestamp: new Date("2025-03-09T11:15:00"),
  },
  {
    id: "c4",
    author: "James Brown",
    date: "2025-03-08",
    text: "Implemented the dashboard API endpoints",
    projectId: "p2",
    timestamp: new Date("2025-03-08T16:45:00"),
  },
  {
    id: "c5",
    author: "Sarah Johnson",
    date: "2025-03-08",
    text: "Reviewed the project requirements with the client",
    projectId: "p2",
    timestamp: new Date("2025-03-08T09:30:00"),
  },
  {
    id: "c6",
    author: "Michael Chen",
    date: "2025-03-07",
    text: "Fixed critical bugs in the payment processing flow",
    projectId: "p1",
    timestamp: new Date("2025-03-07T15:00:00"),
  },
  {
    id: "c7",
    author: "Emma Wilson",
    date: "2025-03-06",
    text: "Created responsive layouts for mobile devices",
    projectId: "p1",
    timestamp: new Date("2025-03-06T13:45:00"),
  },
  {
    id: "c8",
    author: "James Brown",
    date: "2025-03-05",
    text: "Optimized database queries for better performance",
    projectId: "p1",
    timestamp: new Date("2025-03-05T10:20:00"),
  },
  {
    id: "c9",
    author: "Sarah Johnson",
    date: "2025-03-04",
    text: "Conducted user testing session with 5 participants",
    projectId: "p1",
    timestamp: new Date("2025-03-04T14:00:00"),
  },
  {
    id: "c10",
    author: "Michael Chen",
    date: "2025-03-03",
    text: "Integrated third-party analytics service",
    projectId: "p1",
    timestamp: new Date("2025-03-03T11:30:00"),
  },
  {
    id: "c11",
    author: "Emma Wilson",
    date: "2025-02-28",
    text: "Designed new onboarding flow screens",
    projectId: "p1",
    timestamp: new Date("2025-02-28T16:15:00"),
  },
  {
    id: "c12",
    author: "James Brown",
    date: "2025-02-27",
    text: "Implemented real-time notifications feature",
    projectId: "p1",
    timestamp: new Date("2025-02-27T09:45:00"),
  },
]

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "E-Commerce Platform Redesign",
    description: "Complete overhaul of the existing e-commerce platform with modern UI/UX and improved performance",
    status: "active",
    commentCount: 24,
    teamSize: 5,
    recentComments: mockComments.filter((c) => c.projectId === "p1").slice(0, 3),
  },
  {
    id: "p2",
    name: "Mobile App Development",
    description: "Native iOS and Android app for customer engagement and loyalty program",
    status: "active",
    commentCount: 18,
    teamSize: 4,
    recentComments: mockComments.filter((c) => c.projectId === "p2"),
  },
  {
    id: "p3",
    name: "Analytics Dashboard",
    description: "Real-time analytics dashboard for tracking key business metrics and KPIs",
    status: "not-started",
    commentCount: 3,
    teamSize: 3,
    recentComments: [],
  },
  {
    id: "p4",
    name: "Customer Portal",
    description: "Self-service portal for customers to manage their accounts and subscriptions",
    status: "completed",
    commentCount: 45,
    teamSize: 6,
    recentComments: [
      {
        id: "c13",
        author: "Michael Chen",
        date: "2025-02-28",
        text: "Final deployment completed successfully",
        projectId: "p4",
        timestamp: new Date("2025-02-28T17:00:00"),
      },
    ],
  },
  {
    id: "p5",
    name: "API Integration",
    description: "Integration with third-party payment and shipping APIs",
    status: "active",
    commentCount: 12,
    teamSize: 2,
    recentComments: [],
  },
  {
    id: "p6",
    name: "Marketing Website",
    description: "New marketing website with SEO optimization and content management system",
    status: "not-started",
    commentCount: 0,
    teamSize: 4,
    recentComments: [],
  },
]

export const mockWorkLogs: WorkLog[] = [
  {
    id: "w1",
    date: "2025-03-10",
    employeeId: "1",
    projectId: "p1",
    comments: [mockComments[0]],
  },
  {
    id: "w2",
    date: "2025-03-10",
    employeeId: "2",
    projectId: "p1",
    comments: [mockComments[1]],
  },
  {
    id: "w3",
    date: "2025-03-09",
    employeeId: "3",
    projectId: "p1",
    comments: [mockComments[2]],
  },
]
