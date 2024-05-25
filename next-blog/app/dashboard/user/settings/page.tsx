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
import ImageUploadForm from "@/components/image-upload/ImageUploadForm"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  adminname: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  adminusername: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  adminpass: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
  confirmadminpass: z.string(),
}).refine(
  (values) => {
    return values.adminpass === values.confirmadminpass;
  },
  {
    message: "Passwords must match!",
    path: ["confirmadminpass"],
  }
);

export function UserSettings() {
  const { toast } = useToast();
  const router = useRouter();


  const [adminavatar, setAdminavatar] = useState<string | null>(null)
  const [adminname, setAdminname] = useState<string>("")
  const [adminusername, setAdminusername] = useState<string>("")

  
  const adminform = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      adminname: adminname,
      adminusername: adminusername,
      adminpass: "",
      confirmadminpass: "",
    },
  })

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/`)
      .then(response => response.json())
      .then(data => {
        setAdminavatar(data.avatar);
        setAdminname(data.name);
        setAdminusername(data.username)
      })
  }, []);

  async function onAdminFormSubmit(values: z.infer<typeof formSchema>) {
    const reqdata = {
      adminname: values.adminname,
      avatar: adminavatar,
      adminusername: values.adminusername,
      adminpass: values.adminpass
    };
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqdata),
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, requestOptions);

    const res = await response.json();
    console.log(res)
    if (res) {
      toast({
        variant: "default",
        description: `Account Settings Updated`,
        className: "bg-green-400/20 backdrop-blur-lg"
      });
      router.push("/dashboard/user/settings")
    } else{
      toast({
        variant: "destructive",
        description: `Something Went Wrong`,
        className: "bg-green-400/20 backdrop-blur-lg"
      });
    }
    
  }

  return (
    <>
      <Form {...adminform}>
        <form onSubmit={adminform.handleSubmit(onAdminFormSubmit)} className="space-y-8">
          <div>
            <p className="my-3 text-sm">Admin Avatar:</p>
            <ImageUploadForm opengraphurl={adminavatar} setOpengraphurl={setAdminavatar} />
          </div>

          <FormField
            control={adminform.control}
            name="adminname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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
                  <Input type="password" placeholder="*****" {...field} />
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
                  <Input type="password" placeholder="*****" {...field} />
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