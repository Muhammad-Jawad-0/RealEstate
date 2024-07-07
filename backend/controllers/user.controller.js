import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

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
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authurized" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser

    res.status(200).json(rest)
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ status: 500, message: "Failed To update Users" });
  }
};
// ===============================================================================
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authurized" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed To delete User!" });
  }
};
