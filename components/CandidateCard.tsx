"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Avatar,
  Button,
  Flex,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { CandidateType } from "../developers";

interface CandidateCardProps {
  candidate: CandidateType;
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
  const {
    avatar,
    name,
    title,
    level,
    contact,
    work_email,
    region,
    country,
    city,
    experiences,
    certificates,
  } = candidate;
  const handleClick = () => {
    window.location.href = `mailto:${work_email}`;
  };
  return (
    <Card width="2xl" className="bg-gray-100">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={name} src={avatar} />
            <Box>
              <Heading size="sm">{name}</Heading>
              <Text>{`${level} - ${title}`}</Text>
              <Text>{contact}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col">
          <p className="text-base">
            <span className="font-medium text-base">Work Email: </span>
            {work_email}
          </p>
          <p className="text-base">
            <span className="font-medium text-base">Certificates: </span>
            {certificates}
          </p>
          <p className="text-base">
            <span className="font-medium text-base">Location: </span>
            {`${city}, ${country}, ${region}`}
          </p>
        </div>
        <Accordion allowToggle>
          <AccordionItem border="none">
            <h2>
              <AccordionButton className="pl-0">
                <div className="flex justify-between w-full">
                  <p className="font-medium text-base">Experiences</p>
                  <AccordionIcon />
                </div>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{experiences}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardBody>
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<EmailIcon />}
          onClick={handleClick}
        >
          Contact Candidate
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
