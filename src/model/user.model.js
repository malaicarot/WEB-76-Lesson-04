import mongoose from "mongoose";

// khởi tạo schema (định nghĩa các field cho các document và kiểu dữ liệu của field đó)
const userSchema = new mongoose.Schema({
  userName: { type: String, require: true },
  pass: { type: String, require: true },
  email: {
    type: String,
    require: true,
  },
});
// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const UsersModel = mongoose.model("users", userSchema);
export default UsersModel;
