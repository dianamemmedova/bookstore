import { useState } from 'react'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt: string
  
}

const STORAGE_KEY = 'app_users'

function loadUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>(loadUsers)

  const addUser = (data: Omit<User, 'id' | 'createdAt'>): User => {
    const newUser: User = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    const updated = [...users, newUser]
    setUsers(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return newUser
  }

  const emailExists = (email: string) =>
    users.some(u => u.email.toLowerCase() === email.toLowerCase())

  return { users, addUser, emailExists }
}