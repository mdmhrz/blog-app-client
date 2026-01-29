import React from 'react';
import { Calendar, Eye, User, Tag, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { blogService } from '@/services/blog.service';
import { BlogPost } from '@/types';

export interface BlogComment {
    id: string;
    content: string;
    authorId: string;
    createdAt: string;
};

export interface BlogDetails {
    id: string;
    title: string;
    content: string;
    thumbnail?: string | null;
    ifFeatured: boolean;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    tags: string[];
    views: number;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    comments: BlogComment[];
    _count: {
        comments: number;
    };
};

export interface BlogDetailsResponse {
    data: BlogDetails;
};

// Generate static params
export async function generateStaticParams() {
    try {
        const { data } = await blogService.getBlogPosts();
        if (!data?.data) return []; // fallback
        return data.data.map((post: BlogPost) => ({ id: post.id })).splice(0, 3);
    } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        return [];
    }
}
// to control dynamic pages turn of on SSG
// export const dynamicParams = false;


const BlogDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const response = await blogService.getBlogById(id);

    if (!response.data) {
        // Handle error
        return <div>Error: {response.error?.message}</div>;
    }

    const data = response.data;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        return status === 'PUBLISHED' ? 'default' : 'secondary';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="border-0 shadow-lg">
                <CardHeader className="space-y-6">
                    {/* Status and Featured Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={getStatusColor(data.status)} className="uppercase">
                            {data.status}
                        </Badge>
                        {data.ifFeatured && (
                            <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                                Featured
                            </Badge>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        {data.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="font-medium">Author ID: {data.authorId.slice(0, 8)}...</span>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(data.createdAt)}</span>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>{data.views} views</span>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            <span>{data._count.comments} comments</span>
                        </div>
                    </div>

                    {/* Tags */}
                    {data.tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                            <Tag className="w-4 h-4 text-muted-foreground" />
                            {data.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="font-normal">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* Thumbnail */}
                    {data.thumbnail && (
                        <div className="rounded-lg overflow-hidden border">
                            <img
                                src={data.thumbnail}
                                alt={data.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-foreground whitespace-pre-wrap">
                            {data.content}
                        </p>
                    </div>

                    <Separator className="my-8" />

                    {/* Updated Date */}
                    <div className="text-sm text-muted-foreground">
                        Last updated: {formatDate(data.updatedAt)}
                    </div>

                    {/* Comments Section */}
                    {data.comments.length > 0 && (
                        <div className="space-y-4 mt-8">
                            <h2 className="text-md font-semibold text-foreground">
                                Comments ({data?._count?.comments})
                            </h2>
                            <div className="space-y-4">
                                {data.comments.map((comment) => (
                                    <Card key={comment.id} className="border">
                                        <CardContent className="">
                                            <div className="flex gap-4">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback className="bg-primary/10 text-primary">
                                                        {comment.authorId.slice(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-sm text-foreground">
                                                            User {comment.authorId.slice(0, 8)}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {formatDate(comment.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-foreground">{comment.content}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default BlogDetailsPage;