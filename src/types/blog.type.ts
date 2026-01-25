export interface BlogPost {
  id: string
  title: string
  content: string
  thumbnail: string | null
  ifFeatured: boolean
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  tags: string[]
  views: number
  authorId: string
  createdAt: string
  updatedAt: string
  _count: {
    comments: number
  }
}