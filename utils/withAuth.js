import Router from 'next/router'
import cookies from 'next-cookies'

export const withAuth = (ctx) => {
  const { accessToken } = cookies(ctx)

  if (ctx && !accessToken) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return false
  }

  if (!accessToken) {
    Router.push('/login')
  }

  return accessToken
}
