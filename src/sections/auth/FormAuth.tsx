/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {loginForm} from '@/actions/loginForm'
import {useTransition} from 'react'
import {logoutForm} from '@/actions/logoutForm'
import RevalidatePath from '@/actions/revalidatePath'
import {toast} from 'sonner'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export function FormAuth({session}: any) {
  console.log('🚀 ~ FormAuth ~ session:', session)
  const [isPending, setTransition] = useTransition()
  console.log('🚀 ~ FormAuth ~ isPending:', isPending)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'trinhvanduc07@gmail.com',
      password: 'Duc12345',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('🚀 ~ onSubmit ~ values:', values)
    handleSignIn(values)
  }

  function handleSignIn(values: z.infer<typeof formSchema>) {
    setTransition(() => {
      loginForm({
        username: values.email,
        password: values.password,
        redirectTo: '/',
      }).then((res) => {
        RevalidatePath('/')
        toast.success('Login successfully')
        console.log('🚀 ~ setTransition ~ res:', res)
      })
    })
  }

  function handleSignOut() {
    setTransition(() => {
      logoutForm().then((res) => {
        console.log('🚀 ~ setTransition ~ res:', res)
        toast.error('Logout successfully')
      })
    })
  }

  return (
    <Tabs
      defaultValue='account'
      className='w-[400px]'
    >
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-2'
            >
              <CardContent>
                <FormField
                  control={form.control}
                  name='email'
                  render={(field) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={(field) => (
                    <FormItem className='space-y-1'>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className='flex justify-between space-x-[2rem]'>
                <Button
                  className='flex-1'
                  type='button'
                  disabled={!session?.accessToken}
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
                <Button
                  className='flex-1'
                  type='submit'
                >
                  Login
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </TabsContent>
      <TabsContent value='password'>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <Label htmlFor='current'>Current password</Label>
              <Input
                id='current'
                type='password'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='new'>New password</Label>
              <Input
                id='new'
                type='password'
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
