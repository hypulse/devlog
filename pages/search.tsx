import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";
import { PostTypeGet } from "@/types/post";
import { searchPosts } from "@/utils/apis/posts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [posts, setPosts] = useState<Array<PostTypeGet>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const q = router.query.q;
      if (!q) return;

      const { error, data } = await searchPosts(q as string, page);

      if (error || !data) {
        setLoading(false);
        return;
      }
      setPosts(data);
      setLoading(false);
    };

    fetchData();
  }, [router, page]);

  const renderPosts = () => {
    if (loading) return <div>Loading...</div>;

    if (posts.length === 0) return <div>No search results found.</div>;

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
