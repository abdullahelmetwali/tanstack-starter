import axios from "axios";
import Cookies from "js-cookie"
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from '@tanstack/react-router';
import { Chrome, Facebook, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

// validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function AuthForm() {
  const navigate = useNavigate();
  const [social, setSocial] = useState<"google" | "facebook" | "">("");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitFnc = useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: any) => {
      const response = await axios.post(`${URL}/login`, {
        email: data.email,
        password: data.password,
      });

      if (response.status !== 200) throw new Error('Email or password is incorrect');

      const resolved = response.data?.data;
      const user = resolved?.user;

      Cookies.set('token', resolved?.token, {
        expires: 365,
        secure: true,
        sameSite: 'strict',
        path: "/"
      });

      return user;
    },
    onSuccess: () => {
      navigate({ to: '/profile' });
      toast({
        variant: "success",
        title: "Operation done!"
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Operation failed!"
      });
    },
  });

  const loginWithSocial = useMutation({
    mutationKey: ['social-login'],
    mutationFn: async () => {
      // your func here
    },
    onSuccess: () => {
      // toast({
      //     variant: "success",
      //     title: 'Operation done',
      // });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Operation failed',
        description: 'Email or password is incorrect , please try again'
      });
    }
  });

  const onSubmit = (data: LoginFormData) => {
    // Your submit logic here
    submitFnc.mutate(data);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-1 text-center!">
        <h1 className="text-2xl font-bold text-primary">Login to your account</h1>
        <p className="text-xs text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2 text-primary">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="a@example.com"
            className="border text-sm"
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
          />
        </div>
        <div className="grid gap-2 text-primary">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password here"
            className="border text-sm"
            aria-invalid={!!form.formState.errors.password}
            {...form.register("password")}
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitFnc.isPending}>
          {submitFnc.isPending ?
            <>
              <Loader className=" animate-spin" />
              Submitting
            </>
            :
            "Submit"
          }
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-muted-foreground h-px w-32 mt-1" />
        <p className="text-sm text-nowrap text-muted-foreground">
          Or continue with
        </p>
        <div className="bg-muted-foreground h-px w-32 mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant={"outline"}
          size={"sm"}
          disabled={loginWithSocial.isPending}
          onClick={() => {
            setSocial("google");
            loginWithSocial.mutate();
          }}
        >
          {(loginWithSocial.isPending && social === "google") ?
            <>
              <Loader className="animate-spin" />
              Submitting
            </>
            :
            <>
              <Chrome />
              Google
            </>
          }
        </Button>
        <Button
          type="button"
          variant={"outline"}
          size={"sm"}
          disabled={loginWithSocial.isPending}
          onClick={() => {
            setSocial("facebook");
            loginWithSocial.mutate();
          }}
        >
          {(loginWithSocial.isPending && social === "facebook") ?
            <>
              <Loader className="animate-spin" />
              Submitting
            </>
            :
            <>
              <Facebook />
              Facebook
            </>
          }
        </Button>
      </div>
    </form>
  )
}