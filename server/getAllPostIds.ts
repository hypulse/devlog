import Post from "./Models/Post";

const getAllPostIds = async () => {
  try {
    const activePosts = await Post.find({ state: "active" }).select("_id");
    return activePosts.map((post) => post._id.toString());
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getAllPostIds;
