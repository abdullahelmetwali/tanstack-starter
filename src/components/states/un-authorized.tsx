export function UnAuthorized() {
    document.title = "403 | Unauthorized"
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center h-dvh w-dvw bg-background text-foreground">
            <div className="flex items-center">
                <p className="mr-5 pr-5 text-xl border-r border-muted-foreground font-semibold h-14 flex items-center">
                    403
                </p>
                <p className="text-sm">
                    You don’t have permission to access this page.
                </p>
            </div>
        </div>
    );
}
