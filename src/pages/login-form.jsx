'use client'

import { useState } from 'react'
import { Button } from '../components/button.jsx'
import { Checkbox } from '../components/checkbox.jsx'
import { Input } from '../components/input.jsx'
import { Field, FieldLabel, FieldGroup } from '../components/field.jsx'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../components/input-group.jsx'
import { HugeiconsIcon } from '@hugeicons/react'
import { ViewOffSlashIcon, ViewIcon } from '@hugeicons/core-free-icons'

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FieldGroup className='gap-4'>
        <Field className='gap-2'>
          <FieldLabel htmlFor='userEmail' className='leading-5 text-green-500'>
            Email address
          </FieldLabel>
          <Input className="bg-neutral-50" type='email' id='userEmail' placeholder='Enter your email address' />
        </Field>
        <Field className='w-full gap-2'>
          <FieldLabel htmlFor='password' className='leading-5 text-green-500'>
            Password
          </FieldLabel>
          <InputGroup className="bg-neutral-50">
            <InputGroupInput id='password' type={isVisible ? 'text' : 'password'} placeholder='Enter your password' />
            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsVisible(prevState => !prevState)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                {isVisible ? (
                  <HugeiconsIcon icon={ViewOffSlashIcon} strokeWidth={2} />
                ) : (
                  <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
                )}
                <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        {/* Remember Me and Forgot Password */}
        {/* <div className='flex items-center justify-between gap-y-2'>
          <Field orientation='horizontal' className='flex items-center gap-2'>
            <Checkbox id='rememberMe' />
            <FieldLabel htmlFor='rememberMe' className='text-muted-foreground'>
              {' '}
              Remember Me
            </FieldLabel>
          </Field>
          <a href='#' className='text-base text-nowrap hover:underline'>
            Forgot Password?
          </a>
        </div> */}
        <Field>
          <Button className='w-full bg-green-500 text-zinc-950' type='submit'>
            Sign in to STRYKE
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default LoginForm
