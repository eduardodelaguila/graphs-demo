import { useState, useRef } from "react";
import {
    makeWidthFlexible,
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineMarkSeries,
    Hint,
} from "react-vis";

import { uber } from "../../mock/data";

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

const Line = () => {
    const isHoveringOverLine = useRef([]);
    const [hoveredPoint, setHoveredPoint] = useState();
    const colors = ["#9965f4", "#f186c0", "#ff8d00"];
    const { curated, maxima, minima } = uber;

    return (
        <FlexibleXYPlot
            height={600}
            xType="time"
            margin={{ left: 100, right: 100 }}
        >
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis
                tickLabelAngle={72}
                tickTotal={curated[0].length}
                yDomain={[0, curated[2].length]}
            />
            <YAxis yDomain={[0, maxima[0]]} orientation="right" />
            <YAxis yDomain={[minima[1], maxima[1]]} hideTicks />
            <YAxis yDomain={[minima[2], maxima[2]]} />
            {curated.map((v, i) => {
                return (
                    <LineMarkSeries
                        key={i}
                        data={v}
                        color={colors[i]}
                        style={{ strokeLinejoin: "round" }}
                        animation
                        onSeriesMouseOver={(e) => {
                            isHoveringOverLine.current[i] = true;
                        }}
                        onSeriesMouseOut={(e) => {
                            isHoveringOverLine.current[i] = false;
                        }}
                        onNearestXY={(e, { index }) => {
                            console.log(isHoveringOverLine);
                            if (isHoveringOverLine.current[i]) {
                                const hoveredLine = v[index];
                                setHoveredPoint({
                                    x: hoveredLine.x,
                                    y: hoveredLine.y,
                                });
                            }
                        }}
                    />
                );
            })}
            {hoveredPoint && <Hint value={hoveredPoint} />}
        </FlexibleXYPlot>
    );
};

export default Line;
