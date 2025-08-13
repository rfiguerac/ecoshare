import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

export interface Category {
    id?: number;
    title: string;
    icon: IconName;
}