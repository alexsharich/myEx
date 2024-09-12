import express, {Request,Response} from 'express'
const app = express()

const port = 3003

app.get('/',(req:Request,res:Response)=>{
    const response = 'HELLO WORLD !!!'
    res.send(response)
})

app.listen(port,()=>{
    console.log(`SERVER WAS STARTED on ${port}`)
})
