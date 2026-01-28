import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { BlogPost } from '@/types';
const HistoryTable = ({ posts }: { posts: BlogPost[] }) => {
    console.log(posts, 'posts from table');

    return (
        <div className='border rounded-md'>
            <Table>
                {/* <TableCaption>Your create post table</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Title</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Comments</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium min-w-[300px]">{post.title}</TableCell>
                                <TableCell className="font-medium">{post.tags.join(', ')}</TableCell>
                                <TableCell>{post._count?.comments}</TableCell>
                                <TableCell>{post.views}</TableCell>
                                <TableCell className="text-right">{post.status}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default HistoryTable;