import { CommentDTO } from "../dto/comment.dto.js";
import CommentsModel from "../model/comment.model.js";
import { CommonUtils } from "../utils/common.util.js";

async function getAll(){
    return await CommentsModel.find({});
}

async function getById(id){
    return await CommentsModel.findById(id)
}

async function getCommentByPostId(post, postId){
    const comment = await getAll();
    const commentOfPost = comment.filter(item => item.postId === postId);

    return {post, commentOfPost};
}

async function create(comment) {
    if (!(comment instanceof CommentDTO)) {
        throw new Error("Invalid user object");

    }
    return await CommentsModel.create(comment)
}


async function updateComment(commentId, userId, commentNeedFix) {
    if(!commentNeedFix instanceof CommentDTO){
        throw new Error ("Invalid comment object"); 
    }

   const comment = await getById(commentId);


    if(CommonUtils.checkNullOrUndefined(comment)){
        throw new BadRequestError(ERROR_MSG.COMMENT_NOT_FOUND + commentId);
    }

    if(comment.authorId !== userId){
        throw new Error("The user is not the author of this comment")
    }

    comment.content = commentNeedFix.content;


    return await comment.save();
}


async function getThreeComments(post) {

    const comment = await getAll();

    const postWithComments = post.map((post) =>{
        const postComments = comment.filter((comment) => {
            comment.postId === post.id
        })

        const firstThreeComments = postComments.slice(0, 3);
        

        return { ...post, comments: firstThreeComments };
        
    })
    

    return postWithComments;
    
}

export const CommentService = {
    create,
    updateComment,
    getCommentByPostId,
    getThreeComments
}
