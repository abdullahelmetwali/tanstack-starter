export function NotFound() {
    document.title = "404 | Error!"
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center h-dvh w-dvw bg-background text-foreground">
            <div className="flex items-center">
                <p className="mr-5 pr-5 text-2xl border-r border-muted-foreground font-semibold h-14 flex items-center">
                    404
                </p>
                <p className="text-sm uppercase">
                    not found page
                </p>
            </div>
        </div>
    )
}