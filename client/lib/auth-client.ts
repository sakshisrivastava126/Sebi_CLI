import {createAuthClient} from "better-auth/react"
import {deviceAuthorizationClient} from "better-auth/client/plugins"

export const authClient = createAuthClient({
  // baseURL: "https://sebicli-production.up.railway.app",
  baseURL: "http://localhost:3005",
  plugins: [
    deviceAuthorizationClient()  
  ]
})