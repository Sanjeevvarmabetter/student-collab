const User = require("../models/user");


const router = require("express").Router();

router.get("/",(req,res) => {
    res.send("hello from user test route");
});


/// follow 

router.put("/:id/follow",async (req,res) => {
    if(req.body.userId != req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentuser = await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: {followers: req.body.userId}});
          await currentuser.updateOne({$push: { following:req.params.id}});
          res.status(200).json("User has been followed");
        }
        else {
          res.status(403).json("you already followed");
        }
      }catch(err) {
        res.status(500).json(err);
      }
    }
  })
  

// i am following the url id

// unfollow

router.put("/:id/unfollow",async (req,res) => {
    if(req.body.userId != req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentuser = await User.findById(req.body.userId);
        if(users.followers.includes(req.body.userid)) {
          await user.updateOne({ $pull :{followers: req.body.userId}});
          await currentuser.updateOne({ $pull : {following: req.params.id}});
          res.status(200).json("User has been unfollowed");
        }
        else {
          res.status(403).json("You dont follow this user");
        }
      }
      catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("dont be dumb,you cant follow yourself");
    }
  })


module.exports = router;