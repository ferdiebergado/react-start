export default function ErrorBoundary() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <h1 className="text-muted-foreground text-6xl">
                Something went wrong. Try again later.
            </h1>
        </div>
    )
}
