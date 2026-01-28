import { CreateBlogFormClient } from "@/components/modules/create-blog/CreateBlogFormClient";
import CreateBlogFormServer from "@/components/modules/create-blog/CreateBlogFormServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function CreateBlogPage() {

    const { data } = await blogService.getBlogPosts();




    return (
        <div>
            <h1>CreateBlogPage</h1>

            {/* Server actoin from */}
            {/* <CreateBlogFormServer></CreateBlogFormServer> */}

            {/* Client action */}
            <CreateBlogFormClient></CreateBlogFormClient>
            {data.data.map((post: BlogPost) => <div key={post.id}>{post.title}</div>)}
        </div>
    );
}
