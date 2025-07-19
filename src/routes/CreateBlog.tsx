import { Appbar } from "../components/AppBar";
import Editor from "../components/Editor";
import { useState } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import { coustomAlert } from "../components/CustomAlerts";
import {type Tags } from "../components/BlogSelector";
import { SelectTag } from "../components/SelectTag";

export interface blogInputtype {
  title: string;
  content: string;
  author: string;
  Tag: Tags;
}
export const CreateBlog = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const [blogInput, setBlogInput] = useState<blogInputtype>({
    content: "",
    title: "", // add this
    author: "", // and this
    Tag: "Coding",
  });

  const HandleTagSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedTag: Tags = event.target.value as Tags; // Cast the string to Tags type
    setBlogInput((prevInput: blogInputtype) => ({
      ...prevInput,
      Tag: selectedTag,
    }));
  };

  async function createblog(blogInput: blogInputtype) {
    console.log("blogInput is : ", blogInput);
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/createblog`,
        blogInput,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      console.log(response.data.newBlog);
      coustomAlert("success", "Blog created sucessfully");
      window.window.location.assign("/blogs");
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      //add the custom error here
      coustomAlert("error", error.response.data.msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <div className=" flex justify-center items-center h-screen">
          <PacmanLoader color="#36d7b7" size={60} />
        </div>
      ) : (
        // the actual editor
        <>
          <Appbar />
          <div className="text-3xl flex justify-center h-10 font-bold mb-20 ">
            Create Blog
          </div>
          <div className="mx-5 flex justify-between flex-col">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createblog(blogInput);
              }}
            >
              {" "}
              <div>
                <label className="text-lg font-bold  mb-3">Title</label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full h-12 px-3 text-base placeholder-gray-900 border rounded-lg mb-4 mt-2"
                  value={blogInput.title}
                  onChange={(e) =>
                    setBlogInput({ ...blogInput, title: e.target.value })
                  }
                />
              </div>
              <div className="">
                <label className="text-lg font-bold ">Description</label>
                <Editor setBlogInput={setBlogInput} blogInput={blogInput} />
              </div>
              {/* select a option */}
              <div className="mt-6">
                <SelectTag
                  SetBlogInput={setBlogInput}
                  handleTagSelection={HandleTagSelection}
                />
              </div>
              <button
                type="submit"
                className="mt-10  w-[100px] text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 font-montserrat font-bold font-lg"
              >
                Publish
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};