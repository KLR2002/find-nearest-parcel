import React, { useState } from 'react';
import { Box, VStack, HStack, Input, IconButton, Button, Text, Image, Card, Heading, Spinner, Icon } from '@chakra-ui/react';
import { toaster } from "./ui/toaster"
import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';


// fetch query
const fetchParcels = async ({ queryKey }) => {
  const [_key, searchParams] = queryKey;
  
  const url = new URL('http://localhost:5174/api/parcels');
  
  if (searchParams.type === 'coords') {
    url.searchParams.append('lat', searchParams.lat);
    url.searchParams.append('lon', searchParams.lon);
  } else if (searchParams.type === 'address') {
    console.log(searchParams.address)
    url.searchParams.append('address', searchParams.address);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Failed to fetch parcels');
  }

  return response.json();
};

// Main component of app
export default function ParcelSearch() {
  const [addressInput, setAddressInput] = useState('');
  const [searchParams, setSearchParams] = useState(null); 


  const { data: parcels, isLoading, isError, error } = useQuery({
    queryKey: ['parcels', searchParams],
    queryFn: fetchParcels,
    enabled: !!searchParams,
  });

  // do if user typed address
  const handleAddressSearch = () => {
    if (!addressInput.trim()) {
      toaster.create({
        title: "Input required",
        description: "Please enter an address first.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setSearchParams({ type: 'address', address: addressInput });
  };

  // do if user provided location
  const handleLocationSearch = () => {
    if (!navigator.geolocation) {
      toaster.create({
        title: "Error",
        description: "Geolocation is not supported by your browser.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSearchParams({
          type: 'coords',
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setAddressInput(''); 
      },
      (error) => {
        toaster.create({
          title: "Location access denied",
          description: "Please allow location access or type your address manually.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    );
  };

  return (
    <Box minH="100vh" bg="gray.900" p={8} color="white">
      <VStack spacing={8} maxW="3xl" mx="auto">
      
        {/* Header */}
        <VStack spacing={2} textAlign="center">
          <Heading color="yellow.400" size="2xl">Find Nearest Parcel</Heading>
          <Text color="gray.400">Search by address or use your current location</Text>
        </VStack>

        {/* Search Bar */}
        <HStack w="full" bg="gray.800" p={4} borderRadius="lg" boxShadow="lg">
          <Input
            placeholder="Enter your street or city..."
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddressSearch()}
            bg="gray.700"
            border="none"
            color="white"
            _placeholder={{ color: 'gray.400' }}
            _focus={{ ring: 2, ringColor: "yellow.400" }}
          />
          <IconButton
            aria-label="Use current location"
            onClick={handleLocationSearch}
            colorScheme="yellow"
            variant="outline"
            _hover={{ bg: "yellow.400", color: "gray.900" }}
          >
          <MapPin/>
          </IconButton>
          <Button 
            onClick={handleAddressSearch}
            colorScheme="yellow" 
            bg="yellow.400" 
            color="gray.900"
            _hover={{ bg: "yellow.500" }}
          >
            Find
          </Button>
        </HStack>

        {/* Loading / Error */}
        {isLoading && (
          <VStack py={10}>
            <Spinner size="xl" color="yellow.400" thickness="4px" />
            <Text color="yellow.400" mt={4}>Searching for parcels...</Text>
          </VStack>
        )}
        
        {isError && (
          <Text color="red.400">An error occurred: {error.message}</Text>
        )}

        
        {!isLoading && !isError && parcels?.length === 0 && (
          <Text color="gray.400">No parcels found near this location.</Text>
        )}

        {/* Results */}
        <VStack w="full" spacing={6}>
          {parcels?.map((parcel) => (
            <Card.Root
              key={parcel.id} 
              direction={{ base: 'column', sm: 'row' }} 
              overflow="hidden" 
              variant="outline" 
              bg="gray.800" 
              borderColor="gray.700" 
              w="full"
              _hover={{ borderColor: 'yellow.400', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              <HStack>
              <Image 
                objectFit="cover" 
                maxW={{ base: '100%', sm: '200px' }} 
                src={parcel.imageUrl} 
                alt="Parcel Location" 
              />
              <VStack>
              <Card.Body>
                <Heading size="md" color="yellow.400" mb={2}>
                  {parcel.address} [{parcel.id}]
                </Heading>
                <Text color="gray.300">
                  {parcel.description}
                </Text>
                {parcel.distance && (
                  <Text color="yellow.500" fontSize="sm" mt={4} fontWeight="bold">
                    Distance: {parcel.distance} km
                  </Text>
                )}
              </Card.Body>
              </VStack>
              </HStack>
            </Card.Root>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}