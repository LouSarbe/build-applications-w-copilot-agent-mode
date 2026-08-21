import { useEffect, useState } from 'react'
import { fetchCollection } from '../apiClient.js'
import { ApiNotice, LoadingState } from './ApiFeedback.jsx'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : null

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCollection('activities', activitiesEndpoint).then(setActivities).catch(setError)
  }, [])

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Daily movement</p><h1>Activities</h1><p>Keep the team momentum visible.</p></div>
      <ApiNotice error={error} />
      {!error && !activities.length ? <LoadingState /> : null}
      <div className="row g-3">
        {activities.map((activity) => (
          <article className="col-12 col-md-6 col-xl-4" key={activity._id || activity.id}>
            <div className="data-card h-100"><div className="card-kicker">{activity.type || 'Workout'}</div><h2>{activity.durationMinutes || 0} min</h2><p>{activity.userId?.username || activity.username || 'Unassigned athlete'}</p><strong>{activity.points || 0} points</strong></div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities
