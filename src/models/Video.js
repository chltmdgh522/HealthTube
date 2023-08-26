import mongoose from "mongoose";
export const formatHashTags=(hashtags)=>hashtags.split(",").map((word)=> word.startsWith('#') ? word : `#${word}`);

const videoSchema = new mongoose.Schema({
  title: {type: String, required: true, trim: true, maxLength: 20},
  fileUrl:{type:String, required: true},
  thumbUrl: { type: String, required: true },
  description: {type: String, required: true,trim: true, minLength: 10},
  createdAt: {type: Date, required: true, default: Date.now},
  hashtags: [{ type: String, trim:true }],
  meta: {
    views: {type: Number, default:0, required: true},
    rating: {type: Number, default:0, required: true},
  },
  comments:[{type:mongoose.Schema.Types.ObjectId, required: true, ref:"Comment"}],//영상은 많은 댓글을 가질 수 있다.
  owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"User" }, //로그인한 유저에서 비디오 CRUD를 위해 연결 
});

videoSchema.static("changePathFormula", (urlPath) => {
  return urlPath.replace(/\\/g, "/");
  });

const Video = mongoose.model("Video", videoSchema);
export default Video;