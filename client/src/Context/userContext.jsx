import React, { createContext, useState } from 'react'
export const userContext = createContext(null)
function Context({ children }) {
  const [user, setUser] = useState(null)
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  )
}


export default Context