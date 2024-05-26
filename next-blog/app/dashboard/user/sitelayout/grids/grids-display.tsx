import { Button } from "@/components/ui/button";

const Grid1 = () => {
    return (
        <div className="flex flex-col gap-4">
            <Button className="text-lg">NAVBAR</Button>
        <Button className="">1</Button>

        <div className="flex flex-row gap-4 items-stretch">
            <Button className="grow place-self-center">
                2
            </Button>

            <div className="flex flex-col gap-4 grow">
                <Button>
                    3
                </Button>
                <Button>4</Button>
            </div>
        </div>

        <Button>5</Button>
        <Button className="text-lg">FOOTER</Button>
    </div>
    );
};

const Grid2 = () => {
    return (
        <div className="flex flex-col gap-4">
            <Button className="text-lg">NAVBAR</Button>
            <Button>1</Button>

            <div className="flex gap-4">
                <div className="flex flex-col grow gap-4">
                    <Button className="grow">
                        2
                    </Button>
                    <Button className="grow">3</Button>
                </div>

                <Button className="grow place-self-center">
                    4
                </Button>
            </div>

            <Button>5</Button>
            <Button className="text-lg">FOOTER</Button>
        </div>
    );
};

const Grid3 = () => {
    return (
        <div className="flex flex-col gap-4">
            <Button className="text-lg">NAVBAR</Button>
            <div className="flex gap-4">
                <Button className="grow">
                    1
                </Button>
                <Button className="grow">2</Button>
            </div>

            <Button>3</Button>

            <div className="flex gap-4">
                <Button className="grow">
                    4
                </Button>
                <Button className="grow">5</Button>
            </div>
            <Button className="text-lg">FOOTER</Button>
        </div>
    );
};

const Grid4 = () => {
    return (
        <div className="flex flex-col gap-4">
            <Button className="text-lg">NAVBAR</Button>
            <Button>1</Button>

            <div className="flex gap-4">
                <Button className="grow">
                    2
                </Button>
                <Button className="grow">3</Button>
            </div>

            <div className="flex gap-4">
                <Button className="grow">
                    4
                </Button>
                <Button className="grow">5</Button>
            </div>
            <Button className="text-lg">FOOTER</Button>
        </div>
    );
};

const Grid5 = () => {
    return (
        <div className="flex flex-col gap-4">
            <Button className="text-lg">NAVBAR</Button>
            <Button>1</Button>

            <div className="flex gap-4">
                <Button className="grow">2</Button>
                <Button className="grow">3</Button>
                <Button className="grow">4</Button>
            </div>

            <Button>
                5
            </Button>
            <Button className="text-lg">FOOTER</Button>
        </div>
    );
};

export const getGridDisplay = (gridId: string | undefined) => {
    switch (gridId) {
        case "GRID-1": {
            return <Grid1 />
        }

        case "GRID-2": {
            return <Grid2 />
        }

        case "GRID-3": {
            return <Grid3 />
        }
        case "GRID-4": {
            return <Grid4 />
        }
        case "GRID-5": {
            return <Grid5 />
        }

        default: {
            return <></>;

        }
    }
}
