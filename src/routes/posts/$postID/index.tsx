import { Loader } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router'
import { useGet } from '@/hooks/use-get';

export const Route = createFileRoute('/posts/$postID/')({
  component: PostDetails,
  head: ({ params }) => ({
    meta: [
      {
        title: `Post ${params.postID} | Tanstack Starter`
      },
      {
        name: 'description',
        content: 'My App is a web application',
      },
    ]
  })
})

function PostDetails() {
  const { postID } = Route.useParams();
  const { data, isLoading, error } = useGet({
    url: `/posts/${postID}`,
    cacheKey: postID
  });

  if (isLoading) {
    return (
      <div className='min-h-[80dvh] grid place-items-center'>
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-[80dvh] grid place-items-center text-destructive'>
        Error: {error.message}
      </div>
    );
  }

  return (
    <main className='min-h-[80dvh] grid place-items-center text-base'>
      <div>
        <h1>Post ID: {postID}</h1>
      </div>
    </main>
  );
}