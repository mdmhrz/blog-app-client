import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";


const API_URL = env.API_URL

export default function CreateBlogFormServer() {

    const crerateBlog = async (formData: FormData) => {
        "use server"
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const tags = formData.get("tags") as string;

        const blogData = {
            title,
            content,
            tags: tags.split(",").map(item => item.trim()).filter(item => item !== "")
        }

        const cookieStore = await cookies()

        const res = await fetch(`${API_URL}/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString()
            },
            body: JSON.stringify(blogData)
        })

        if (res.status === 201) {
            redirect("/dashboard?success=blog-created")
        } else {
            redirect("/dashboard?error=blog-creation-failed")
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Create Blog</CardTitle>
                    <CardDescription>You can write your blog here</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="create-blog-form" action={crerateBlog}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Blog Title</FieldLabel>
                                <Input
                                    id="title"
                                    placeholder="Blog Title"
                                    type="text"
                                    name="title"
                                    required
                                />

                            </Field>
                            <Field>
                                <FieldLabel>Content</FieldLabel>
                                <Textarea
                                    id="content"
                                    placeholder="Blog Content"
                                    name="content"
                                    required
                                />

                            </Field>
                            <Field>
                                <FieldLabel>Blog Title</FieldLabel>
                                <Input
                                    id="tags"
                                    placeholder="Tags"
                                    type="text" name="tags"
                                    required
                                />

                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button form="create-blog-form" type="submit" className="w-full">
                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
