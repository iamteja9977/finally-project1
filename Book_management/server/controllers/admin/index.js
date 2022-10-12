import express from "express";

import Admin from "../../models/Admin/index.js";
import Users from "../../models/Users/index.js";
import book from "../../models/Book/index.js"

import authMiddleware from "../../middlewares/auth/verifyToken.js";
import { userRegisterValidatorRules,userLoginValidatorRules, errorMiddleware,addbookvalidations } from "../../middlewares/validation/index.js";

const router = express.Router();
router.post("/AddBook", addbookvalidations(), errorMiddleware ,authMiddleware, async (req, res) => {
    try {
      const payload = req.payload;
      // console.log(payload);
      if (!payload) {
          return res.status(401).json({ error: "Unauthorised Access" });
      }

        //Check Req.body
      let { title,Author,coverImagrUrl,id,PageCount,publisher,synopsis} = req.body;

    //    let Book_id=randomString(14)
let userFound= await Users.findOne(payload.id)
console.log(userFound)
let Book_data={
        title,
        Author,
        coverImagrUrl,
        id,
        PageCount,
        publisher,
        synopsis
    }
    console.log(Book_data)
    const user = new book(Book_data);
    // console.log(userFound.BOOKS=[Book_data])
    //  userFound.push(Book_data);
        await user.save();
        res.status(200).json({ success: "Book was Added" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.get("/books", async (req, res) => {
  try {

    let book_data=await book.find({});
      // await user.save();
      res.status(200).json({ success: "Book found",book_data })
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" })
  }
})


export default router;