
import { cn } from "@/lib/utils";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-border p-6 card-hover",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <p
              className={cn(
                "text-xs font-medium mt-1",
                trend.isPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.isPositive ? "+" : "-"}
              {trend.value}% so với tháng trước
            </p>
          )}
        </div>
        <div className="rounded-full p-2 bg-crm-50 text-crm-700">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
