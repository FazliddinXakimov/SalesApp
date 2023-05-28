export default function ({ $auth, redirect, route, next, ...rest }) {
  if (!$auth.loggedIn) {
    return redirect({ path: '/' })
  } else if ($auth.loggedIn) {
    return next()
  }
}
