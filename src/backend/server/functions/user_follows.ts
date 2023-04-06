
import { follows_model } from "../../model/follows.model"

export async function followUser(userId:string, otherUserId:string) {
    await follows_model.findByIdAndUpdate(userId, { $addToSet: { following: otherUserId }});
    await follows_model.findByIdAndUpdate(otherUserId, { $addToSet: { followers: userId }});
  }
  
  
  export async function unfollowUser(userId:string, otherUserId:string) {
    await follows_model.findByIdAndUpdate(userId, { $pull: { following: otherUserId }});
    await follows_model.findByIdAndUpdate(otherUserId, { $pull: { followers: userId }});
  }
  

  export async function getFollowerCount(userId:string) {
    const user = await follows_model.findById(userId);
    return user && user.followers.length;
  }
  
 export  async function getFollowingCount(userId:string) {
    const user = await follows_model.findById(userId);
    return user && user.following.length;
  }

  export async function getFollowers(userId:string) {
    const followers = await follows_model.find({ followingUser: userId }).populate('followerUser');
    return followers;
  }

  export async function getFollowing(userId:string) {
    const following = await follows_model.find({ followerUser: userId }).populate('followingUser');
    return following;
  }
  
  export async function removeFollower(followingUserId:string, followerUserId:string) {
    await follows_model.deleteOne({ followingUserId, followerUserId });
  }
  