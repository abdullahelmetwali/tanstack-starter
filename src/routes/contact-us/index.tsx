import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact-us/')({
  component: ContactUs,
})

function ContactUs() {
  return <div>Hello "/contact-us/"!</div>
}
