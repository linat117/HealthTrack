# Database Table Structure (MongoDB / Mongoose)

This file documents the current Mongoose schemas used by the backend. Keep this updated whenever models change to avoid assumptions across contributors.

## User
- name: String (required)
- email: String (required, unique)
- password: String (required, select: false)
- role: String (enum: ["admin","manager","expert","user"], default: "user")
- activity: [ObjectId ref "Post"] — posts the user interacted with
- health: [HealthSchema] — embedded health snapshots
- mustChangePassword: Boolean (default: false)
- createdBy: ObjectId ref "User"
- timestamps: createdAt, updatedAt

Embedded HealthSchema (in `User.health`)
- date: Date (default: now)
- water: Number (liters, default: 0)
- sleep: Number (hours, default: 0)
- exercise: Boolean (default: false)
- walked: Boolean (default: false)

## Manager
- name: String (required)
- email: String (required, unique)
- phone: String
- role: String (default: "manager")
- createdBy: ObjectId ref "User" (admin)
- timestamps: createdAt, updatedAt

## Category
- name: String (required, unique)
- createdBy: ObjectId ref "User"
- timestamps: createdAt, updatedAt

## Post (Advisory)
- title: String (required)
- content: String (required)
- category: ObjectId ref "Category"
- createdBy: ObjectId ref "User" (expert)
- reactions: [
  - user: ObjectId ref "User"
  - type: String (enum: ["like","love","haha","sad"], default: "like")
]
- comments: [
  - user: ObjectId ref "User"
  - comment: String
  - createdAt: Date (default: now)
]
- timestamps: createdAt, updatedAt

## HealthEntry
- user: ObjectId ref "User" (required)
- weight: Number (required)
- bloodPressure: String
- steps: Number
- notes: String
- timestamps: createdAt, updatedAt

## Notes / Gaps vs README
- Real-time comments via Socket.io are not present in the codebase yet.
- Search/filter endpoints not found; likely pending.
- Role-based routes, JWT auth, and CRUD scaffolding exist.


