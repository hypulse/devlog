import { useState, useEffect, useRef } from "react";
import Card from "@/components/Card";
import SearchBox from "@/components/SearchBox";
import { getPosts } from "@/utils/apis/posts";
import { PostTypeGet } from "@/types/post";
import Marked from "@/components/Marked";
import Link from "next/link";

export default function Page() {
  const [posts, setPosts] = useState<Array<PostTypeGet>>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMorePosts = async () => {
      const { error, data } = await getPosts("snippet", page);

      if (error || !data || data.length === 0) {
        setHasMore(false);
        return;
      }

      setPosts((prevPosts) => [...prevPosts, ...data]);
    };

    if (hasMore) {
      loadMorePosts();
    }
  }, [page]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const callback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(callback);
    if (lastPostElementRef.current) {
      observer.current.observe(lastPostElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [posts, hasMore]);

  return (
    <div className="space-y-sectionGap">
      <SearchBox />
      <div className="space-y-extraGap">
        {posts.map((post) => (
          <div key={post._id}>
            <div className="flex items-center">
              <h2 className="font-bold text-h2 grow">{post.title}</h2>
              <Link href={`/admin/editor?id=${post._id}`}>
                <span className="text-textSecondary">edit</span>
              </Link>
            </div>
            <Marked text={post.content || ""} className="mt-elementGap" />
          </div>
        ))}
        {hasMore && <div ref={lastPostElementRef}>Loading...</div>}
      </div>
    </div>
  );
}
