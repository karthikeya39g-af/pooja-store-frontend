import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { Field } from '../components/ui/common'
import { PageHeader } from '../components/ui/PageHeader'
import { BackendUnavailableError } from '../services/client'
import * as auth from '../services/auth'

type Mode = 'login' | 'register' | 'forgot'
const email = z.string().email('Enter a valid email address')
const schemas = {
  login: z.object({ email, password: z.string().min(1, 'Enter your password') }),
  register: z.object({ name: z.string().min(2, 'Enter your name'), email, phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'), password: z.string().min(8, 'Use at least 8 characters') }),
  forgot: z.object({ email }),
}
const titles = { login: 'Sign In', register: 'Create Account', forgot: 'Forgot Password' }

export default function Auth({ mode }: { mode: Mode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<any>({ resolver: zodResolver(schemas[mode] as never), mode: 'onTouched' })
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const submit = async (v: Record<string, string>) => {
    setMsg(null)
    try {
      if (mode === 'login') await auth.login({ email: v.email, password: v.password })
      if (mode === 'register') await auth.register({ name: v.name, email: v.email, phone: v.phone, password: v.password })
      if (mode === 'forgot') await auth.forgotPassword({ email: v.email })
      setMsg({ ok: true, text: mode === 'forgot' ? 'If that email is registered, a reset link has been sent.' : 'Success! Redirecting…' })
      if (mode !== 'forgot') setTimeout(() => (window.location.href = '/account'), 800)
    } catch (e) {
      setMsg({ ok: false, text: e instanceof BackendUnavailableError ? 'Accounts are not available yet — the store server is not connected.' : (e as Error).message || 'Something went wrong.' })
    }
  }
  const f = (name: string, label: string, type = 'text', ac?: string) => (
    <Field label={label} error={errors[name]?.message as string}><input type={type} autoComplete={ac} className={`input ${errors[name] ? 'input-error' : ''}`} {...register(name)} /></Field>
  )
  return (
    <>
      <PageHeader title={titles[mode]} crumbs={[{ label: titles[mode] }]} />
      <div className="container-x py-10">
        <form noValidate onSubmit={handleSubmit(submit)} className="card mx-auto max-w-md space-y-4 p-6 sm:p-8">
          {mode === 'register' && f('name', 'Full name', 'text', 'name')}
          {f('email', 'Email', 'email', 'email')}
          {mode === 'register' && f('phone', 'Mobile number', 'tel', 'tel-national')}
          {mode !== 'forgot' && f('password', 'Password', 'password', mode === 'login' ? 'current-password' : 'new-password')}
          {msg && <p role="alert" className={`rounded-lg p-3 text-sm font-medium ${msg.ok ? 'bg-leaf-50 text-leaf-700' : 'bg-maroon-50 text-maroon-700'}`}>{msg.text}</p>}
          <button disabled={isSubmitting} className="btn btn-primary w-full">{isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}{titles[mode]}</button>
          <div className="flex flex-wrap justify-between gap-2 text-sm font-semibold text-maroon-500">
            {mode === 'login' && <><Link to="/register" className="underline">Create account</Link><Link to="/forgot-password" className="underline">Forgot password?</Link></>}
            {mode !== 'login' && <Link to="/login" className="underline">Back to sign in</Link>}
          </div>
        </form>
      </div>
    </>
  )
}
