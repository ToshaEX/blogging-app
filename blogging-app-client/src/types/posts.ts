export type PostResponseType = {
  _id: string;
  title: string;
  image_path: string;
  description: string;
  post: string;
  create_at: Date;
  author: {
    _id: string;
    username: string;
    create_at: string;
  };
};

export type CreatePostType = Omit<
  PostResponseType,
  "author" | "_id" | "create_at"
>;

export type PostType = {
  title: string;
  description: string;
  post: string;
  file: File | null;
};
