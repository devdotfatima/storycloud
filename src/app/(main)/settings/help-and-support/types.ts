import { ControllerRenderProps } from "react-hook-form";
export type TopicsDropdownPropsT = {
  field: ControllerRenderProps<
    { topic: string; subject: string; text: string },
    "topic"
  >;
};
