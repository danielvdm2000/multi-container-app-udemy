import { Express } from 'express'
import { Settings } from "./get-settings"

export type StartExpressAppSettings = Readonly<{
    serverPort: number;
}>

export function startExpressApp(app: Express, settings: Settings) {
    app.listen(settings.serverPort, () => {
        console.log(`Listening on port ${settings.serverPort}`)
    })
}