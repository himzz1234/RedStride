import React from "react";
import { IoMdPricetags } from "react-icons/io";
import { MdBarChart } from "react-icons/md";
import { FaArrowAltCircleDown } from "react-icons/fa";

interface Props {
  title: string;
  icon: string;
  value: string;
  color: string;
}

const PriceInfoCard = ({ title, icon, value, color }: Props) => {
  let Icon: typeof IoMdPricetags = IoMdPricetags;

  switch (icon) {
    case "IoMdPricetags": {
      Icon = IoMdPricetags;
      break;
    }
    case "MdBarChart": {
      Icon = MdBarChart;
      break;
    }
    case "FaArrowAltCircleDown": {
      Icon = FaArrowAltCircleDown;
      break;
    }
  }

  return (
    <div className="w-[160px] flex flex-col gap-2 bg-[#f6f6f6] p-3 rounded-md">
      <div className="flex gap-2 items-center">
        <Icon width={28} height={28} color={color} />
        <p className="text-[14px] text-black-100">{title}</p>
      </div>

      <p className="text-lg font-bold text-secondary">{value}</p>
    </div>
  );
};

export default PriceInfoCard;
