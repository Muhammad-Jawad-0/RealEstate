export const register = (req, res) => {
    const {username,email,password} = req.body

    // HASH THE PASSWORD
    // CREATE A NEW USER AND SAVE TO DB
    console.log(req.body)
}
export const login = (req, res) => {
    //db operations
}
export const logout = (req, res) => {
    //db operations
}