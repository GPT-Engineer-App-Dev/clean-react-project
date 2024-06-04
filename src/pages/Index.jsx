import { Container, Text, VStack, Button, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

import { useEvents } from "../integrations/supabase/index.js";

const Index = () => {
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();
  const { data: events, error, isLoading } = useEvents();

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl">Hello, World!</Text>
      {!session && (
          <>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Text fontSize="xl">Please log in to see the events.</Text>
          </>
        )}
        {session && (
          <>
            <Button onClick={logout}>Logout</Button>
            <Text fontSize="2xl">Events</Text>
            {isLoading && <Spinner />}
            {error && (
              <Alert status="error">
                <AlertIcon />
                {error.message}
              </Alert>
            )}
            {events && events.map(event => (
              <Text key={event.id}>{event.name}</Text>
            ))}
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Index;