import {type Loadable, useRecoilState, useRecoilValueLoadable } from "recoil";
import { useEffect, useState } from "react";
import {
  blogSelector,
  SingleBlogSelectorFamily,
  type blog,
  type BlogsDataType
} from "../state/Selectors/BlogsFamily";
import { blogsState,type Tags } from "../components/BlogSelector";
import { TagsAtom } from "../state/atoms/TagsAtom";


export const useFetchBlogs = () => {
  const blogsLoadable: Loadable<BlogsDataType> =
    useRecoilValueLoadable(blogSelector);
  const [Loading, SetLoading] = useState<boolean>(false);
  const [Blogs, SetBlogs] = useRecoilState<blog[]>(blogsState);
  const [Tags, SetTags] = useRecoilState<Tags>(TagsAtom);

  useEffect(() => {
    if (Blogs.length === 0) {
      // Only fetch blogs if Blogs is empty
      switch (blogsLoadable.state) {
        case "hasValue":
          SetBlogs(blogsLoadable.contents.blogs);
          SetTags(blogsLoadable.contents.tags);
          console.log(Tags);
          SetLoading(false);
          break;
        case "loading":
          SetLoading(true);
          break;
        case "hasError":
          console.error(blogsLoadable.contents);
          SetLoading(true);
          break;
      }
    } else {
      // Blogs have already been fetched, so set Loading to false
      SetLoading(false);
    }
  }, [blogsLoadable]);

  return { Loading, Blogs };
};

// fetches single blog
export const useFetchSingleBlog = (id: string) => {
  const singleBlogLoadable: Loadable<blog> = useRecoilValueLoadable(
    SingleBlogSelectorFamily(id)
  );

  switch (singleBlogLoadable.state) {
    case "hasValue":
      return { blog: singleBlogLoadable.contents, isLoading: false };
    case "loading":
      return { blog: null, isLoading: true };
    case "hasError":
      throw singleBlogLoadable.contents;
  }
};