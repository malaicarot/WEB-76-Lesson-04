import { ERROR_MSG } from "../constants/errorMessage.constant.js";
import { CommentDTO } from "../dto/comment.dto.js";
import { UserDTO } from "../dto/user.dto.js";
import { BadRequestError } from "../error/BadRequest.error.js";
import { BaseError } from "../error/base.error.js";
import { PostService as postService } from "../service/post.service.js";
import { UserService as userService } from "../service/user.service.js";
import { CommonUtils } from "../utils/common.util.js";


async function getAll(req, res) {
    try {
        res.json(await userService.getAllUsers());
    } catch (err) {
        console.error(`Error while get all user`, err.message);

        if (err instanceof BaseError) {
            res.status(err.statusCode)
        } else {
            res.status(500)
        }

        res.json({
            error: {
                msg: err.message
            }
        });
    }
}

async function register(req, res) {
    try {

        if (CommonUtils.checkNullOrUndefined(req.body)) {
            throw new BadRequestError(ERROR_MSG.INVALID_REQ)
        }

        const newUser = new UserDTO(req.body)

        res.json(await userService.registerUser(newUser));
    } catch (err) {
        console.error(`Error while register new user`, err.message);

        if (err instanceof BaseError) {
            res.status(err.statusCode)
        } else {
            res.status(500)
        }

        res.json({
            error: {
                msg: err.message
            }
        });
    }
}


async function updateComment(req, res) {
    try {
        const commentId = req.params.commentId;
        const userId = req.params.userId;
                
        if(CommonUtils.checkNullOrUndefined(req.body) || CommonUtils.checkNullOrUndefined(userId) || CommonUtils.checkNullOrUndefined(commentId)){
            throw new BadRequestError(ERROR_MSG.INVALID_REQ);
        };
       
        const commentNeedFix = new CommentDTO(req.body);
        
        res.json(await userService.updateComment(commentId, userId, commentNeedFix));
        
    } catch (err) {
        console.error(`Error while update post`, err.message);

        if(err instanceof BaseError){
            res.status(err.statusCode)
        }else{
            res.status(500)
        }

        res.json({
            error: {
                message: err.message
            }
        });
        
    }
    
}


async function getCommentByPostId(req, res) {
    try {
        const postId = req.params.postId;
 
        if(CommonUtils.checkNullOrUndefined(postId)){
            throw new BadRequestError(ERROR_MSG.INVALID_REQ);
          
        };
        
        res.json(await postService.getCommentByPostId(postId))
  
    } catch (err) {
        console.error(`Error while get comment`, err.message);

        if(err instanceof BaseError){
            res.status(err.statusCode)
        }else{
            res.status(500)
        }

        res.json({
            error: {
                message: err.message
            }
        });
        
    }
    
}

async function getThreeComments(req, res) {
    try {
 
        res.json(await postService.getThreeComments())
  
    } catch (err) {
        console.error(`Error while get post and comment`, err.message);

        if(err instanceof BaseError){
            res.status(err.statusCode)
        }else{
            res.status(500)
        }

        res.json({
            error: {
                message: err.message
            }
        });
        
    }
    
}

export const UserController = {
    getAll,
    register,
    updateComment,
    getCommentByPostId,
    getThreeComments
}