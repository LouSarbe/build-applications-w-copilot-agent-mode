export function ApiNotice({ error }) {
  if (!error) return null

  const isConfigurationError = error.message.includes('VITE_CODESPACE_NAME')
  return (
    <div className="alert alert-warning" role="alert">
      {isConfigurationError
        ? 'Configure VITE_CODESPACE_NAME in .env.local to connect to the API.'
        : error.message}
    </div>
  )
}

export function LoadingState() {
  return <p className="text-secondary">Loading data...</p>
}
