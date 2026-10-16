import { Button } from '../components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/card'
import { Separator } from '../components/separator'
import RegisterForm from './register-form'

const Register = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center bg-slate-950 justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
        <Card className='z-1 w-full bg-purple-950 gap-6 py-12 sm:max-w-lg'>
        <CardHeader className='px-12'>
          <div>
            <CardTitle className='mb-2 text-2xl text-green-500 font-semibold'>Sign Up to STRYKE</CardTitle>
            <CardDescription className='text-base text-neutral-50'>Make Experience on Every Frame Hit</CardDescription>
          </div>
        </CardHeader>

        <CardContent className='px-12'>
          <div className='space-y-4'>
            <RegisterForm />

            <p className='text-neutral-50 text-muted-foreground text-center'>
              Already have an account?{' '}
              <a href='#' className='text-green-500 text-card-foreground hover:underline'>
                Sign in instead
              </a>
            </p>

            {/* <div className='flex items-center gap-4'>
              <Separator className='flex-1' />
              <p className='text-base'>or</p>
              <Separator className='flex-1' />
            </div>

            <Button variant='ghost' className='w-full' render={<a href='#' />} nativeButton={false}>
              Sign in with google
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
