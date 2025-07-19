import { Appbar } from "../components/AppBar";
import { SingleBlog } from "../components/SingleBlog";
import { useFetchSingleBlog } from "../hooks/FetchBlogs";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

// navbar should only be seen at screeen it should disappear after first scroll
export const BlogPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>No ID provided</div>;
  }
  const { blog, isLoading } = useFetchSingleBlog(id);
  console.log("checking what usesingleBlog returns the blog state" , isLoading);
  return (
    <>
      {isLoading ? (
        <>
          {/* Placeholder for the Appbar */}
          <div style={{ height: "64px" }}>
            <Appbar />
          </div>
          <div className="flex justify-center items-center h-screen ">
            <ScaleLoader color="#36d7b7" height={50} width={5} />
          </div>
        </>
      ) : (
        blog && (
          <>
            <div className="">
              <Appbar />
            </div>
            {/* Placeholder for the Appbar */}
            <div style={{ height: "64px" }}></div>
            <div className="lg:mt-10  lg:ml-10 m-2">
              <SingleBlog blog={blog} />
            </div>
          </>
        )
      )}
    </>
  );
};