import { Document, model } from "mongoose";
import { POST } from "../../constants";
import CreatePostDto from "../../dtos/create-post.dto";
import { IPost } from "./post.interface";
import { postSchema } from "./post.schema";

export type PostDocument = Document & IPost;

class Post {
  private postModel = model<PostDocument>(POST, postSchema);

  async getPosts(): Promise<PostDocument[]> {
    const posts = await this.postModel.find().populate("author", "-password");
    return posts;
  }

  async getPostById(id: string): Promise<PostDocument> {
    return this.postModel.findById(id).populate("author", "-password");
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
