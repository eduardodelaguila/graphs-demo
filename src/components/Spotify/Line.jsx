import { useState, useEffect } from "react";
import { XYPlot, XAxis, YAxis, LineChart } from "reactochart";
import debounce from "lodash/debounce";

import { uber } from "../../mock/data";

import "reactochart/styles.css";
import "./Spotify.scss";

const Line = () => {
    const [width, setWidth] = useState(400);

    const setWidthToComponent = debounce(() => {
        console.log(
            document.getElementsByClassName("flex-container__line-container")[0]
                .offsetWidth
        );
        setWidth(
            document.getElementsByClassName("flex-container__line-container")[0]
                .offsetWidth
        );
    }, 500);

    useEffect(() => {
        window.addEventListener("resize", setWidthToComponent);
        setWidthToComponent();
        return () => {
            window.removeEventListener("resize", setWidthToComponent);
        };
    }, [setWidthToComponent]);

    const colors = ["#9965f4", "#f186c0", "#ff8d00"];
    const { curated } = uber;

    return (
        <div className="flex-container">
            <div className="flex-container__line-container">
                <XYPlot
                    scaleType="linear"
                    width={width}
                    height={600}
                    xyPlotStyle={{ backgroundColor: "#FFF" }}
                >
                    <XAxis title="Date" />
                    <YAxis title="Net" position="left" />
                    <YAxis title="Gross" position="right" />
                    <LineChart
                        data={curated[0]}
                        x={(d) => d.x}
                        y={(d) => parseFloat(d.y)}
                        lineStyle={{ stroke: colors[0], strokeWidth: 3 }}
                    />
                    <LineChart
                        data={curated[1]}
                        x={(d) => d.x}
                        y={(d) => parseFloat(d.y)}
                        lineStyle={{ stroke: colors[1], strokeWidth: 2 }}
                    />
                    <LineChart
                        data={curated[2]}
                        x={(d) => d.x}
                        y={(d) => parseFloat(d.y)}
                        lineStyle={{ stroke: colors[2], strokeWidth: 1 }}
                    />
                </XYPlot>
            </div>
        </div>
    );
};

export default Line;
