interface PageProps {
    msg: string
}

export default function ErrorPage({ msg }: PageProps) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <h1 className="text-muted-foreground text-6xl">{msg}</h1>
        </div>
    )
}
