import { useState, useEffect } from "react";
import { PostTypeGet } from "@/types/post";
import Pagination from "@/components/Pagination";
import { getPosts } from "@/utils/apis/posts";
import Feed from "@/components/Feed";
import Loading from "@/components/Loading";
import NoResult from "@/components/NoResult";

export default function Page() {
  const [posts, setPosts] = useState<Array<PostTypeGet>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const { error, data } = await getPosts("snippet", page);

      if (error || !data) {
        setLoading(false);
        return;
      }

      setPosts(data);
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const renderPosts = () => {
    if (loading) return <Loading />;
    if (posts.length === 0) return <NoResult />;
    return posts.map((post) => <Feed key={post._id} {...post} />);
  };

  return (
    <div className="space-y-sectionGap">
      <div className="space-y-extraGap">{renderPosts()}</div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
