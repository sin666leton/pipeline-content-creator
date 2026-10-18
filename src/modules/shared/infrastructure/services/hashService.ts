import bcrypt from "bcrypt"

export const hashService = (text: string) => bcrypt.hashSync(text, 10)