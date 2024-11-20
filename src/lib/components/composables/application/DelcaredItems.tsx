import { usePfdfStore } from '@nsa/lib/zustand/usePfdfStore';
import { FunctionComponent } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/Accordion';
import { MdCheckBox } from 'react-icons/md';

type DeclaredItemsProps = {
  defaultOpen?: boolean;
};

export const DeclaredItems: FunctionComponent<DeclaredItemsProps> = ({ defaultOpen = true }) => {
  const items = usePfdfStore((state) => state.items);

  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? 'declared-items' : ''}>
      <AccordionItem
        value="declared-items"
        className="sm:px-0 md:px-2  data-[state=closed]:lg:py-2 data-[state=closed]:lg:px-5 data-[state=open]:lg:p-5 data-[state=open]:h-full "
      >
        <AccordionTrigger className="data-[state=open]:pb-6">
          <div className="text-lg col-span-2 font-medium text-gray-700 flex  items-center gap-2">
            {/* <IoDocumentAttach className="h-6 w-6 fill-indigo-600" /> */}
            <span>Declared Plumbing and Fixtures</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 gap-2">
            {items.length > 0
              ? items.map((item, idx) => {
                  if (item.qty > 0)
                    return (
                      <div key={idx} className="flex gap-2 items-center">
                        <MdCheckBox className="w-6 h-6 fill-green-500" />
                        <span className="text-base">{item.name}</span> - <span className="text-base">{item.qty}</span>
                      </div>
                    );
                })
              : null}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
