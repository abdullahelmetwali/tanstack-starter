import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/')({
  component: Profile,
  beforeLoad: () => {
    // your auth action here
  },
  head: () => ({
    meta: [
      {
        title: "Profile | Tanstack Starter"
      },
      {
        name: 'description',
        content: 'My App is a web application',
      },
    ]
  })
})

function Profile() {
  return (
    <main className='min-h-[80dvh] grid place-items-center text-base'>
      Profile
    </main>
  )
}
