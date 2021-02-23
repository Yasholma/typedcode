export interface IPost {
  author: string;
  title: string;
  content: string;
}

class Post {
  private posts: IPost[] = [
    {
      author: "Marcin",
      content: "Dolor sit amet",
      title: "Lorem Ipsum",
    },
  ];

  getPosts(): IPost[] {
    return this.posts;
  }

  createPost(createPostDto: IPost): IPost {
    const { title, content, author } = createPostDto;
    const newPost = { title, content, author };

    this.posts.push(newPost);
    return newPost;
  }
}

export default Post;
