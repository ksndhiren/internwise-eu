import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  groupKey: string;
};

const FaqAccordion = ({ items, groupKey }: FaqAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          value={`${groupKey}-${index}`}
          className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-card-soft transition hover:border-primary/20 hover:bg-slate-50/80"
        >
          <AccordionTrigger className="group px-6 py-5 text-left text-lg font-bold leading-7 text-slate-950 hover:no-underline">
            <span className="pr-6">{item.question}</span>
            <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-slate-100 text-primary transition group-data-[state=open]:bg-primary/10">
              <Plus className={cn("h-5 w-5 transition-transform duration-300", "group-data-[state=open]:rotate-45")} />
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-0 text-base leading-8 text-slate-600">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
