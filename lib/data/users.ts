export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
}

export const users: User[] = [
  {
    id: "user-1",
    name: "Jason Duong",
    email: "jason.duong@mail.com",
    avatar: "/avatar-profile.jpg",
    role: "Product Designer"
  },
  {
    id: "user-2",
    name: "Harrold Peterson",
    email: "harrold.p@mail.com",
    role: "Senior Developer"
  },
  {
    id: "user-3",
    name: "James Boarnd",
    email: "james.b@mail.com",
    role: "Project Manager"
  },
  {
    id: "user-4",
    name: "Mitch Sato",
    email: "mitch.s@mail.com",
    role: "UX Designer"
  },
  {
    id: "user-5",
    name: "Sarah Chen",
    email: "sarah.c@mail.com",
    role: "Backend Developer"
  },
  {
    id: "user-6",
    name: "Mike Wilson",
    email: "mike.w@mail.com",
    role: "Frontend Developer"
  },
  {
    id: "user-7",
    name: "Emily Davis",
    email: "emily.d@mail.com",
    role: "QA Engineer"
  },
  {
    id: "user-8",
    name: "Alex Morgan",
    email: "alex.m@mail.com",
    role: "DevOps Engineer"
  },
]

export const teams = [
  { id: "team-1", name: "Engineering Team", memberCount: 12 },
  { id: "team-2", name: "Design Team", memberCount: 5 },
  { id: "team-3", name: "Product Team", memberCount: 8 },
  { id: "team-4", name: "Marketing Team", memberCount: 6 },
]
