import { useContext, useEffect, useCallback, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import { DataContext } from "../../context/DataContext";

import { handleNivo } from "../../mock/generator";

import "./Victory.scss";

const Line = () => {
    const [datasets, setDatasets] = useState({});
    const { data } = useContext(DataContext);

    const triggerDataImplementation = useCallback(() => {
        if (data.length !== 0) {
            setDatasets(handleNivo(data));
        }
    }, [data]);

    useEffect(() => {
        triggerDataImplementation();
    }, [data, triggerDataImplementation]);

    const { curated } = datasets;
    return (
        <div className="flex-container">
            {datasets.hasOwnProperty("curated") ? (
                <ResponsiveLine
                    enableGridX={false}
                    enableGrid={false}
                    enablePoints={false}
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
            ) : (
                <div>
                    <SettingsOutlinedIcon />
                    <p>Select your data</p>
                </div>
            )}
        </div>
    );
};

export default Line;
