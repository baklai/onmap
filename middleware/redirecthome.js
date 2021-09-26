export default function ({ $auth, app }) {
  console.log(app);
  if ($auth.loggedIn) {
    return 'apps';
    // return redirect('/app');
  }
}
