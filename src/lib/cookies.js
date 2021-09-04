const cookieDate = (ms) => {
  const date = new Date()
  date.setTime(Date.now() + ms)
  return date.toUTCString()
}

export const setCookie = (name, ms) => (body) => {
  document.cookie = `${name}=${body}; path=/; expires="${cookieDate(ms)}`
}

export const getCookie = (name) => {
  const results = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
  if (results) {
    return decodeURI(results[2])
  }
  return false
}

export const delCookie = (name) => {
  document.cookie = `${name}=; path=/; expires=${cookieDate(-1)}`
}
