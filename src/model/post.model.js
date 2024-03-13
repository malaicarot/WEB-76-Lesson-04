import mongoose from "mongoose";
// khởi tạo schema (định nghĩa các field cho các document và kiểu dữ liệu của field đó)
const postSchema = new mongoose.Schema({
   content: { type: String, require: true },
   authorId: {type: String, require: true}
});
// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const PostsModel = mongoose.model("posts", postSchema);
export default PostsModel;