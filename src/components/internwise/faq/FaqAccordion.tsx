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
