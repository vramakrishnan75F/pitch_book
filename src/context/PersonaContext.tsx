import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type Persona = 'host' | 'player'

type PersonaUser = {
  id: string
  name: string
  mobile: string
  upiId?: string
}

type PersonaContextValue = {
  persona: Persona
  setPersona: (persona: Persona) => void
  currentUser: PersonaUser
  hostUser: PersonaUser
  playerUser: PersonaUser
}

const STORAGE_KEY = 'goarena-dev-persona'

const hostUser: PersonaUser = {
  id: 'user_001',
  name: 'Vinay',
  mobile: '9876543210',
  upiId: 'vinay@oksbi',
}

const playerUser: PersonaUser = {
  id: 'user_009',
  name: 'Sourav D',
  mobile: '9951112237',
}

const PersonaContext = createContext<PersonaContextValue | undefined>(undefined)

function getInitialPersona(): Persona {
  if (typeof window === 'undefined') {
    return 'host'
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'player' ? 'player' : 'host'
}

export function maskMobile(mobile: string): string {
  if (mobile.length < 10) {
    return mobile
  }

  return `${mobile.slice(0, 3)}*****${mobile.slice(-3)}`
}

function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>(getInitialPersona)

  const setPersona = (nextPersona: Persona) => {
    setPersonaState(nextPersona)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextPersona)
    }
  }

  const value = useMemo<PersonaContextValue>(
    () => ({
      persona,
      setPersona,
      currentUser: persona === 'host' ? hostUser : playerUser,
      hostUser,
      playerUser,
    }),
    [persona],
  )

  return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>
}

export function usePersona(): PersonaContextValue {
  const context = useContext(PersonaContext)

  if (!context) {
    throw new Error('usePersona must be used within PersonaProvider')
  }

  return context
}

export default PersonaProvider
