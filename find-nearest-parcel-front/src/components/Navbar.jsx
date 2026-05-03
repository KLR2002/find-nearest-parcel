import { Link, Box, Flex, HStack, Heading, Spacer, IconButton, VStack, Presence } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { MapPin } from 'lucide-react';
import { useState } from "react";

const NavItem = ({ to, children, onClick }) => (
  <Link
    as={NavLink}
    to={to}
    px={3}
    py={2}
    rounded="md"
    fontWeight="medium"
    color="black"
    onClick={onClick}
    _hover={{ textDecoration: "none", color: "#FFDE00", bg: "black" }}
    _currentPage={{
      color: "#FFDE00",
      bg: "black",
      fontWeight: "bold",
    }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        bg="#FFDE00"
        px={{ base: 4, md: 6 }}
        py={2}
        position="fixed"
        w="100%"
        top={0}
        zIndex={10}
      >
        <Flex alignItems="center">
          <Heading size="md" color="black">
            <HStack spacing={2}>
              <MapPin size={24} />
              <Box>find-nearest-parcel</Box>
            </HStack>
          </Heading>

          <Spacer />

          <HStack
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
            <NavItem to="/">About</NavItem>
            <NavItem to="/find">Find</NavItem>
          </HStack>

          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            variant="unstyled"
            color="black">
              {open ? (
                <IconX size={28} />
              ) : (
                <IconMenu2 size={28} />
              )}
            </IconButton>
        </Flex>

        <Presence present={open}>
          <VStack
            bg="#FFDE00"
            align="start"
            px={4}
            pb={4}
            gap={2}
            motionPreset="slide-down"
          >
            <NavItem to="/" onClick={() => setOpen(false)}>
              About
            </NavItem>
            <NavItem to="/find" onClick={() => setOpen(false)}>
              Search
            </NavItem>
          </VStack>
        </Presence>
      </Box>

      <Box pt="80px" px={4}>
        <Outlet />
      </Box>
    </>
  );
};

export default Navbar;