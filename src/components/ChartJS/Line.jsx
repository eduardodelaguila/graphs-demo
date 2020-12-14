import { useContext, useEffect, useCallback, useState } from "react";
import { Line as LineChart } from "react-chartjs-2";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import { DataContext } from "../../context/DataContext";

import { handleChart } from "../../mock/generator";

import "./ChartJS.scss";

const Line = () => {
    const [datasets, setDatasets] = useState({});
    const { data } = useContext(DataContext);

    const triggerDataImplementation = useCallback(() => {
        if (data.length !== 0) {
            setDatasets(handleChart(data));
        }
    }, [data]);

    useEffect(() => {
        triggerDataImplementation();
    }, [data, triggerDataImplementation]);

    const { curated, xCategories } = datasets;

    return (
        <div className="flex-container">
            {datasets.hasOwnProperty("curated") ? (
                <LineChart
                    data={{
                        labels: xCategories,
                        datasets: curated,
                    }}
                    options={{
                        scales: {
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false,
                                    },
                                },
                            ],
                            yAxes: [
                                {
                                    id: "Gross",
                                    type: "linear",
                                    position: "left",
                                },
                                {
                                    id: "Net",
                                    display: false,
                                    type: "linear",
                                    position: "left",
                                },
                                {
                                    id: "Volume",
                                    type: "linear",
                                    position: "right",
                                    stacked: true,
                                },
                            ],
                        },
                    }}
                />
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
