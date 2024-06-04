import { Container, VStack, Text, Button } from "@chakra-ui/react";
import { useSupabaseAuth, SupabaseAuthUI } from "../integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();

  if (session) {
    navigate("/");
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl">Login</Text>
        <SupabaseAuthUI />
        {session && <Button onClick={logout}>Logout</Button>}
      </VStack>
    </Container>
  );
};

export default Login;