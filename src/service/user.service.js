
import { UserDTO } from "../dto/user.dto.js";
import { CommentDTO } from "../dto/comment.dto.js";
import { CommonUtils } from "../utils/common.util.js";
import { ERROR_MSG } from "../constants/errorMessage.constant.js";
import { PostService as postService } from "./post.service.js";
import UsersModel from "../model/user.model.js";
import { PostDTO } from "../dto/post.dto.js";
import { CommentService as commentService } from "./comment.service.js";
import bcrypt from 'bcrypt';



async function getAllUsers() {
    return await UsersModel.find({});
    
}

async function getById(id) {

    return await UsersModel.findById(id)

}


function isValidEmail(email) {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailPattern.test(email);
  }

async function registerUser(user) {
    if (user instanceof UserDTO === false) {
        throw new Error("Invalid user object");
    }

    const checkEmailExist = await UsersModel.findOne({ email: user.email });

    if (checkEmailExist || !isValidEmail(user.email)){
        throw new Error("Error with email (exits or invalid)")
    }


    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(user.pass, salt);
    
    const newUser = new UsersModel({
        userName: user.userName,
        email: user.email,
        pass: hashPass,

    });

    return await newUser.save()
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
