import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Index = () => {
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl">Hello, World!</Text>
      {!session && <Button onClick={() => navigate("/login")}>Login</Button>}
        {session && <Button onClick={logout}>Logout</Button>}
      </VStack>
    </Container>
  );
};

export default Index;