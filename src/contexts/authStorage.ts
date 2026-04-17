export type AuthUser = {
  displayName: string
}

export const AUTH_USER_STORAGE_KEY = 'liveflow-auth-user'

/** 라우트 loader 등 React 바깥에서 동일 규칙으로 세션 사용자를 읽을 때 사용 */
export function getStoredAuthUser(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(AUTH_USER_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (
      parsed &&
      typeof parsed === 'object' &&
      'displayName' in parsed &&
      typeof (parsed as AuthUser).displayName === 'string'
    ) {
      return { displayName: (parsed as AuthUser).displayName }
    }
    return null
  } catch {
    return null
  }
}
