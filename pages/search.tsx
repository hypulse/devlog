import Card from "@/components/Card";
import Loading from "@/components/Loading";
import NoResult from "@/components/NoResult";
import Pagination from "@/components/Pagination";
import { PostTypeGet } from "@/types/post";
import { searchPosts } from "@/utils/apis/posts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const { isReady, query } = useRouter();
  const [posts, setPosts] = useState<Array<PostTypeGet>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const searchTerm = query.q;
      if (!searchTerm) {
        setLoading(false);
        return;
      }

      const { error, data } = await searchPosts(searchTerm as string, page);

      if (error || !data) {
        setLoading(false);
        return;
      }

      setPosts(data.posts);
      setLastPage(data.lastPage);
      setLoading(false);
    };

    if (isReady) {
      fetchData();
    }
  }, [isReady, query.q, page]);

  const renderPosts = () => {
    if (loading) return <Loading />;
    if (posts.length === 0) return <NoResult />;
    return posts.map((post) => <Card key={post._id} {...post} />);
  };

  return (
    <div className="space-y-sectionGap">
      <div className="space-y-extraGap">{renderPosts()}</div>
      <Pagination page={page} setPage={setPage} lastPage={lastPage} />
    </div>
  );
}
