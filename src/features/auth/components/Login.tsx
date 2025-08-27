import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

const ForgotPasswordBlock = memo(() => (
    <Link
        to="/forgot-password"
        className="ml-auto inline-block text-sm underline"
    >
        Forgot your password?
    </Link>
))

const SignUpBlock = memo(() => (
    <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="underline">
            Sign up
        </Link>
    </div>
))

const formSchema = z
    .object({
        email: z.email(),
        password: z.string(),
    })
    .required({
        email: true,
        password: true,
    })

export default function LoginPreview() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: standardSchemaResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values)
            toast.success(JSON.stringify(values, null, 2))
        } catch (error) {
            console.error('Form submission error', error)
            toast.error('Failed to submit the form. Please try again.')
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email and password to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel htmlFor="email">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="email"
                                                placeholder="johndoe@mail.com"
                                                type="email"
                                                autoComplete="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <FormLabel htmlFor="password">
                                                Password
                                            </FormLabel>
                                            <ForgotPasswordBlock />
                                        </div>
                                        <FormControl>
                                            <PasswordInput
                                                id="password"
                                                placeholder="******"
                                                autoComplete="current-password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </div>
                    </form>
                </Form>
                <SignUpBlock />
            </CardContent>
        </Card>
    )
}
