const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : null

export async function fetchCollection(resource, endpoint = null) {
  if (!apiBaseUrl) {
    throw new Error('VITE_CODESPACE_NAME is not configured.')
  }

  const response = await fetch(endpoint || `${apiBaseUrl}/${resource}/`)
  if (!response.ok) {
    throw new Error(`The ${resource} request failed (${response.status}).`)
  }

  const payload = await response.json()
  return Array.isArray(payload)
    ? payload
    : payload.results || payload.items || payload.data || []
}
