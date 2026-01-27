'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import SocialLogin from "./SocialLogin"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})


export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      // console.log("Submit Clicked", value)
      const toastId = toast.loading("Logging in...")
      try {
        const { data, error } = await authClient.signIn.email(value)

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        toast.success("User Logged In Successfully", { id: toastId })
      } catch (error) {
        toast.error("Something Went Wrong, Pleast try again", { id: toastId })
      }
    }
  })

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your information below to log into your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit()
          }}>
          <FieldGroup>

            {/* Email Field */}
            <form.Field name="email" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter Your Email"
                    aria-invalid={isInvalid}
                  ></Input>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }} />


            {/* Password Field */}
            <form.Field name="password" children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter Your Password"
                    aria-invalid={isInvalid}
                  ></Input>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }} />

          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2.5">
        <Button className="w-full" form="login-form" type="submit">Login</Button>
        <SocialLogin></SocialLogin>
        <FieldDescription className="text-center">
          Don&apos;t have an account? <Link href="/login">Sign up</Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  )
}
