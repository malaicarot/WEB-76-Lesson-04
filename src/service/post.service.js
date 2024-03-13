import { CommonUtils } from "../utils/common.util.js";
import { BadRequestError } from "../error/BadRequest.error.js";
import { CommentService as commentService } from "./comment.service.js";
import { CommentDTO } from "../dto/comment.dto.js";
import PostsModel from "../model/post.model.js";
import { PostDTO } from "../dto/post.dto.js";
import { ERROR_MSG } from "../constants/errorMessage.constant.js";

async function getAll(){
    return await PostsModel.find({});
}

async function getById(id) {
    return await PostsModel.findById(id)
}

async function getCommentByPostId(postId){

    const post = await getById(postId);
    if (CommonUtils.checkNullOrUndefined(post)) {
        throw new BadRequestError(ERROR_MSG.POST_NOT_FOUND + postId);
    }

    return await commentService.getCommentByPostId(post, postId);
}


async function addPostComment(comment, postId) {
    if (!(comment instanceof CommentDTO)) {
        throw new Error("Invalid comment object");
    }

    const post = await getById(postId)
    console.log(post)

    if (CommonUtils.checkNullOrUndefined(post)) {
        throw new BadRequestError(ERROR_MSG.POST_NOT_FOUND + postId);
    }

    // Check thêm field nào require và format gì thêm vào nếu nghiệp vụ yêu cầu
    // không thì thôi insert luôn
    comment.postId = post.id;

    return await commentService.create(comment);
}


async function createPost(post) {
    if(!(post instanceof PostDTO)){
        throw new Error("Invalid post object")
    }


    return await PostsModel.create(post);

}


async function updatePost(userId, postId, newContent){
    if(!(newContent instanceof PostDTO)){
        throw new Error("Invalid content object")
    }
  
    const post = await getById(postId);

    if(CommonUtils.checkNullOrUndefined(post)){
        throw new BadRequestError(ERROR_MSG.POST_NOT_FOUND + postId);
    }
 
    if(post.authorId !== userId){
        throw new Error("The user is not the author of this post")
    }

    post.content = newContent.content;

    return await post.save();
}


async function getThreeComments() {
    const post = await getAll();

    if(CommonUtils.checkNullOrUndefined(post)){
        throw new BadRequestError(ERROR_MSG.POST_NOT_FOUND);
    }

    return await commentService.getThreeComments(post);
}


export const PostService = {
    getById,
    addPostComment,
    createPost,
    updatePost,
    getCommentByPostId,
    getThreeComments
}
