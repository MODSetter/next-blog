import { TestAlert } from "./topshowcomponents/TestAlert";
import DefaultPostList from "../postlists/DefaultPostList";
import PostListTwo from "../postlists/PostListTwo";

export const DefaultGrid = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>BANNER</div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="grow">
        {/* <DefaultPostList /> */}
        <PostListTwo />
        </div>

        <div className="flex flex-col">
          <div>
            <TestAlert />
          </div>
          <div>Top Components</div>
        </div>
      </div>
      
    </div>
  );
};
