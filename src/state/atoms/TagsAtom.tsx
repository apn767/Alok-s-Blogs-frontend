
import { atom,type RecoilState } from "recoil";
import { type Tags } from "../../components/BlogSelector";

const DefaultTags  = "React" as Tags;
   

export const TagsAtom: RecoilState<Tags> = atom({
  key: "Tagatom",
  default: DefaultTags,
});