import Chart from "react-apexcharts";

import { apex } from "../../mock/data";

import "./Apex.scss";

const Line = () => {
    const { curated, xCategories } = apex;
    console.log(xCategories, curated);
    return (
        <div className="flex-container">
            <div className="flex-container__line-container">
                <Chart
                    options={{
                        chart: {
                            id: "income-chart",
                            stacked: true,
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        markers: {
                            size: 0,
                            style: "hollow",
                        },
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
            </div>
        </div>
    );
};

export default Line;
