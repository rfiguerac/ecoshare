import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

export interface Category {
    idCategory?: number;
    title: string;
    icon: IconName;
}