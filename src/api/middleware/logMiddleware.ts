import { Request, Response, NextFunction } from 'express'

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`)
    next()
}