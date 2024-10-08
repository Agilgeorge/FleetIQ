"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartConfiguration {
  money: {
    label: string;
  };

  stateConfig: {
    label: string;
    color: string;
  };
}
interface ChartData {
  state: string;
  money: number;
  fill: string;
}
interface PieChartComponentProps {
  title: string;
  duration: string;
  chartData: ChartData[];
}

const chartData = [
  { state: "onTime", shipments: 275, fill: "var(--color-onTime)" },
  { state: "runningAhead", shipments: 200, fill: "var(--color-runningAhead)" },
  { state: "runningLate", shipments: 287, fill: "var(--color-runningLate)" },
  { state: "inTransit", shipments: 173, fill: "var(--color-inTransit)" },
];

const chartConfig = {
  shipments: {
    label: "Shipments",
  },
  onTime: {
    label: "On Time",
    color: "hsl(var(--chart-1))",
  },
  runningAhead: {
    label: "Running Ahead",
    color: "hsl(var(--chart-2))",
  },
  runningLate: {
    label: "Running Late",
    color: "hsl(var(--chart-3))",
  },
  inTransit: {
    label: "In-Transit",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function PieChartComponent() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.shipments, 0);
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Active Shipments</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              wrapperStyle={{
                display: "flex",
                gap: "0.5rem",
                width: "100px",
              }}
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="shipments"
              nameKey="state"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Shipments
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing shipments for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
