import { getGridData } from "@/db/getters"
import { globalComponentProvider } from "../global-provider";

export const OneGrid = async () => {
    const grid = await getGridData("GRID-1");
    return (
        <div className="flex flex-col gap-4 place-items-center">
            <div>{globalComponentProvider(grid?.comp_one)}</div>

            <div className="flex flex-col lg:flex-row gap-4">
                <div>
                    {globalComponentProvider(grid?.comp_two)}
                </div>

                <div className="flex flex-col">
                    <div>
                        {globalComponentProvider(grid?.comp_three)}
                    </div>
                    <div>{globalComponentProvider(grid?.comp_four)}</div>
                </div>
            </div>

            <div>{globalComponentProvider(grid?.comp_five)}</div>

        </div>
    );
};



export const SecondGrid = async () => {
    const grid = await getGridData("GRID-2");
    return (
        <div className="flex flex-col gap-4 place-items-center">
            <div>{globalComponentProvider(grid?.comp_one)}</div>

            <div className="flex gap-4">
                <div className="flex flex-col">
                    <div>
                        {globalComponentProvider(grid?.comp_two)}
                    </div>
                    <div>{globalComponentProvider(grid?.comp_three)}</div>
                </div>

                <div>
                    {globalComponentProvider(grid?.comp_four)}
                </div>
            </div>

            <div>{globalComponentProvider(grid?.comp_five)}</div>
        </div>
    );
};

//REDESIGN
export const ThirdGrid = async () => {
    const grid = await getGridData("GRID-3");
    return (
        <div className="flex flex-col gap-4 place-items-center">
            <div className="flex gap-4">
                <div>
                    {globalComponentProvider(grid?.comp_one)}
                </div>
                <div>{globalComponentProvider(grid?.comp_two)}</div>
            </div>

            <div>{globalComponentProvider(grid?.comp_three)}</div>

            <div className="flex gap-4">
                <div>
                    {globalComponentProvider(grid?.comp_four)}
                </div>
                <div>{globalComponentProvider(grid?.comp_five)}</div>
            </div>
        </div>
    );
};


export const FourthGrid = async () => {
    const grid = await getGridData("GRID-4");
    return (
        <div className="flex flex-col gap-4 place-items-center">
            <div>{globalComponentProvider(grid?.comp_one)}</div>

            <div className="flex gap-4">
                <div>
                    {globalComponentProvider(grid?.comp_two)}
                </div>
                <div>{globalComponentProvider(grid?.comp_three)}</div>
            </div>

            <div className="flex gap-4">
                <div>
                    {globalComponentProvider(grid?.comp_four)}
                </div>
                <div>{globalComponentProvider(grid?.comp_five)}</div>
            </div>
        </div>
    );
};


export const FifthGrid = async () => {
    const grid = await getGridData("GRID-5");
    return (
        <div className="flex flex-col gap-4 place-items-center">
            <div>{globalComponentProvider(grid?.comp_one)}</div>

            <div className="flex gap-4">
                <div>{globalComponentProvider(grid?.comp_two)}</div>
                <div>{globalComponentProvider(grid?.comp_three)}</div>
                <div>{globalComponentProvider(grid?.comp_four)}</div>
            </div>

            <div>
                {globalComponentProvider(grid?.comp_five)}
            </div>
        </div>
    );
};



export const gridProvider = (gridId: string | undefined) => {
    switch (gridId) {
        case "GRID-1": {
            return <OneGrid />
        }
        case "GRID-2": {
            return <SecondGrid />
        }
        case "GRID-3": {
            return <ThirdGrid />
        }
        case "GRID-4": {
            return <FourthGrid />
        }
        case "GRID-5": {
            return <FifthGrid />
        }
        default: {
            return <OneGrid />;
        }
    }
}




