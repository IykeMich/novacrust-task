import type { ConversionType } from "@/type/conversionTypes";

interface ConversionTabsProps {
  conversionType: ConversionType;
  onTypeChange: (type: ConversionType) => void;
}

export const ConversionTabs = ({ conversionType, onTypeChange }: ConversionTabsProps) => {
  const tabs: { type: ConversionType; label: string }[] = [
    { type: "crypto-to-cash", label: "Crypto to cash" },
    { type: "cash-to-crypto", label: "Cash to crypto" },
    { type: "crypto-to-fiat-loan", label: "Crypto to fiat loan" },
  ];

  return (
    <div className="flex bg-[#F2F2F2] rounded-full lg:h-[32px] mb-6 md:mx-4 lg:mx-10">
      {tabs.map((tab) => {
        const isActive = conversionType === tab.type;

        return (
          <button
            key={tab.type}
            type="button"
            onClick={() => onTypeChange(tab.type)}
            className={`flex-1 px-2 rounded-full! transition-all tap-effect
              border-0! ring-0! outline-none! focus-visible:ring-0! focus-visible:ring-offset-0!
              ${
              isActive
                ? "bg-[#013941]! text-[#F8FEFB]!"
                : "bg-transparent! text-[#828282] hover:text-[#013941]!"
            }`}
          >
            <p className="text-center text-[8px]! md:text-[11px]! font-medium">{tab.label}</p>
          </button>
        );
      })}
    </div>
  );
};

