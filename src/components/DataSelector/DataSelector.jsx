import { useState, useContext } from "react";
import {
    Slider,
    Button,
    Divider,
    Radio,
    RadioGroup,
    Card,
    CardContent,
    CardActions,
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "@material-ui/core";
import { format, differenceInDays } from "date-fns";

import { DataContext } from "../../context/DataContext";

import "./DataSelector.scss";

const DataSelector = () => {
    const nd = new Date();
    nd.setDate(nd.getDate() - 1);
    const [mode, setMode] = useState("date");
    const [dataLength, setDataLength] = useState(20);
    const [start, setStart] = useState(nd);
    const [end, setEnd] = useState(new Date());
    const { setStartDate, setEndDate, setTotalLength, greenLight } = useContext(
        DataContext
    );

    const handleSlideChange = (e, v) => {
        setDataLength(v);
    };

    const convertToDate = (str) => {
        return new Date(str + "T00:00");
    };

    const handleDateRangeChange = (e) => {
        const { id, value } = e.target;
        if (id === "start") {
            setStart(convertToDate(value));
            return;
        }
        setEnd(convertToDate(value));
    };

    const handleModeChange = (e) => {
        setMode(e.target.value);
    };

    const applyDates = () => {
        setStartDate(start);
        setEndDate(end);
        greenLight();
    };

    const resetDatesValues = () => {
        setStart(new Date());
        setEnd(new Date());
    };

    const resetLength = () => {
        setDataLength(20);
    };

    const applyLength = () => {
        setTotalLength(dataLength);
        greenLight();
    };

    return (
        <Accordion className="data-selector-accordion MuiPaper-elevation8">
            <AccordionSummary aria-controls="panel1c-content">
                <div>
                    <Typography color="textSecondary" variant="subtitle1">
                        Data to graph
                    </Typography>
                </div>
                <div>
                    <Typography color="textSecondary" variant="subtitle2">
                        Select your dates or data length to graph
                    </Typography>
                </div>
            </AccordionSummary>

            <AccordionDetails>
                <div className="data-selector">
                    <Card raised>
                        <CardContent>
                            <Typography
                                color="textSecondary"
                                variant="subtitle2"
                                gutterBottom
                            >
                                Data Mode
                            </Typography>
                            <Divider variant="middle" />
                            <RadioGroup
                                row
                                aria-label="position"
                                name="position"
                                defaultValue="date"
                                onChange={handleModeChange}
                            >
                                <Radio value="date" />
                                <p>By Date</p>
                                <Radio value="length" />
                                <p>By Length</p>
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    {mode === "date" ? (
                        <Card raised>
                            <CardContent>
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                    gutterBottom
                                >
                                    Select data range
                                </Typography>

                                <Divider variant="middle" />
                                <div>
                                    <Typography
                                        color="textSecondary"
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        Start
                                    </Typography>
                                    <input
                                        type="date"
                                        id="start"
                                        name="trip-start"
                                        max={format(new Date(), "yyyy-MM-dd")}
                                        value={format(start, "yyyy-MM-dd")}
                                        onChange={handleDateRangeChange}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        End
                                    </Typography>
                                    <input
                                        type="date"
                                        id="end"
                                        name="trip-start"
                                        min={format(start, "yyyy-MM-dd")}
                                        max={format(new Date(), "yyyy-MM-dd")}
                                        value={format(end, "yyyy-MM-dd")}
                                        onChange={handleDateRangeChange}
                                    />
                                </div>
                                <Divider orientation="vertical" flexItem />
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                    gutterBottom
                                >
                                    Total of days:
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                    gutterBottom
                                >
                                    {differenceInDays(start, end) *
                                        Math.sign(differenceInDays(start, end))}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    color="secondary"
                                    onClick={resetDatesValues}
                                >
                                    Reset
                                </Button>
                                <Button color="primary" onClick={applyDates}>
                                    Apply
                                </Button>
                            </CardActions>
                        </Card>
                    ) : null}
                    {mode === "length" ? (
                        <Card raised>
                            <CardContent>
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                    gutterBottom
                                >
                                    Select the amount data points
                                </Typography>

                                <Divider variant="middle" />
                                <div className="slider">
                                    <Slider
                                        defaultValue={10}
                                        step={100}
                                        marks
                                        min={20}
                                        max={1000}
                                        value={dataLength}
                                        onChange={handleSlideChange}
                                    />
                                </div>
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                    gutterBottom
                                >
                                    Total of data points:
                                </Typography>
                                <Typography
                                    color="textSecondary"
                                    variant="subtitle2"
                                    gutterBottom
                                >
                                    {dataLength}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button color="secondary" onClick={resetLength}>
                                    Reset
                                </Button>
                                <Button color="primary" onClick={applyLength}>
                                    Apply
                                </Button>
                            </CardActions>
                        </Card>
                    ) : null}
                </div>
            </AccordionDetails>
            <Divider />
        </Accordion>
    );
};

export default DataSelector;
