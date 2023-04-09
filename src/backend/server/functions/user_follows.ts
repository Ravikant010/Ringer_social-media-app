
import { NextFunction, Request, Response } from "express";
import { follows_model,Follows } from "../../model/follows.model"
import {user_model} from "../../model/usermodel"



export async function following(req: Request, res: Response, next: NextFunction) {
  // try {
    const { id, otherUserId } = req.query;
    console.log(id, otherUserId);
const arryID = req.body.map((args:any) =>args._id)
console.log(arryID)
// for(let i = 0; i < arryID.length; i++)
// {

//   const options = { upsert: true, new: true };
//   const followers_update_options = { $addToSet: { followers: arryID[i] }};
//   const followers_update = await Follows.findOneAndUpdate(
//     { _id: id },
//     followers_update_options,
//     options
//   );
//   const following_update_options = { $addToSet: { following: id } };
  
//   const following_update = await Follows.findOneAndUpdate(
//     { _id: arryID[i] },
//     following_update_options,
//     options
//   );

//   following_update?.save()
//   followers_update?.save

// }
// res.send("ok")
try{
    const found_user = await user_model.findOne({ _id: otherUserId });
    console.log(found_user, "found user");

    if (found_user) {
      // Get the Follows document for the user with id 'id'
      // const Follows = await Follows.findOne({ user: id });

      // Add the 'following' user to the array if not already present
      const following_update_options = { $addToSet: { following: otherUserId } };
  const options = { upsert: true, new: true };
  const following_update = await Follows.findOneAndUpdate(
    { _id: id },
    following_update_options,
    options
  );
  const followers_update_options = { $addToSet: { followers: id }};
  const followers_update = await Follows.findOneAndUpdate(
    { _id: otherUserId },
    followers_update_options,
    options
  );
  following_update?.save()
  followers_update?.save

  if (!following_update && !following_update) {
    return res.status(500).json({ message: 'Failed to update follows' });
  }

  res.status(200).json({ message: 'Follow updated successfully' });
}
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
}



export async function get_number_of_follower(req: Request, res: Response, next: NextFunction) {
  const { id } = req.query;
  console.log("id",id);
  let  followersCount;
  try {
    const user = await Follows.findById(id);
  
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    const followersCount = user.followers.length;
    const followingCount = user.following.length;
    return res.status(200).json({"followersCount" : followersCount, "followingCount": followingCount });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}