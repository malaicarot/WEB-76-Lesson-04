import mongoose from "mongoose";
// khởi tạo schema (định nghĩa các field cho các document và kiểu dữ liệu của field đó)
const commentSchema = new mongoose.Schema({
   content:  { type: String, require: true },
   postId:   { type: String, require: true },
   authorId: { type: String, require: true }
});
// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const CommentsModel = mongoose.model("comments", commentSchema);
export default CommentsModel;