import { LikeButton } from "./LikeButton";
import { Avatar } from "./shadcn/shadcn/ui/Avatar";
import {type blog } from "../state/Selectors/BlogsFamily";

// TOOD make it rePonsive
export const SingleBlog = ({ blog }: { blog: blog }) => {
  console.log("blog id frpm the single blog component",  blog.id);
  const date = new Date(blog.createdAt);
  const createdAt = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  // console.log(window.location.href);
  return (
    <>
      <div className="lg:grid lg:grid-cols-12 w-full ">
        <div className="lg:col-span-8 lg:m-1 px-9 pt-4 ">
          <div className="lg:text-6xl text-3xl font-montserrat font-extrabold ">
            {blog.title}
          </div>

          <div className="flex mt-7 border-y border-gray-150 shadow-sm">
            <div className="text-slate-400  my-3">
              {`Posted on ${createdAt}` || "16 May 2024"}
            </div>
            <div className="flex items-center ml-10 my-auto">
              <LikeButton numofLikes={blog.Likes.length} Size="big"  blogId={blog.id} />
            </div>
          </div>

          <div
            className="text-lg leading-10 font-ubuntu mt-5"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
          <div className="mt-10 mb-20 col-span-4 mx-auto block lg:hidden ">
            <AuthorCard
              authorName={blog.author.name}
              authorDescription={blog.author.userInfo}
            />
          </div>
        </div>
        <div className="col-span-4 mx-auto hidden lg:block">
          <AuthorCard
            authorName={blog.author.name}
            authorDescription={blog.author.userInfo}
          />
        </div>
      </div>
    </>
  );
};

const AuthorCard = ({
  authorName,
  authorDescription,
}: {
  authorName: string;
  authorDescription: string;
}) => {
  return (
    <>
      <div className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-start ml-4 mt-2 font-bold">Author</div>
        <div className="flex items-center justify-between p-4 ">
          <Avatar name={authorName} size="big" />
          <div className="mx-5">
            <div className="text-xl font-bold ">
              {" "}
              {authorName
                ? authorName.charAt(0).toUpperCase() + authorName.slice(1)
                : "A"}
            </div>
            <div className="text-slate-400 font-sm mt-1">
              {authorDescription ? authorDescription : "No description"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};