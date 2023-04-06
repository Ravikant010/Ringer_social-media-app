import express  from "express";
import { signup, login,send_user_details } from "../functions/user_auth";
import { Request, Response, Router } from 'express';
import { follows_model } from '../../model/follows.model';
import { followUser, removeFollower,getFollowerCount ,getFollowing,getFollowers} from "../../server/functions/user_follows"
import  { addComment, getComments, deleteComment }  from "../functions/commenting"
export const Route = express.Router()
Route.post("/login", login)
Route.post('/signup', signup)
Route.get('/fetchuser/:id', send_user_details)



// Add a comment to a post
Route.post('/comments', async (req, res) => {
  const { commenterId, postId, commentText } = req.body;
  try {
    await addComment(commenterId, postId, commentText);
    res.status(201).send('Comment added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding comment');
  }
});

// Get comments for a post
Route.get('/comments/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await getComments(postId);
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting comments');
  }
});

// Delete a comment
Route.delete('/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;
  try {
    await deleteComment(commentId);
    res.send('Comment deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting comment');
  }
});


// Add a follower
Route.post('/users/:userId/follow', async (req: Request, res: Response) => {
  const followingUser = req.params.userId;
  const followerUser = req.body.followerUserId;
  try {
    await followUser(followingUser, followerUser);
    res.status(200).send('Follower added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding follower');
  }
});

// Get a user's followers
Route.get('/users/:userId/followers', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const followers = await getFollowers(userId);
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving followers');
  }
});

// Get a user's following users
Route.get('/users/:userId/following', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const following = await getFollowing(userId);
    res.status(200).json(following);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving following users');
  }
});

// Remove a follower
Route.delete('/users/:userId/followers/:followerId', async (req: Request, res: Response) => {
  const followingUser = req.params.userId;
  const followerUser = req.params.followerId;
  try {
    await removeFollower(followingUser, followerUser);
    res.status(200).send('Follower removed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error removing follower');
  }
});




