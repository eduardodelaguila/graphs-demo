import { Line as LineChart } from "react-chartjs-2";

import { chart } from "../../mock/data";

import "./ChartJS.scss";

const Line = () => {
    const { curated, xCategories } = chart;
    console.log(xCategories, curated);
    return (
        <div className="flex-container">
            <div className="flex-container__line-container">
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
                                    id: "Volume",
                                    type: "linear",
                                    position: "right",
                                },
                            ],
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Line;
