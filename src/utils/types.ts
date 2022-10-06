import { Request } from 'express';

export interface User {
  id?: number
  name: string
  email: string
  password: string
  avatar?: string
  created_at?: string
  updated_at?: string
}

interface UserInputProps {
  name: string
  email: string
  password: string
  oldPassword?: string
}

interface params {
  id: number
}

export interface UserBodyRequest extends Request {
  body: UserInputProps
  user: params
}

export interface MovieNotes {
  id: number
  title: string
  description: string
  rating: number
  created_at?: string
  updated_at?: string
}

interface MovieNotesInput {
  title: string
  description: string
  rating: number
  id?: number
  tags: []
}

export interface NotesRequest extends Request {
  body: MovieNotesInput
}

export interface Tags {
  id: number
  name: string
  note_id: number
  user_id: number
}


interface TSessions {
  email: string
  password: string
}

export interface SessionsRequest extends Request {
  body: TSessions
}