import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye, MessageSquare, ImageIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { BlogPost } from "@/types"
import Link from "next/link"




export function BlogCard({ post }: { post: BlogPost }) {


  return (
    <Link href={`/blog/${post.id}`} className="no-underline">
      <Card
        className="group overflow-hidden transition-all hover:shadow-lg cursor-pointer"

      >
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant={post.status === "PUBLISHED" ? "default" : "secondary"}
              className="font-medium"
            >
              {post.status}
            </Badge>
          </div>

          {/* Featured Badge */}
          {post.ifFeatured && (
            <div className="absolute top-3 right-3">
              <Badge variant="destructive" className="font-medium">
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <CardHeader>
          <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 mt-2">
            {post.content}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {/* Views */}
            <div className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              <span>{post.views}</span>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              <span>{post._count.comments}</span>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}