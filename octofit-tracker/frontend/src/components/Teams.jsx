import { useEffect, useState } from 'react'
import { fetchCollection } from '../apiClient.js'
import { ApiNotice, LoadingState } from './ApiFeedback.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : null

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => { fetchCollection('teams', teamsEndpoint).then(setTeams).catch(setError) }, [])

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Find your people</p><h1>Teams</h1><p>Small groups, shared goals, real accountability.</p></div>
      <ApiNotice error={error} />
      {!error && !teams.length ? <LoadingState /> : null}
      <div className="row g-3">{teams.map((team) => <article className="col-12 col-md-6" key={team._id || team.id}><div className="data-card h-100"><div className="card-kicker">Team</div><h2>{team.name}</h2><p>{team.members?.length || 0} members</p><div className="member-list">{team.members?.slice(0, 4).map((member) => <span key={member._id || member.id}>{member.username || member.email}</span>)}</div></div></article>)}</div>
    </section>
  )
}

export default Teams
