import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { topics } from "./consts";
import { cn } from "@/lib/utils";
import { TopicsDropdownPropsT } from "./types";

const TopicsDropdown = ({ field, disabled = false }: TopicsDropdownPropsT) => {
  return (
    <Select
      value={field.value}
      onValueChange={field.onChange}
      onOpenChange={field.onBlur}
    >
      <SelectTrigger
        disabled={disabled}
        className={`flex  items-center ext-base sm:text-xl justify-between w-full max-w-sm p-6 pl-5 text-left ${
          field.value ? "text-black" : "text-grey"
        }   bg-white  sm:max-w-sm lg:max-w-lg rounded-2xl`}
      >
        <SelectValue placeholder="select topic" />
      </SelectTrigger>
      <SelectContent
        onBlur={field.onBlur}
        className=" w-full py-1 mt-1 overflow-auto  bg-white border shadow-lg    rounded-xl border-purple max-h-60 ring-1 ring-black/5 focus:outline-none "
      >
        {topics.map((option) => (
          <SelectItem
            key={option.id}
            value={option.name}
            className={cn(
              "relative flex w-full cursor-default select-none items-center rounded-xl px-10 py-2 ext-base sm:text-xl outline-none transition-all", // Shared styles
              "hover:bg-purple-100 hover:text-purple", // Hover styles
              "focus:bg-purple-100 focus:text-purple", // Focus styles for Radix focus state
              "dark:hover:bg-zinc-800 dark:hover:text-white" // Dark mode hover
            )}
          >
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TopicsDropdown;
