import {createAuthClient} from "better-auth/react"
import {deviceAuthorization} from "better-auth/plugins"

export const authClient = createAuthClient({
    baseURL:"https://sebicli-production.up.railway.app",
    plugins:[
        deviceAuthorization()
    ]
})