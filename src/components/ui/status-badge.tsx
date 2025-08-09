
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  variant: "active" | "inactive" | "lead" | "draft" | "completed" | "cancelled";
  className?: string;
}

export const StatusBadge = ({ variant, className }: StatusBadgeProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "lead":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getVariantText = () => {
    switch (variant) {
      case "active":
        return "Đang hoạt động";
      case "inactive":
        return "Không hoạt động";
      case "lead":
        return "Tiềm năng";
      case "draft":
        return "Bản nháp";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return variant;
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getVariantStyles(),
        className
      )}
    >
      {getVariantText()}
    </span>
  );
};
