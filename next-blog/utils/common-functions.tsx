export const randomBorderColor = (max: number) => {

    const borderColors = ["border-red-500", "border-orange-500", "border-amber-500", "border-yellow-500", "border-lime-500", "border-green-500", "border-emerald-500",
        "border-teal-500", "border-cyan-500", "border-blue-500", "border-indigo-400", "border-violet-500"
    ]
    if (max > 12 || max < 1) {
        max = 12
    }
    return borderColors[Math.floor(Math.random() * max)]
};
