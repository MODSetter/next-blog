"use client"
import { useEffect, useState } from "react"
import {getGridDisplay} from "./grids-display"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const GridSettings = () => {
    const [griddisplay, setGriddisplay] = useState<string | undefined>();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`)
          .then(response => response.json())
          .then(data => {
            // console.log("NAVBAR", typeof data)
            setGriddisplay(data.maingrid);
          })
      }, []);

    async function onSave() {
        const reqdata = {
            maingrid: griddisplay
          };
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqdata),
          };
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/grid`, requestOptions);
      
          const res = await response.json();
          console.log(res)
          if (res.id) {
            toast({
              variant: "default",
              description: `Grid Settings Updated`,
              className: "bg-green-400/20 backdrop-blur-lg"
            });
          }
    }
    
    return (
        <>
        
        <p className="text-sm my-2">Grid Display: <span className="font-semibold underline underline-offset-4">{griddisplay}</span></p>
            <div className="flex justify-between">
            <div className="flex flex-wrap gap-4">
                <p className="border px-6 py-2 rounded-full bg-green-400/20 backdrop-blur-lg" onClick={() => setGriddisplay("GRID-1")}>Grid #1</p>
                <p className="border px-6 py-2 rounded-full bg-green-400/20 backdrop-blur-lg" onClick={() => setGriddisplay("GRID-2")}>Grid #2</p>
                <p className="border px-6 py-2 rounded-full bg-green-400/20 backdrop-blur-lg" onClick={() => setGriddisplay("GRID-3")}>Grid #3</p>
                <p className="border px-6 py-2 rounded-full bg-green-400/20 backdrop-blur-lg" onClick={() => setGriddisplay("GRID-4")}>Grid #4</p>
                <p className="border px-6 py-2 rounded-full bg-green-400/20 backdrop-blur-lg" onClick={() => setGriddisplay("GRID-5")}>Grid #5</p>
            </div>
            <p className="border px-6 py-2 rounded-full bg-red-400/20 backdrop-blur-lg place-self-center" onClick={() => onSave()}>Save</p>
            </div>
            <div className="flex flex-col gap-4 p-4">
                <p className="">Grid Selected:</p>
                {getGridDisplay(griddisplay)}
            </div>
        </>
    )
}

export default GridSettings