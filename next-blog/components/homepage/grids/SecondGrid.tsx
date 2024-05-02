import PostList from "@/components/PostList";
import { TestAlert } from "./topshowcomponents/TestAlert";

export const SecondGrid = () => {
    return (
        <div className="flex flex-col gap-4">
            <div>BANNER</div>

            <div className="flex gap-4">
                <div className="flex flex-col">
                    <div>
                        <TestAlert />
                    </div>
                    <div>Top Components</div>
                </div>

                <div className="grow">
                    <PostList />
                </div>
            </div>
        </div>
    );
};
