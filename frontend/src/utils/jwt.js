export function decodeJwt(token) {
  if (!token) return null
  const payload = token.split('.')[1]
  if (!payload) return null
  try {
    const decodedPayload = atob(payload)
    return JSON.parse(decodedPayload)
  } catch (e) {
    return null
  }
}
