import {SETTINGS} from "./settings";
import {app} from './app'

app.listen(SETTINGS.PORT,()=>{
    console.log(`SERVER WAS STARTED ON ${SETTINGS.PORT}`)
})