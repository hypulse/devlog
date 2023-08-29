import { useState, useEffect } from "react";
import { PostTypeGet } from "@/types/post";
import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";
import { getPosts } from "@/utils/apis/posts";
import Card from "@/components/Card";

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
    if (loading) return <div>Loading...</div>;
    return posts.map((post) => <Card key={post._id} {...post} />);
  };

  return (
    <div className="space-y-sectionGap">
      <SearchBox />
      <div className="space-y-extraGap">{renderPosts()}</div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
