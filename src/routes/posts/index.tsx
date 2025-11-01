import { createFileRoute } from '@tanstack/react-router'
import { AllPosts } from './-components/all-posts'

export const Route = createFileRoute('/posts/')({
  component: Posts,
  head: () => ({
    meta: [
      {
        title: "Posts | Tanstack Starter"
      },
      {
        name: 'description',
        content: 'My App is a web application',
      },
    ]
  })
})

function Posts() {
  return (
    <main className='min-h-[80dvh] grid place-items-center text-base'>
      <h1>
        Posts
      </h1>
      <AllPosts />
    </main>
  )
}
