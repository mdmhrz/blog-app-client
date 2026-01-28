"use client"

import { createBlogPost } from "@/actions/blog.action"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { env } from "@/env"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

const API_URL = env.NEXT_PUBLIC_BACKEND_BASE_URL

// ----------------------
// Zod Schema
// ----------------------
const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(20, "Content must be at least 20 characters"),
    tags: z.string().min(1, "Please add at least one tag"),
})

export function CreateBlogFormClient() {

    const form = useForm({
        defaultValues: {
            title: "",
            content: "",
            tags: "",
        },
        validators: {
            onSubmit: formSchema,
        },

        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating blog...")

            try {
                const blogData = {
                    title: value.title,
                    content: value.content,
                    tags: value.tags
                        .split(",")
                        .map(tag => tag.trim())
                        .filter(Boolean),
                }


                const res = await createBlogPost(blogData);
                console.log(res);

                if (res.error) {
                    toast.error("Post creation failed. Please try again.")
                }

                toast.success("Blog created successfully 🎉", { id: toastId })
                form.reset()
            } catch (error) {
                toast.error("Something went wrong. Please try again.", {
                    id: toastId,
                })
            }
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Blog</CardTitle>
                <CardDescription>
                    You can write and publish your blog here
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="create-blog-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        {/* Title */}
                        <form.Field name="title">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Blog Title
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                            placeholder="Enter blog title"
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        </form.Field>

                        {/* Content */}
                        <form.Field name="content">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Content
                                        </FieldLabel>
                                        <Textarea
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                            placeholder="Write your blog content..."
                                            rows={6}
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        </form.Field>

                        {/* Tags */}
                        <form.Field name="tags">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Tags
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(e.target.value)
                                            }
                                            placeholder="react, nextjs, tailwind"
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        </form.Field>
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Button
                    className="w-full"
                    form="create-blog-form"
                    type="submit"
                >
                    Submit
                </Button>
            </CardFooter>
        </Card>
    )
}
