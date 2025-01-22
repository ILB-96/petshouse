import React from "react";

interface TotalDiscountCardProps {
  amount: number;
  percentage: number;
}

const TotalDiscountCard: React.FC<TotalDiscountCardProps> = ({
  amount,
  percentage,
}) => {
  if (amount) return <p className="text-sm font-semibold">Save {amount}$!</p>;

  return <p className="text-sm font-semibold">Save {percentage}%!</p>;
};

export default TotalDiscountCard;
