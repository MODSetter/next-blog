"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  adminavatar: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  adminname: z.string(),
  adminusername: z.string(),
  adminpass: z.string(),
  confirmadminpass: z.string(),
})

export function UserSettings() {
  // ...
  const adminform = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adminavatar: "",
      adminname: "",
      adminusername: "",
      adminpass: "",
      confirmadminpass: "",
    },
  })

  function onAdminFormSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
    <Form {...adminform}>
      <form onSubmit={adminform.handleSubmit(onAdminFormSubmit)} className="space-y-8">
        <FormField
          control={adminform.control}
          name="adminavatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Avatar</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={adminform.control}
          name="adminname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={adminform.control}
          name="adminusername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={adminform.control}
          name="adminpass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={adminform.control}
          name="confirmadminpass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </>
  )
}

export default UserSettings;