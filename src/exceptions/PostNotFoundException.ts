import HttpException from "./HttpException";

class PostNotFoundException extends HttpException {
  constructor(postId: string) {
    super(404, `Post with ID: ${postId} not found.`);
  }
}

export default PostNotFoundException;
