import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
  head: () => ({
    meta: [
      {
        title: "Home | Tanstack Starter"
      },
      {
        name: 'description',
        content: 'My App is a web application',
      },
    ]
  })
})

function App() {
  return (
    <main className='min-h-[80dvh] grid place-items-center text-base'>
      Home
    </main>
  )
}
