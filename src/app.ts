import express, { type NextFunction, type Request, type Response } from "express"
import cors from "cors"
import ApplicationException from "./modules/shared/application/exceptions/ApplicationException"
import { v1ChannelRouter } from "./routes/channelRouter"
import authMiddleware from "./modules/shared/infrastructure/middlewares/authMiddleware"
import authRouter from "./modules/auth/infrastructure/routes/authRouter"
import ValidationError from "./modules/shared/application/exceptions/ValidationError"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to EXPRESS"
    })
})

app.use('/api', authRouter)
app.use(authMiddleware)
app.use('/api', v1ChannelRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApplicationException) {
        if (err instanceof ValidationError) {
            return res
                .status(err.statusCode)
                .json({
                    error: err.getError
                })
        }

        return res
            .status(err.statusCode)
            .json({
                message: err.message
            })


    } else {
        throw err
        // return res
        //     .status(500)
        //     .json({
        //         message: err
        //     })
    }

})

export default app