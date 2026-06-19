export interface MockUser {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  avatar?: string
  createdAt: string
}

export const mockUsers: MockUser[] = [
  {
    id: 1,
    firstName: 'Aynur',
    lastName: 'Həsənova',
    email: 'aynur@mail.com',
    password: '123456',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    firstName: 'Tural',
    lastName: 'Məmmədov',
    email: 'tural@mail.com',
    password: '123456',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
]
