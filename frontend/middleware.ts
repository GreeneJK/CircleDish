import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value)
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  const protectedRoutes = ['/dashboard', '/circles', '/recipes']
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Dynamic protected routes
  const dynamicProtectedRoutes = ['/circles/', '/recipes/']
  const isDynamicProtectedRoute = dynamicProtectedRoutes.some(route => 
    req.nextUrl.pathname.includes(route)
  )

  // Auth routes (redirect if authenticated)
  const authRoutes = ['/login', '/signup', '/forgot-password']
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname)

  // Update password route (special case)
  const isUpdatePasswordRoute = req.nextUrl.pathname === '/update-password'

  // If user is not authenticated and trying to access protected route
  if (!session && (isProtectedRoute || isDynamicProtectedRoute)) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is authenticated and trying to access auth routes
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Allow access to update-password route (for password reset flow)
  if (isUpdatePasswordRoute) {
    return res
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
