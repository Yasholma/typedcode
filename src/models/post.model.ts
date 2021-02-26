import { Document, model, Schema } from "mongoose";
import CreatePostDto from "../dtos/create-post.dto";
import { IPost } from "./post.interface";

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
  private postModel = model<PostDocument>("Post", postSchema);

  async getPosts(): Promise<PostDocument[]> {
    const posts = await this.postModel.find();
    return posts;
  }

  async getPostById(id: string): Promise<PostDocument> {
    return this.postModel.findById(id);
  }

  async createPost(createPostDto: CreatePostDto): Promise<PostDocument> {
    const { title, content, author } = createPostDto;
    return this.postModel.create({ title, content, author });
  }

  async updatePost(
    id: any,
    updatePostDto: CreatePostDto
  ): Promise<PostDocument> {
    return this.postModel.findOneAndUpdate({ _id: id }, updatePostDto, {
      new: true,
      useFindAndModify: false,
    });
  }

  async deletePost(id: any): Promise<PostDocument> {
    return this.postModel.findOneAndDelete({ _id: id });
  }
}

export default Post;
