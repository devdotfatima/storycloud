// import { StaticImageData } from "next/image";

export type ImageSliderPropsT = {
  //  string[] | StaticImageData[];
 images: Record<string, string>|Record<string, { file: File; url: string }>
};
