import { useEffect, useState } from 'react'
import { fetchCollection } from '../apiClient.js'
import { ApiNotice, LoadingState } from './ApiFeedback.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : null

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => { fetchCollection('users', usersEndpoint).then(setUsers).catch(setError) }, [])

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Your community</p><h1>Users</h1><p>Meet the athletes making progress together.</p></div>
      <ApiNotice error={error} />
      {!error && !users.length ? <LoadingState /> : null}
      <div className="row g-3">{users.map((user) => <article className="col-12 col-md-6 col-xl-4" key={user._id || user.id}><div className="data-card h-100"><div className="avatar">{(user.profile?.displayName || user.username || '?').charAt(0).toUpperCase()}</div><h2>{user.profile?.displayName || user.username}</h2><p>{user.email}</p></div></article>)}</div>
    </section>
  )
}

export default Users
