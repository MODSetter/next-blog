"use client"
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { onLogin }  from "@/actions/auth.actions"
import { loginSchema } from "@/zodschemas/loginschema";



export default function Login() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const res = await onLogin(values)
    // At Failed Login
    if(res?.error){
      toast({
        variant: "destructive",
        description: res.error,
      });
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your admin credentials
            </p>
          </div>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="admin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="*******" {...field} type="password"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}