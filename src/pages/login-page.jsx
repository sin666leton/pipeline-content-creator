import { Button } from '../components/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/card.jsx'
import { Separator } from '../components/separator.jsx'
import LoginForm from './login-form.jsx'


const Login = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center bg-slate-950 overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <Card className='z-1 w-full bg-purple-950 gap-6 py-12 px-6 sm:max-w-lg'>
        <CardHeader className='px-6'>
          <div>
            <CardTitle className='mb-2 text-green-500 text-2xl font-semibold'>Login to STRYKE</CardTitle>
            <CardDescription className='text-neutral-50 text-base'>Make Experience on Every Frame Hit</CardDescription>
          </div>
        </CardHeader>

        <CardContent className='px-6'>
          {/* <p className='text-muted-foreground mb-6 text-base'>
            Login with{' '}
            <a href='#' className='text-card-foreground hover:underline'>
              Magic Link
            </a>
          </p> */}

          {/* <div className='mb-6 flex flex-wrap gap-4 sm:gap-6'>
            <Button variant='outline' className='grow'>
              Login as User
            </Button>
            <Button variant='outline' className='grow'>
              Login as Admin
            </Button>
          </div> */}

          <div className='space-y-4'>
            <LoginForm />

            <p className='text-neutral-50 text-muted-foreground text-center text-base'>
              Or maybe {' '}
              <a href='#' className='text-green-500 text-card-foreground hover:underline'>
                Create an account ?
              </a>
            </p>

            {/* <div className='flex items-center gap-4'>
              <Separator className='flex-1' />
              <p className='text-base'>or</p>
              <Separator className='flex-1' />
            </div> */}

            {/* <Button variant='ghost' className='w-full' render={<a href='#' />} nativeButton={false}>
              Sign in with google
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
