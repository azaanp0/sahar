import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

interface ChartData {
    name: string;
    [key: string]: string | number;
}

interface ChartsProps {
    type?: "bar" | "line" | "pie";
    data: ChartData[];
    dataKeys: string[];
    colors?: string[];
    height?: number;
}

const COLORS = ["#E91E63", "#C2185B", "#AD1457", "#880E4F", "#7F1D1D"];

const Charts = ({ type = "bar", data, dataKeys, colors = COLORS, height = 300 }: ChartsProps) => {
    const renderChart = () => {
        switch (type) {
            case "bar":
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {dataKeys.map((key, index) => (
                                <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                );

            case "line":
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {dataKeys.map((key, index) => (
                                <Line
                                    key={key}
                                    type="monotone"
                                    dataKey={key}
                                    stroke={colors[index % colors.length]}
                                    strokeWidth={2}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                );

            case "pie":
                return (
                    <ResponsiveContainer width="100%" height={height}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={(entry) => entry.name}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey={dataKeys[0]}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                );

            default:
                return null;
        }
    };

    return <div className="w-full">{renderChart()}</div>;
};

export default Charts;
