
import { UserDTO } from "../dto/user.dto.js";
import { CommentDTO } from "../dto/comment.dto.js";
import { CommonUtils } from "../utils/common.util.js";
import { ERROR_MSG } from "../constants/errorMessage.constant.js";
import { PostService as postService } from "./post.service.js";
import UsersModel from "../model/user.model.js";
import { PostDTO } from "../dto/post.dto.js";
import { CommentService as commentService } from "./comment.service.js";



async function getAllUsers() {
    return await UsersModel.find({});
    
}

async function getById(id) {

    return await UsersModel.findById(id)

}

async function registerUser(user) {
    if (user instanceof UserDTO === false) {
        throw new Error("Invalid user object");
    }
    
    // user.id = userIdGenerator();
    return await UsersModel.create(user)
}

async function createPost(userId, post) {
    if(!(post instanceof PostDTO)){
        throw new Error ("Invalid post object");
    }

    const user = await getById(userId);

    if(CommonUtils.checkNullOrUndefined(user)){
        throw new  BadRequestError(ERROR_MSG.USER_NOT_FOUND + userId);
    }

    post.authorId = user.id;
    return await postService.createPost(post);

}

async function commentOnPostByPostId(comment, userId, postId) {
    if (!(comment instanceof CommentDTO)) {
        throw new Error("Invalid comment object");
    }

    const user = await getById(userId);

    if (CommonUtils.checkNullOrUndefined(user)) {
        throw new BadRequestError(ERROR_MSG.POST_NOT_FOUND + userId);
    }

    comment.authorId = user.id;
    
    return await postService.addPostComment(comment, postId);
}

async function updatePost(userId, postId, newContent) {
    if(!(newContent instanceof PostDTO)){
        throw new Error ("Invalid content object");
    }
   

    const user = await getById(userId);

    if(CommonUtils.checkNullOrUndefined(user)){
        throw new BadRequestError(ERROR_MSG.USER_NOT_FOUND + userId);
    }
   

    return await postService.updatePost(userId, postId, newContent);
}

async function updateComment(commentId, userId, commentNeedFix) {
    if(!commentNeedFix instanceof CommentDTO){
        throw new Error ("Invalid comment object"); 
    }

    const user = getById(userId);

    if(CommonUtils.checkNullOrUndefined(user)){
        throw new BadRequestError(ERROR_MSG.USER_NOT_FOUND + userId);
    }

    return await commentService.updateComment(commentId, userId, commentNeedFix);
    
}

export const UserService = {
    registerUser,
    getAllUsers,
    getById,
    commentOnPostByPostId,
    updateComment,
    createPost,
    updatePost
}
