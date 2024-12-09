import { ControllerRenderProps } from "react-hook-form";
export type TopicsDropdownPropsT = {
  disabled?: boolean;
  field: ControllerRenderProps<
    { topic: string; subject: string; text: string },
    "topic"
  >;
};
