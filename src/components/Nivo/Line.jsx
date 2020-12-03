import { ResponsiveLine } from "@nivo/line";

import { nivo } from "../../mock/data";

import "./Victory.scss";

const Line = () => {
    const { curated, maxima } = nivo;
    console.log(curated);
    return (
        <div className="flex-container">
            <div className="flex-container__line-container">
                <ResponsiveLine
                    enableGrid={false}
                    enablePointLabel
                    useMesh
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    data={curated}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        stacked: true,
                    }}
                    pointSize={12}
                    pointColor={{ from: "color", modifiers: [] }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    axisLeft={{
                        orient: "left",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "asd",
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    axisRight={{
                        orient: "right",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legendOffset: 40,
                        legendPosition: "middle",
                    }}
                    axisBottom={{
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "dates",
                        legendOffset: 36,
                        legendPosition: "middle",
                    }}
                ></ResponsiveLine>
            </div>
        </div>
    );
};

export default Line;
