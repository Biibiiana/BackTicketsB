const User = require("../../models/User.model");
// const Fun = require("../../models/Fun.model");

const router = require("express").Router();

//* GET "/api/user/myProfile" => devuelve los datos de mi perfil

router.get("/myProfile", async (req, res, next) => {
  const { _id } = req.payload;
  try {
    const response = await User.findById(_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//* POST "/api/user/newFun" => recibe unos datos de un formulario y 
// crea todo lo necesario para crear un fun
// router.post("/newFun", async (req, res, next) => {
//   // console.log(req.body);
//   const { newFun, arrUsers } = req.body;
//   const { title, description, date, time, isPublic, mainImg } = newFun;
//   const { _id } = req.payload;

//   try {
//     const funCollection = { title };
//     const respFunColl = await FunCollection.create(funCollection);

//     const fun = {
//       description,
//       date,
//       time,
//       isPublic,
//       mainImg,
//       collection: respFunColl._id,
//       creator: _id,
//     };

//     const respFun = await Fun.create(fun);
//     await FunCollection.findByIdAndUpdate(respFunColl._id, {
//       $push: { funs: respFun._id },
//     });

//     const invitation = { inviter: _id, guests: arrUsers, fun: respFun._id };
//     invitation.length > 0 && (await Invitation.create(invitation));

//     // const messagesArr = arrUsers.map((eachId) => {
//     //   return {
//     //     category: "invitation",
//     //     sender: _id,
//     //     receiver: eachId,
//     //     message: description,
//     //     fun: respFun._id,
//     //     isFresh: true,
//     //   };
//     //   console.log(messagesArr)
//     // });

//     // await Message.insertMany(messagesArr)


//     await User.findByIdAndUpdate(_id, {
//       $addToSet: { funs: respFun._id },
//     });

//     res.json("hecho");
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// //* GET "/api/user/myFuns" => devulve un json con los datos de los funs 
// // del usuario.

// router.get("/myFuns", async (req, res, next) => {
//   const { _id } = req.payload;

//   try {
//     const response = await User.findById(_id)
//       .select({ funs: 1 })
//       .populate({
//         path: "funs",
//         populate: {
//           path: "collection",
//           model: "FunCollection",
//         },
//       });

//     res.json(response);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
