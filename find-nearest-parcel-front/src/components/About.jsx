import { Box, Text } from "@chakra-ui/react"

function About() {
  return (
    <Box maxW="800px" mx="auto" mt={2} p={{ base: 3, md: 4 }}>
      <Text textAlign={'center'}>find-nearest-parcel is a simple application for searching nearest InPost package parcel, which I created for InPost recruitment assignment.</Text>
    </Box>
  )
}

export default About