import { createFileRoute } from '@tanstack/react-router'
import { Airplay } from 'lucide-react'
import { AuthForm } from './-components/form'

export const Route = createFileRoute('/login/')({
  component: LogIn,
  beforeLoad: () => {
    // your auth action here
  },
  head: () => ({
    meta: [
      {
        title: "Log In | Tanstack Starter"
      },
      {
        name: 'description',
        content: 'My App is a web application',
      },
    ]
  })
});

function LogIn() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium text-primary ">
            <div className="bg-primary flex size-6 items-center justify-center rounded-md">
              <Airplay className="size-4 text-primary-foreground" />
            </div>
            Tanstack Starter
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthForm />
          </div>
        </div>
      </div>
      <div className="bg-secondary-foreground relative hidden lg:grid place-items-center">
        <img
          src={"/images/tanstack-circle-logo.png"}
          width={600}
          height={600}
          alt="auth-image"
          className=" object-cover size-40"
        />
      </div>
    </div>
  )
}
