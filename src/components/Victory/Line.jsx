import {
    VictoryChart,
    VictoryAxis,
    VictoryLine,
    VictoryTheme,
    VictoryTooltip,
    VictoryLabel,
    VictoryVoronoiContainer,
} from "victory";

import { victory } from "../../mock/data";

import "./Victory.scss";

const Line = () => {
    const colors = ["#9965f4", "#f186c0", "#ff8d00"];
    const { curated, maxima } = victory;

    return (
        <div className="flex-container">
            <div className="flex-container__line-container">
                <VictoryChart
                    theme={VictoryTheme.material}
                    responsive={true}
                    containerComponent={
                        <VictoryVoronoiContainer
                            voronoiDimension="x"
                            labels={({ datum }) => datum.y}
                            labelComponent={
                                <VictoryTooltip
                                    cornerRadius={0}
                                    flyoutStyle={{ fill: "white" }}
                                />
                            }
                        />
                    }
                >
                    <VictoryAxis
                        theme={VictoryTheme.material}
                        tickFormat={(x) => ""}
                    />
                    {curated.map((d, i) =>
                        i <= 1 ? (
                            <VictoryAxis
                                crossAxis
                                theme={VictoryTheme.material}
                                dependentAxis
                                orientation={i === 1 ? "left" : "right"}
                                standalone={false}
                                key={i}
                                style={{
                                    axis: { stroke: colors[i] },
                                    tickLabels: {
                                        fill: colors[i],
                                        fontSize: 5,
                                    },
                                }}
                                tickLabelComponent={
                                    <VictoryLabel dx={i === 1 ? 0 : -7} />
                                }
                                labelComponent={<VictoryTooltip />}
                                // Re-scale ticks by multiplying by correct maxima
                                tickFormat={(t) =>
                                    parseInt(t * maxima[i]).toFixed(1)
                                }
                            />
                        ) : null
                    )}
                    {curated.map((d, i) => (
                        <VictoryLine
                            theme={VictoryTheme.material}
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 },
                            }}
                            key={i}
                            data={d}
                            style={{
                                data: { stroke: colors[i], strokeWidth: 0.9 },
                            }}
                            y={(datum) => datum.y / maxima[i]}
                        />
                    ))}
                </VictoryChart>
            </div>
        </div>
    );
};

export default Line;
