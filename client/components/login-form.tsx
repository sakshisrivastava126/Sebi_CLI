"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { GithubIcon } from "lucide-react";
import { useState } from "react";

export const LoginForm = ()=>{
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);


    return (
        <div className="flex flex-col gap-6 justify-center items-center ">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Image src={"/login.png"} alt="Login" height={500} width={500}/>
        <h1 className="text-6xl font-extrabold text-indigo-400">Welcome Back! to Sebi Cli</h1>
        <p className="text-base font-medium text-zinc-400">Login to your account for allowing device flow</p>
      </div>
      <Card className="border-dashed border-2">
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant={"outline"}
                className="w-full h-full"
                type="button"
                disabled={isLoading}
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    const params = new URLSearchParams(window.location.search);
                    const userCode = params.get("user_code");
                    // const userCode = new URLSearchParams(window.location.search).get("user_code") || 
                    //                 new URLSearchParams(window.location.search).get("callbackURL")?.split("user_code=")[1];
                    const { data, error } = await authClient.signIn.social({
                      provider: "github",
                      callbackURL: userCode 
                        ? `https://sebi-cli.vercel.app/approve?user_code=${userCode}`
                        : "https://sebi-cli.vercel.app"
                      // callbackURL: userCode
                      // ? `http://localhost:8080/approve?user_code=${userCode}`
                      // : "http://localhost:8080"
                    });
                    
                    if (error) {
                      toast.error(error.message || "Failed to login with GitHub");
                    }
                  } catch (err) {
                    toast.error("An unexpected error occurred during login");
                    console.error(err);
                  } finally {
                    setIsLoading(false);
                  }
                }}
               
              >
                <Image src={"/github.svg"} alt="Github" height={16} width={16} className="size-4 dark:invert" />
                Continue With GitHub
              </Button>

            </div>

          </div>

        </CardContent>
      </Card>
    </div>
    )
}