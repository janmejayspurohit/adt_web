import React, { useState } from "react";
import Layout from "../../common/Layout";
import { Box, Button, Flex, HStack, Heading, Text, Tooltip, VStack } from "@chakra-ui/react";

const Home = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleGetStartedClick = () => {
    setIsTooltipOpen(true);
  };

  const handleCloseTooltip = () => {
    setIsTooltipOpen(false);
  };

  return (
    <Layout>
      <Box w="100%" minH="80vh">
        <Box maxW="1200px" mx="auto" py="4">
          <VStack spacing="8">
            <Heading as="h1" size="3xl" textAlign="center">
              Supermarket Data Analysis Web App
            </Heading>
            <Flex
              w={"full"}
              alignItems="center"
              justifyContent="center"
              // eslint-disable-next-line no-undef
              backgroundImage={`url(${require("../../../assets/supermarket.jpg")})`}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize={"cover"}
              d={{ sm: "none", lg: "flex" }}
              p="200"
            ></Flex>
            <Box maxW="800px" mx="auto">
              <Text fontSize="xl" textAlign="center">
                Welcome to our Supermarket Data Analysis Web App! With our app, you can easily analyze the sales data of your supermarket
                and make data-driven decisions to improve your business.
              </Text>
            </Box>
            <Tooltip label="Use the sidebar to navigate around" isOpen={isTooltipOpen} onClose={handleCloseTooltip} hasArrow>
              <Button colorScheme="blue" size="lg" onClick={handleGetStartedClick}>
                Get Started
              </Button>
            </Tooltip>
          </VStack>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
