import { useEffect, useState } from 'react'
import { fetchCollection } from '../apiClient.js'
import { ApiNotice, LoadingState } from './ApiFeedback.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : null

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => { fetchCollection('workouts', workoutsEndpoint).then(setWorkouts).catch(setError) }, [])

  return (
    <section>
      <div className="page-heading"><p className="eyebrow">Your next session</p><h1>Workouts</h1><p>Pick a challenge that fits the energy you have today.</p></div>
      <ApiNotice error={error} />
      {!error && !workouts.length ? <LoadingState /> : null}
      <div className="row g-3">{workouts.map((workout) => <article className="col-12 col-md-6 col-xl-4" key={workout._id || workout.id}><div className="data-card h-100"><span className={`difficulty difficulty-${workout.difficulty}`}>{workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.description}</p><strong>{workout.durationMinutes} min</strong></div></article>)}</div>
    </section>
  )
}

export default Workouts
