import { Document, Model, model, Schema } from "mongoose";
import CreatePostDto from "../dtos/create-post.dto";

export interface IPost {
  author: string;
  title: string;
  content: string;
}

export type PostDocument = Document & IPost;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: { type: String, required: true },
  author: { type: String, required: true },
});

class Post {
  private postModel: Model<Document<PostDocument>> = model("Post", postSchema);

  async getPosts() {
    const posts = await this.postModel.find();
    return posts;
  }

  async getPostById(id: string) {
    return this.postModel.findById(id);
  }

  async createPost(createPostDto: CreatePostDto) {
    const { title, content, author } = createPostDto;
    return this.postModel.create({ title, content, author });
  }

  async updatePost(id: any, updatePostDto: any) {
    return this.postModel.findOneAndUpdate({ _id: id }, updatePostDto, {
      new: true,
      useFindAndModify: false,
    });
  }

  async deletePost(id: any) {
    return this.postModel.findOneAndDelete({ _id: id });
  }
}

export default Post;
