import {Comment} from "../../model/comments.model"
export async function addComment(commenterId:string, postId:number, commentText:String) {
    const comment = new Comment({
      commenter: commenterId,
      text: commentText,
      post: postId
    });
    await comment.save();
  }

  export async function getComments(postId:string) {
    const comments = await Comment.find({ post: postId }).populate('commenter');
    return comments;
  }

  export async function deleteComment(commentId:string) {
    await Comment.findOneAndDelete({ _id: commentId });
  }
  