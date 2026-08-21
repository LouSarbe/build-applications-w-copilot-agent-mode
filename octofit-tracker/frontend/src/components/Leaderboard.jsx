import { useEffect, useState } from 'react'
import { fetchCollection } from '../apiClient.js'
import { ApiNotice, LoadingState } from './ApiFeedback.jsx'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : null

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => { fetchCollection('leaderboard', leaderboardEndpoint).then(setLeaders).catch(setError) }, [])

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p>Celebrate consistency, one activity at a time.</p></div>
      <ApiNotice error={error} />
      {!error && !leaders.length ? <LoadingState /> : null}
      <div className="table-responsive data-card p-0"><table className="table align-middle mb-0"><thead><tr><th>#</th><th>Athlete</th><th>Activities</th><th>Points</th></tr></thead><tbody>{leaders.map((leader, index) => <tr key={leader.userId || leader._id || index}><td className="rank">{index + 1}</td><td>{leader.username || 'Unknown athlete'}</td><td>{leader.activities || 0}</td><td><strong>{leader.points || 0}</strong></td></tr>)}</tbody></table></div>
    </section>
  )
}

export default Leaderboard
