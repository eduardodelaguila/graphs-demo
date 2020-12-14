import { useContext, useEffect, useCallback, useState } from "react";
import Chart from "react-apexcharts";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import { DataContext } from "../../context/DataContext";

import { handleApex } from "../../mock/generator";

import "./Apex.scss";

const Line = () => {
    const [datasets, setDatasets] = useState({});
    const { data } = useContext(DataContext);

    const triggerDataImplementation = useCallback(() => {
        if (data.length !== 0) {
            setDatasets(handleApex(data));
        }
    }, [data]);

    useEffect(() => {
        triggerDataImplementation();
    }, [data, triggerDataImplementation]);

    const { curated, xCategories, maxima, minima } = datasets;

    return (
        <div className="flex-container">
            <div className="flex-container__content">
                {datasets.hasOwnProperty("curated") ? (
                    <Chart
                        options={{
                            chart: {
                                id: "income-chart",
                                stacked: false,
                            },
                            dataLabels: {
                                enabled: false,
                            },
                            markers: {
                                size: 0,
                                style: "hollow",
                            },
                            stroke: {
                                curve: "smooth",
                            },
                            yaxis: [
                                {
                                    seriesName: "Gross",
                                    title: {
                                        text: "Gross",
                                    },
                                    forceNiceScale: false,
                                },
                                {
                                    seriesName: "Net",
                                    opposite: true,
                                    show: false,
                                },
                                {
                                    seriesName: "Volume",
                                    min: minima[2],
                                    max: maxima[2],
                                    opposite: true,

                                    title: {
                                        text: "Volume",
                                    },
                                    forceNiceScale: false,
                                },
                            ],
                            xaxis: {
                                type: "datetime",
                                categories: xCategories,
                                labels: {
                                    format: "dd/MM",
                                },
                            },
                        }}
                        series={curated}
                        type="line"
                        width="100%"
                        height="100%"
                    />
                ) : (
                    <div>
                        <SettingsOutlinedIcon />
                        <p>Select your data</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Line;
