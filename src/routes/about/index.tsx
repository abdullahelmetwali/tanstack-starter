import { createFileRoute } from '@tanstack/react-router'
import Intro from './_components/intro';

export const Route = createFileRoute('/about/')({
  component: About,
})

function About() {
  return (
    <main>
      <Intro />
    </main>
  )
}
