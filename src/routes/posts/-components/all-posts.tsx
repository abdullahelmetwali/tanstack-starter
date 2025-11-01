import { Link } from "@tanstack/react-router";

export function AllPosts() {
    return (
        <section className="grid place-items-center md:grid-cols-3 gap-3 h-full w-full p-4">
            {
                [...Array(9)].map((_, i) => (
                    <div key={i} className="size-full border rounded-md grid place-items-center">
                        <Link to={`/posts/$postID`} params={{ postID: `${i + 1}` }}>
                            Post ID {i + 1}
                        </Link>
                    </div>
                ))
            }
        </section>
    )
}