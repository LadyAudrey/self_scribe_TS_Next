"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import ChevronDown from "../../../public/buttons/nav_arrow_down.svg";
import Image from "next/image";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={className} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex gap-2">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={
        "text-sm font-medium transition-all text-left [&[data-state=closed]>img]:-rotate-90"
      }
      {...props}
    >
      <Image
        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
        src={ChevronDown}
        height={16}
        width={16}
        alt={"chevron"}
      />
    </AccordionPrimitive.Trigger>
    <div className={className}>{children}</div>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={className}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
