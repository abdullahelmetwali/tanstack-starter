import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
  component: About,
  head: () => ({
    meta: [
      {
        title: "About | Tanstack Starter"
      },
      {
        name: 'description',
        content: 'My App is a web application',
      },
    ]
  })
})

function About() {
  return (
    <main className='min-h-[80dvh] grid place-items-center text-base'>
      About
    </main>
  )
}
