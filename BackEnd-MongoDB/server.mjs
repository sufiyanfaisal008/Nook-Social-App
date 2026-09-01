import "dotenv/config"
import express from 'express'
import { authRoutes, postRout, profileRout } from './route/index.mjs'
const app = express()
const port = process.env.port || 5001
import cors from 'cors'
import { connect_database } from './libs/mongodb.mjs'
import { authGurdJWT } from "./midleware/jwt/jwt.mjs"

app.use(express.json())

app.use(cors({
    origin: "*",
    methods: '*'
}))

app.get('/', (req, res, next) => {
    res.send({
        message: 'Runing Server...'
    })
})

app.use('/api/v1',
    authRoutes,
    authGurdJWT,
    postRout,
    profileRout
)

app.listen(port, () => {
    console.log("Server Runing")
    connect_database()
})