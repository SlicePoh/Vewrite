import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const FaqPage = () => {
  return (
    <>
      <Accordion className="w-full mt-10" allowMultiple>
        <AccordionItem className="border-b border-darklower py-[17px] dark:!border-white/10">
          <h2>
            <AccordionButton className="flex justify-between">
              <span
                className="text-left font-bold text-navy-900 dark:text-white"
                flex="1"
                textAlign="left"
              >
                What is VeWrite?
              </span>
              <AccordionIcon className="text-left !text-navy-900 dark:!text-white" />
            </AccordionButton>
          </h2>
          <AccordionPanel
            className="text-medium mt-2 text-left !text-navy-900 dark:!text-white"
            pb={4}
          >
            VeWrite a simple solution for all the writers. VeWrite simplifies
            writing and collaboration for writers. It has an intuitive,
            user-friendly environment to manage and organize your content.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem className="border-b border-darklower py-[17px] dark:!border-white/10">
          <h2>
            <AccordionButton className="flex justify-between">
              <span
                className="text-left font-bold text-navy-900 dark:text-white"
                flex="1"
                textAlign="left"
              >
                Who are we and what we do?
              </span>
              <AccordionIcon className="text-left !text-navy-900 dark:!text-white" />
            </AccordionButton>
          </h2>
          <AccordionPanel
            className="text-medium mt-2 text-left !text-navy-900 dark:!text-white"
            pb={4}
          >
            We are a group of 5 passionate individuals with unique skills and
            backgrounds, we're united by a shared vision of empowering writers.
            Together, we're dedicated to creating a vibrant, supportive
            ecosystem for writers, where they can thrive and shine.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem className="border-b border-darklower py-[17px] dark:!border-white/10">
          <h2>
            <AccordionButton className="flex justify-between">
              <span
                className="text-left font-bold text-navy-900 dark:text-white"
                flex="1"
                textAlign="left"
              >
                What services we provide?
              </span>
              <AccordionIcon className="text-left !text-navy-900 dark:!text-white" />
            </AccordionButton>
          </h2>
          <AccordionPanel
            className="text-medium mt-2 text-left !text-navy-900 dark:!text-white"
            pb={4}
          >
            <li>
              Writer's Hub: A platform for writers to craft, share, and
              collaborate on stories, ideas, and projects.
            </li>

            <li>
              Job Marketplace: Find writing opportunities and gigs tailored to
              your expertise and interests.
            </li>

            <li>
              Seamless Collaboration: Connect with fellow writers, fostering
              creativity and collective storytelling.
            </li>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem className="border-b border-darklower py-[17px] dark:!border-white/10">
          <h2>
            <AccordionButton className="flex justify-between">
              <span
                className="text-left font-bold text-navy-900 dark:text-white"
                flex="1"
                textAlign="left"
              >
                How we are better from others?
              </span>
              <AccordionIcon className="text-left !text-navy-900 dark:!text-white" />
            </AccordionButton>
          </h2>
          <AccordionPanel
            className="text-medium mt-2 text-left !text-navy-900 dark:!text-white"
            pb={4}
          >
            The problem we're addressing is the challenge faced by many content
            writers, who struggle with managing their writing work,
            collaborating with others, and finding suitable platforms for job
            openings. We aim to provide a comprehensive solution that
            streamlines the writing process and enhances collaboration for
            writers. Empower writers to shape their narratives, grow their
            skills, and showcase their talents.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default FaqPage;
