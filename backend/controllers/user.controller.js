import prisma from "../lib/prisma.js";

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ data: users });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ status: 500, message: "Failed To get Users" });
    }
};
// ------------------------------------------------------------
export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        res.status(200).json({ data: user });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ status: 500, message: "Failed To get User" });
    }
};
// --------------------------------------------------------------
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const body = req.body;

    if (id !== tokenUserId) {
        return res.status(403).json({ status: 403, message: "Not Authurized" })
    }
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: body,
        });
        // res.status(200).json({ status: 200, data: updatedUser })
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ status: 500, message: "Failed To update Users" });
    }
};
// ===============================================================================
export const deleteUser = async (req, res) => {
    try {
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ status: 500, message: "Failed To delete Users" });
    }
};
