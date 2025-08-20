import { cva, VariantProps } from "class-variance-authority";
import cn from "../../utils/functions/cn";
import st from "./loader.module.css";

const loaderVariants = cva("", {
  variants: {
    variant: {
      dotLoader: st["loader--dot"],
    },
  },
});

type TLoader = VariantProps<typeof loaderVariants> & {
  className?: string;
};

function Loader({ variant, className }: TLoader) {
  return <span className={cn(loaderVariants({ variant }), className)} />;
}

export default Loader;
