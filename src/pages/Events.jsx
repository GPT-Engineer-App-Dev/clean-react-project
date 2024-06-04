import { useEffect } from "react";
import { Container, Text, VStack, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useEvents } from "../integrations/supabase/index.js";

const Events = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const { data: events, error, isLoading } = useEvents();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  if (!session) {
    return null;
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl">Events</Text>
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
      </VStack>
    </Container>
  );
};

export default Events;