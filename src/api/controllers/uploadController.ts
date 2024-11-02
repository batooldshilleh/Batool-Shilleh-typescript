import { Request, Response, NextFunction } from 'express'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { ErrorMessages } from '../../utils/constants'

const uploadDir = path.join(__dirname, '../../uploads')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

export const uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      return next(new Error(ErrorMessages.NO_FILE_UPLOADED))
    }

    const fileName = `uploaded_${Date.now()}.jpg`
    const filePath = path.join(uploadDir, fileName)

    await sharp(req.file.buffer).toFile(filePath)
    res.status(200).json({ message: 'Image uploaded successfully!', path: filePath })
  } catch (error) {
    next(error)
  }
}
