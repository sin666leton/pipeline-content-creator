import express, { type NextFunction, type Request, type Response } from "express"
import cors from "cors"
import ApplicationException from "./modules/shared/application/exceptions/ApplicationException"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to EXPRESS"
    })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApplicationException) {
        return res
            .status(err.statusCode)
            .json({
                message: err.message
            })


    } else {
        throw err
        return res
            .status(500)
            .json({
                message: err.message
            })
    }

})

export default app