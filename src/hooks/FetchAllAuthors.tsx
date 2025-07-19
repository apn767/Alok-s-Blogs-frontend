import { AllAuthor, type AuthorData } from "../state/Selectors/AuthorsSelectors";
import {type Loadable, useRecoilValueLoadable } from "recoil";


export const FetchAllauthors =  () => {
  const allAuthorsLoadable: Loadable<AuthorData[]> =
     useRecoilValueLoadable(AllAuthor);
  console.log("all the users ", allAuthorsLoadable.contents);

  // this default values are rendered until the data is arrived from the backend
  let isLoading = true;
  let hasError = false;
  let allAuthors = null;

  switch (allAuthorsLoadable.state) {
    case "hasError":
      isLoading = false;
      hasError = true;
      break;
    case "hasValue":
      isLoading = false;
      allAuthors = allAuthorsLoadable.contents;
      break;
    case "loading":
      isLoading = true;
      break;
  }
  console.log("allauthors are here " ,allAuthors );
  return { allAuthors, isLoading, hasError };
};